FROM node:alpine as builder
WORKDIR /src
ADD . /src
RUN npm install && npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /src/dist .
