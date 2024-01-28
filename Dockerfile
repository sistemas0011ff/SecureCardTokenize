 
FROM node:16 AS build
 
WORKDIR /usr/src/app
 
COPY package*.json ./
RUN npm install
 
COPY . .
 
RUN npm run build
 
FROM node:16 AS production
 
WORKDIR /usr/src/app
 
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
 
COPY --from=build /usr/src/app/dist ./dist
 
EXPOSE $PORT

# Define el comando para ejecutar la aplicación
CMD [ "node", "dist/src/app/start.js" ]
