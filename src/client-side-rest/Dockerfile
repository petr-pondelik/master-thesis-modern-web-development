FROM node:16 AS development

ENV NODE_ENV development

WORKDIR /usr/mthesis/client-side-rest

COPY package*.json ./

RUN yarn

COPY . .
