# Build stage
FROM node:20.16-alpine as build
WORKDIR /app/build
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

# Final stage
FROM node:20.16-alpine
WORKDIR /app
COPY --from=build /app/build/dist ./dist

EXPOSE 4000

CMD ["dist/main.js"]