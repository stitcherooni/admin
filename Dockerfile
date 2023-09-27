FROM node:18.0.0 as build
WORKDIR /app

COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build && npm test

FROM docker.io/httpd:alpine
WORKDIR /usr/local/apache2/htdocs/

RUN rm -rf ./*
COPY --from=build /app/build/ .
COPY --from=build /app/reports/report.xml /app/testresults/testresults.xml
COPY public/ /var/www/html/

# Enable necessary Apache modules for proxying
RUN sed -i -E '/#?(LoadModule (proxy|proxy_http|socache_shmcb)_module)/s/#//g' /usr/local/apache2/conf/httpd.conf

# Modify Apache configuration to serve index.html for all routes on port 80
RUN sed -i 's#DirectoryIndex index.html#DirectoryIndex index.html\n    ErrorDocument 404 /index.html#' /usr/local/apache2/conf/httpd.conf

# Configure reverse proxy for /api
RUN echo 'ProxyPass "/api" "http://apigateway/api/onboarding"' >> /usr/local/apache2/conf/httpd.conf \
    && echo 'ProxyPassReverse "/api" "http://apigateway/api/onboarding"' >> /usr/local/apache2/conf/httpd.conf \
    && echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Expose port 80
EXPOSE 80
