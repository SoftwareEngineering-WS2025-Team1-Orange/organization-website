FROM node:22

WORKDIR /organization-website

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start:prod"]