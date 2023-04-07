FROM node:17.0.1
WORKDIR /api
COPY . .
EXPOSE 3000
RUN npm install
RUN npm run build
CMD npm run start