# aubergine
# USER CRUD API

- [Installation]
    - git clone https://github.com/SoumyaSaliyan-wq/aubergine.git
    - Navigate to the root folder and install npm packages using command  "npm i "
    - Configure .env variables as per the deployment environment [development, production,staging].Please refer the sample 
    env file for more information
    - To run the process locally "npm start"

- [Usage]
    - POST {{SERVER}}/user - Create User
    - POST {{SERVER}}/user/login - User Login
    - GET {{SERVER}}/user/?page=1&limit=1 - List All Users
    - PUT {{SERVER}}/user/:user_id - Update User
    - GET {{SERVER}}/user/:user_id - Get User Detail
    - DELETE {{SERVER}}/user/:user_id - Delete User
