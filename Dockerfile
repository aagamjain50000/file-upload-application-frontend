# Use Node.js base image
FROM node:20
WORKDIR /app
ENV NEXT_PUBLIC_API_URL=http://localhost:8000
COPY package*.json ./
RUN npm i --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]