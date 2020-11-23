# pull official base image
FROM node:13.12.0-alpine as builder

RUN mkdir code
COPY . ./code
WORKDIR /code/front-management-system


ARG REACT_APP_BACKEND_URL
RUN echo $REACT_APP_BACKEND_URL
RUN rm src/config_urls.js
RUN echo -e "export const REACT_APP_BACKEND_URL=" $REACT_APP_BACKEND_URL > src/config_urls.js
RUN npm install --silent
RUN npm run build

FROM nginx
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Copy from the stahg 1
COPY --from=builder /code/front-management-system/build /usr/share/nginx/html

#fire up nginx
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
