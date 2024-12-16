ARG NODE_VERSION=22.11.0

FROM node:18


# Устанавливаем рабочий каталог
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все файлы проекта
COPY . .

# Указываем порт, который будет использоваться приложением
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]
