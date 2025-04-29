FROM node:20

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 9001

CMD ["npm", "start"]