##FROM node:14.15.1 AS builder
##RUN mkdir -p /app
##WORKDIR /app
##COPY . .
#RUN npm update
##RUN npm install 
##RUN npm i @angular/cli@12  -g
##RUN ng build --prod --output-hashing none

FROM nginx:alpine
##COPY --from=builder /app/dist/publicpages /usr/share/nginx/html
COPY . /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80
##RUN service nginx start
CMD ["nginx", "-g", "daemon off;"]
