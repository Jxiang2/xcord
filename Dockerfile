FROM node:lts-alpine3.10

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

CMD npm run build

USER root

CMD ["npm", "run", "deploy"]

EXPOSE 3000