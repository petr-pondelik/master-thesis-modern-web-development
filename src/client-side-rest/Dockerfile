FROM node:16 AS development

ENV NODE_ENV development
WORKDIR /usr/mwd/client-side-rest
COPY package*.json ./
RUN yarn
COPY . .


FROM node:16 as builder

WORKDIR /usr/mwd/client-side-rest
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
ENV NODE_ENV production


FROM nginx:1.21.0-alpine AS production

COPY --from=builder /usr/mwd/client-side-rest/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3010
CMD ["nginx", "-g", "daemon off;"]
