## Mesto (frontend на React + backend)

Проект предполагает авторизацию в системе с помощью электронной почты. 
Тестовые данные для входа в систему без регистрации: 
- ***email*** test@test.ru
- ***пароль*** 123456789

### Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части со следующими возможностями: 
- авторизации и регистрации пользователей с использованием JWT-токенов, 
- операции с карточками и пользователями. 

Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.

### Используемые технологии:

#### Backend
1. Node.js
2. Express
3. MongoDB
4. сервер nginx для деплоя на виртуальной машине
5. docker и docker-compose


#### Frontend
1. React.js (Create React App)
2. Хуки, функциональные компоненты, роутинг
3. Webpack

####  Для запуска на локальной машине:
- запустить сервер СУБД MongoDB локально (СУБД установлена) или в контейнере **docker-compose up -d** (установлен docker и docker-compose)
- скачать содержимое ветки master
- перейти в папку **backend**, установить зависимости командой **npm install**, запустить локальный сервер командой **npm run start** (на порту 5000)
- перейти в папку **frontend**, установить зависимости командой **npm install**, запустить локальный сервер командой **npm run start** (на порту 3000)

### Проект завершен

#### :link: Деплой - http://6c61267773d1.vps.myjino.ru/



