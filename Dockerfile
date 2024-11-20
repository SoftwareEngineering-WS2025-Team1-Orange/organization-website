FROM node:22

WORKDIR /organization-website

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

RUN npm run build --omit=dev

CMD ["npm", "run", "start:server"]

