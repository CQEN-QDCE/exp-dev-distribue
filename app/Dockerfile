# FROM node:18 AS build-dev
FROM node:alpine AS build-dev

# Install  xdg-utils
RUN apk add --no-cache xdg-utils

WORKDIR /usr/app

COPY ./src ./src
COPY ./public ./public
COPY pnpm-lock.yaml ./
COPY *.html ./
COPY *.js ./
COPY *.json ./
COPY *.ts ./

RUN npm install pnpm -g
RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "dev-server-host"]