# CocoshopFrontend

![CocoshopFrontend Logo](path_to_your_logo_image)

## Описание

**CocoshopFrontend** — это фронтенд-часть онлайн-магазина, разработанная с использованием React. Этот проект предоставляет пользователям удобный интерфейс для просмотра и покупки товаров.

## Страницы магазина

1. **Главная страница**
![Главная страница](https://github.com/Nikolay-Bezmen/CocoJamboShop/blob/main/cocoshop/assets/Screenshot%202024-12-23%20153824.png)
2. **Логин**
![Логин](https://github.com/Nikolay-Bezmen/CocoJamboShop/blob/main/cocoshop/assets/Screenshot%202024-12-23%20153705.png)
3. **Регистрация**
![Регистрация](https://github.com/Nikolay-Bezmen/CocoJamboShop/blob/main/cocoshop/assets/Screenshot%202024-12-23%20153731.png)
4. **Избранное**
 ![Избранное](https://github.com/Nikolay-Bezmen/CocoJamboShop/blob/main/cocoshop/assets/Screenshot%202024-12-23%20153836.png)
5. **Корзина**
 ![Корзина](https://github.com/Nikolay-Bezmen/CocoJamboShop/blob/main/cocoshop/assets/Screenshot%202024-12-23%20153848.png)
6. **Оформление заказа**
 ![Оформление закакза](https://github.com/Nikolay-Bezmen/CocoJamboShop/blob/main/cocoshop/assets/Screenshot%202024-12-23%20153924.png)
7.  **Контакты**
![Контакты](https://github.com/Nikolay-Bezmen/CocoJamboShop/blob/main/cocoshop/assets/Screenshot%202024-12-23%20154017.png)
8. **Поиск по сайту**
 ![Поиск по сайту](https://github.com/Nikolay-Bezmen/CocoJamboShop/blob/main/cocoshop/assets/Screenshot%202024-12-23%20153955.png)




## Функциональные возможности

- Просмотр списка товаров
- Поиск и фильтрация товаров
- Просмотр деталей товара
- Добавление товаров в корзину
- Оформление заказа
- Регистрация и авторизация пользователей

## Технологии

- React
- Redux (если используется)
- React Router
- Axios (для HTTP-запросов)
- Bootstrap / Material-UI (или другая библиотека компонентов)

## Установка

1. Клонируйте репозиторий:

   ```bash
    git clone https://github.com/Slate2d/CocoshopFrontend.git

2. Перейдите в директорию проекта:

   ```bash
    cd CocoshopFrontend

3. Установите зависимости
  ```bash
    npm install
4. Запустите сервер
5. Запуск приложения
  ```bash
    npm start

Приложение будет доступно по адресу http://localhost:3000.

### Docker
Вы можете запустить приложение с использованием Docker.

1. Соберите Docker-образ:

bash
docker build -t cocoshop-frontend .

2. Запустите контейнер:

bash
Копировать код
docker run -p 3000:3000 cocoshop-frontend