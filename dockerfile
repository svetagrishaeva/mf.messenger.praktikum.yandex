FROM node:14.16.1

WORKDIR /app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности 
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install

# копируем исходный код
COPY . .
RUN npm build

# сетапим перемнные окружения, которые понадобятся в сервере
ENV NODE_ENV=production
ENV PORT=80

# При старте контейнер начнёт общаться через 80 порт
EXPOSE 80

# Сервер раздаёт статику из dist
CMD [ "node", "server.js" ]