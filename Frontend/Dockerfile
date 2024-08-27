# Etapa 1: Construcción
FROM node:18 AS build

WORKDIR /app

# Instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el código fuente y construye la aplicación
COPY . .
RUN npm run build --prod

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/dist/tu-aplicacion-angular /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
