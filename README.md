# messenger.praktikum.yandex
Самостоятельный учебный проект, выполненный в рамках [Яндекс.Практикума](https://praktikum.yandex.ru/) (курс "Мидл фронтенд-разработчик")

### Демо
Приложение размещено на [Netlify](https://messenger-praktikum-yandex.netlify.app/) и [Heroku](https://messenger-praktikum-yandex-app.herokuapp.com/).  

### Локальный запуск
```
$ git clone https://github.com/svetagrishaeva/mf.messenger.praktikum.yandex.git
$ cd mf.messenger.praktikum.yandex`  
$ npm install
$ npm run build & npm run start 
```

### Развертывание с помощью Heroku Git
Войдите в свою учетную запись в Heroku и следуйте инструкциям, чтобы создать новый открытый ключ SSH.  
```
$ heroku login  
$ heroku git:clone -a messenger-praktikum-yandex-app  
$ cd messenger-praktikum-yandex-app  
```
Внесите некоторые изменения в код, который вы клонировали, и разверните их в Heroku с помощью Git.  
```
$ git add .  
$ git commit -am "make it better"  
$ git push heroku master  
```

### Ход работы над проектом
#### Первый спринт
1. Настроен Express-сервер с раздачей статики.
2. Настроен автодеплой проекта в Netlify. 
3. Сверстаны страницы всех прототипов экранов. В качестве прототипов были использованы макеты - [Figma](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1).
  
#### Второй спринт
1. В проект добавлен шаблонизатор LoDash; все свёрстанные (ранее) страницы переложены на него.  
2. Внедрен TypeScript; добавлен скрипт для компилирования всех *.ts файлов.  
3. Добавлен компонентный подход (т. е. использование шаблонизатора, реализации блока и Event Bus).  
4. Проект структурирован по папкам (components, utils, pages и т. д.).  
5. Добавлена валидация на все формы ввода данных.  
6. Реализован отдельный модуль для кнопки, который можно переиспользовать.  
7. Генерация страниц реализована на стороне клиента.  
8. Настроены экспорты и импорты.  
9. Для перехода между страницами использованы ссылки в тегах <a>.  

#### Третий спринт
1. Добавлен класс для работы с запросами: реализованы методы GET, POST, PUT, DELETE.    
2. Добавлен роутинг в проект.  
3. Добавлены тесты. (cmd: `npm run test`) [+/-]  
4. Внедрён HTTP API чатов, авторизации и пользователей (без отправки сообщений).    
Реализованы:  
[+] регистрация, авторизация, выход из системы  
[+] работа с информацией пользователя (изменение данных пользователя, аватара, пароля)  
[+] работa с чатами (список чатов пользователя, создание/удаление чата, добавление/удаление пользователей)  
5. Проект защищён от XSS и DOS. [+/-]
6. Настроен PostCSS. Переписаны все стили на выбранном инструменте. [+/-]  

#### Четвертый спринт
1. Настроен Webpack: настроен loader для работы с TypeScript.   
2. Настроен Docker-сборки статического приложения.  
3. Размещен в Heroku проект с Docker-сборкой.    
4. Добавлен ESLint: 
[+] линтинг кода (cmd: `npm run lint`)  
[+] линтинг и автоматическое исправление кода (cmd: `npm run lint:fix`)  
5. Настроен precommit на проект.    
6. Подключен WebSocket для работы с real-time сообщениями.

Тестовые пользователи: `admin_555/555Gilazo`, `admin_123/123Gilazo`, `admin_333/333Gilazo`, `admin_777/777Gilazo`.  