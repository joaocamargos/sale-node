FROM node:latest
ENV NPM_ENVIRONMENT build
WORKDIR /app
EXPOSE 8010/tcp
COPY . /app
RUN chmod -R a+rwx /app
RUN chmod +x /app/Environment.sh
ADD root.crt /usr/local/share/ca-certificates/root.crt
RUN update-ca-certificates 
RUN echo 172.16.47.46 afpnhhgtw01.pine.com >> /etc/hosts
ENTRYPOINT /app/Environment.sh
