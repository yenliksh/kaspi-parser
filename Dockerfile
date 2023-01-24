# FROM node:14.21.2-alpine
FROM node:14
FROM mcr.microsoft.com/playwright:focal
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
RUN npm install
COPY . .
RUN npm run build
# RUN npx playwright install-deps
# RUN npx playwright install
CMD ["node",  "dist/main.js"]
