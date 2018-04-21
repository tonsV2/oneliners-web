FROM node:alpine as builder
#ARG ONELINERS_API
WORKDIR /src
ADD . /src
RUN npm install && npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /src/dist .
RUN apk --no-cache add gettext
CMD envsubst '$ONELINERS_API' < $(ls static/js/app.*.js) > $(ls static/js/app.*.js) && nginx -g 'daemon off;'
