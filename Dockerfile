# Usa una imagen de Node para construir la aplicación
FROM node:14 AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json e package-lock.json si existen
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia los archivos del código fuente al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# La imagen final utiliza Nginx para servir la aplicación construida
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de construcción al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para que pueda ser accesible desde fuera del contenedor
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
