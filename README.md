# messenger.praktikum.yandex
Самостоятельный учебный проект, выполненный в рамках [Яндекс.Практикума](https://praktikum.yandex.ru/) (курс "Мидл фронтенд-разработчик")

### Локальный запуск
В корневой директории проекта выполнить поочередно команды:  
1. `npm run publish:local` — сборка проекта  
2. `npm run start` — запуск сервера  
 
Приложение будет запущено на http://localhost:3000/  

### Демо
https://messenger-praktikum-yandex.netlify.app/  

### Ход работы над проектом
#### Первый спринт
1. Настроен Express-сервер с раздачей статики.
2. Настроен автодеплой проекта в Netlify. 
3. Сверстаны страницы всех прототипов экранов.  
В качестве прототипов были использованы макеты:  
https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1  

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
1. Добавлен класс для работы с запросами: реализованы методы GET, POST, PUT, DELETE. [+]  
2. Добавлен роутинг в проект. [+]  
3. Написаны тесты для шаблонизатора, роутера, компонента, модуля отправки запросов. [-]  
4. Внедрён HTTP API чатов, авторизации и пользователей (без отправки сообщений). [+]  
Реализованы:  
- авторизация (регистрация, авторизация, выход из системы); [+]  
- работа с информацией пользователя (изменение данных пользователя, аватара, пароля); [+]  
- работу с чатами (список чатов пользователя, создание/удаление чата, добавление пользователей в чат, удаление пользователей из чата). [+]  
5. Проект защищён от XSS и DOS. [-]  
6. Настроен PostCSS. [+] Переписаны все стили на выбранном инструменте. [-]  