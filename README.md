# aubergine
# USER CRUD API

# Installation
    - git clone https://github.com/SoumyaSaliyan-wq/aubergine.git
    - Navigate to the root folder and install npm packages using command  "npm i "
    - Configure .env variables as per the deployment environment [development, production,staging].Please refer the sample 
    env file for more information
- Dev
- To run the process locally "npm start"

- Production
- "pm2 start server.js --name=app" - To start the server 
- "pm2 ls" - To check the server status

# Usage
# Users
    - POST {{SERVER}}/user - Create User
    - POST {{SERVER}}/user/login - User Login
    - GET {{SERVER}}/user/?page=1&limit=1 - List All Users
    - PUT {{SERVER}}/user/:user_id - Update User
    - GET {{SERVER}}/user/:user_id - Get User Detail
    - DELETE {{SERVER}}/user/:user_id - Delete User

# User Settings
    - PUT {{SERVER}}/user-settings/:user_id - Upload User Profile Image(s3 upload provision also supported )