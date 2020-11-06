# pull official base image
FROM node:13.12.0-alpine
RUN mkdir code
COPY . ./code
WORKDIR /code/front-management-system
RUN npm install --silent
CMD ["npm", "start"]
