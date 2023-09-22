# Base de imagen de Node.js
FROM node:18.17.1-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de la aplicación al contenedor
COPY package.json package-lock.json tsconfig.json /app/
COPY src /app/src/
COPY logs /app/logs/

# Instalar dependencias
RUN npm install

# Compilar TypeScript
RUN npm run build 

# Expone el puerto en el que la aplicación escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]