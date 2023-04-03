# client

## create .env file in client folder and add this (if it lost)

VITE_BASE_URL='http://127.0.0.1:3001'

## then 

npm i
npm run dev

######

# server

i use MongoDB Compass

## find in server.js

mongoose.connect("mongodb://127.0.0.1:27017/crud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

add your link db

## then

npm i
npm run dev

# if you cant star client/server make next steps

remove node_modules, package-lock.json in folder you cant start the project

## then 

npm i 
npm run dev
