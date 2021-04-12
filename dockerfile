FROM node:14.16.1

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .
RUN npm build

# сетапим перемнные окружения, которые понадобятся в сервере
ENV NODE_ENV=production
ENV PORT=80

# При старте контейнер начнёт общаться через 80 порт
EXPOSE 80

# Сервер раздаёт статику из dist
CMD npm run server:start