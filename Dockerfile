FROM node:18.0.0 as build
WORKDIR /app

COPY package.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM httpd:alpine
WORKDIR /usr/local/apache2/htdocs/
RUN rm -rf ./*

COPY --from=build /app/build/ .
COPY public/ /var/www/html/

# Modify Apache configuration to serve index.html for all routes
RUN sed -i 's#DirectoryIndex index.html#DirectoryIndex index.html\n    ErrorDocument 404 /index.html#' /usr/local/apache2/conf/httpd.conf

# Set the ServerName directive to suppress the warning
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Expose port 4000
EXPOSE 4000
