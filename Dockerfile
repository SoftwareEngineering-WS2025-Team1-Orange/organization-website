FROM node:22

WORKDIR /organization-website

COPY package*.json ./

RUN npm install 
#RUN npm install --production

COPY . .

ENV PORT=4200

EXPOSE 4200

CMD ["npm", "run", "start:prod"]