FROM node:18-alpine as build-stage

COPY . /app
WORKDIR /app
RUN npm install

EXPOSE 30000

CMD ["npm", "run", "dev"];