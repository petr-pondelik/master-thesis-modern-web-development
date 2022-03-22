##########################################
#               DEVELOPMENT
##########################################

# Specify base Node.js image and its version
# Build development image
FROM node:16 AS development

# Specify our working directory, this is in our container/in our image
WORKDIR /usr/src/app

# Copy the package.jsons from host to container
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

# Build the app to the /dist folder
RUN yarn build

EXPOSE 3000

##########################################
#               PRODUCTION
##########################################

# Build production image
FROM node:14 AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set Working Directory
WORKDIR /usr/src/app

# Copy all from development stage
COPY --from=development /usr/src/app/ .

EXPOSE 3000
CMD [ "node", "dist/main" ]


# Example Commands to build and run this dockerfile
# sudo docker build . -t petr-pondelik/master-thesis-server-side
# sudo docker run -p 8080:3000 petr-pondelik/master-thesis-server-side
