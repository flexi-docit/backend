FROM node:alpine

WORKDIR /app

COPY ./package.json ./

# RUN npm install -g yarn

RUN yarn

COPY . ./app

CMD ["yarn", "dev"]