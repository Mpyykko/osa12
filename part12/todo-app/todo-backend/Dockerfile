FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV MONGO_URL=mongodb://mongo:27017/todos
ENV REDIS_URL=redis://redis:6379

CMD ["npm", "start"]
