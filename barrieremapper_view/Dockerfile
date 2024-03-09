FROM node

# Create webapp directory
WORKDIR /usr/src/webapp

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY webapp/package*.json ./


# install dependencies
RUN npm install

# Bundle app source
COPY webapp/ .

EXPOSE 3000
CMD [ "npm", "start" ]