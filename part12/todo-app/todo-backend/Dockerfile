FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV MONGO_URL=mongodb://root:example@mongo:27017/the_database?authSource=admin
ENV REDIS_URL=redis://redis:6379

CMD ["npm", "start"]
