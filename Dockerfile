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

# Enable necessary Apache modules for proxying
RUN sed -i '/#LoadModule proxy_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/#LoadModule proxy_http_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/#LoadModule proxy_connect_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/#LoadModule ssl_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/#LoadModule socache_shmcb_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Configure SSL support for the reverse proxy
RUN echo "SSLProxyEngine On" >> /usr/local/apache2/conf/httpd.conf
RUN echo "SSLProxyVerify none" >> /usr/local/apache2/conf/httpd.conf
RUN echo "SSLProxyCheckPeerCN off" >> /usr/local/apache2/conf/httpd.conf
RUN echo "SSLProxyCheckPeerName off" >> /usr/local/apache2/conf/httpd.conf
RUN echo "SSLProxyCheckPeerExpire off" >> /usr/local/apache2/conf/httpd.conf

# Modify Apache configuration to serve index.html for all routes on port 4000
RUN sed -i 's#DirectoryIndex index.html#DirectoryIndex index.html\n    ErrorDocument 404 /index.html#' /usr/local/apache2/conf/httpd.conf

# Configure reverse proxy for /api
RUN echo 'ProxyPass "/api" "https://ptaeventsgateway.azurewebsites.net/api"' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'ProxyPassReverse "/api" "https://ptaeventsgateway.azurewebsites.net/api"' >> /usr/local/apache2/conf/httpd.conf

# Set the ServerName directive to suppress the warning
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Expose port 4000
EXPOSE 4000
