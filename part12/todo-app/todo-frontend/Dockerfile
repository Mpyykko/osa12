FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci


COPY . .

ENV VITE_BACKEND_URL=http://todo-backend:3000


RUN npm run build


FROM nginx:alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
