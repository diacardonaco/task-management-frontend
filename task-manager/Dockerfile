# Construcción de la aplicación Angular 12 con Node 14
FROM node:14 AS build
WORKDIR /app
# Etapa 1: Construcción de la aplicación Angular 12 con Node 14
FROM node:14 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/task-manager /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
