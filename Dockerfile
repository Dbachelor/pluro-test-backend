FROM node:18-alpine

RUN npm install -g nodemon

WORKDIR /pluro-test-backend

COPY package.json .

RUN npm install

COPY . .


EXPOSE 5000

CMD ["npm ", "run", "dev"]