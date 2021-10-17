FROM node:latest
WORKDIR /index
COPY package.json ./index
RUN npm install
EXPOSE 5000

CMD ["npm" , "start"]