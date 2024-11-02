FROM node:23-bullseye

WORKDIR /app/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]