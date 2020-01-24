FROM node:8.14.0-alpine
WORKDIR /usr/cathering-company
COPY  . .
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
