# Specify base Node.js image and its version
# Build development image
FROM node:16

# Specify our working directory, this is in our container/in our image
WORKDIR /usr/m-thesis/app

COPY package*.json ./

RUN yarn

COPY . .
