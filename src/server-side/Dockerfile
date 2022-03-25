##########################################
#               DEVELOPMENT
##########################################

# Specify base Node.js image and its version
# Build development image
FROM node:16

# Specify our working directory, this is in our container/in our image
WORKDIR /usr/m-thesis/app

# Set node env to dev
ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

# Bundle all app source files into the container
COPY . .
