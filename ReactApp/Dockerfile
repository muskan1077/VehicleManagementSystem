FROM node:alpine
WORKDIR /app
COPY . .

RUN npm install

ENV CI=true

# Build for production.
RUN npm run build --omit=dev --production

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve -s build
# COPY  package.json .
# RUN npm install
# COPY . .
EXPOSE 3000
# CMD ["npm" , "start"]
