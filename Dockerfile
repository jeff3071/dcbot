FROM node:8.12.0

WORKDIR /app

COPY package.json /app/

RUN yarn install && yarn cache clean

COPY . /app/

CMD ["yarn" , "start"]
