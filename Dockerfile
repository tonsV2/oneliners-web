FROM node:alpine AS builder
WORKDIR /src
ADD . /src
RUN npm install && npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /src/dist .
RUN apk --no-cache add gettext
CMD target=$(ls static/js/app.*.js) && echo $(envsubst '$ONELINERS_API' < $target) > $target && exec nginx -g 'daemon off;'
