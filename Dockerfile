FROM node:18-alpine as build
RUN apt-get update && apt-get install -y git
RUN git init && git remote add origin https://github.com/I-Spider-Man/TripPartnerFrontEnd.git
RUN git pull origin updated-frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]