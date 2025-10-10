FROM node:24 AS build-stage

WORKDIR /usr/src/app

COPY . .

ARG VITE_BACKEND_HOST=/api/
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm ci

RUN npm run build

FROM nginx:1.28-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

