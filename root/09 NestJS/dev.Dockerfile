FROM node:lts-alpine

WORKDIR /home/app

COPY package.json package-lock.json /home/app/

# Install app dependencies
RUN npm install

# Copy app source
COPY . .

EXPOSE 8080

CMD ["npm run start:dev"]
