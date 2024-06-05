# USER CRUD API

# Installation

    - git clone https://github.com/SoumyaSaliyan-wq/aubergine.git
    - Navigate to the root folder and install npm packages using command  "npm i "
    - Configure .env variables as per the deployment environment [development, production,staging].Please refer the sample
    env file for more information

# Development

- To run the process locally "npm start"

# Production

- "pm2 start server.js --name=app" - To start the server
- "pm2 ls" - To check the server status

# Users

- POST {{SERVER}}/user - Create User

    curl --location 'localhost:3011/user' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "phone_number":"1234527890",
        "gender":"Female",
        "password":"12345678",
        "email":"acac@gmal.com"
    }'

- POST {{SERVER}}/user/login - User Login

        curl --location 'localhost:3011/user/login' \
        --header 'Content-Type: application/json' \
        --data-raw '{
        "email":"acac@gmal.com",
        "password":"12345678"
        }'

- GET {{SERVER}}/user/?page=1&limit=1 - List All Users

    curl --location 'localhost:3011/user/?page=1&limit=1' --header 'Authorization: Bearer <token>'

- PUT {{SERVER}}/user/:user_id - Update User

    curl --location --request PUT 'localhost:3011/user/:user_id' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>' \
    --data '{
        "address":"soumya"
    }'

- GET {{SERVER}}/user/:user_id - Get User Detail

    curl --location 'localhost:3011/user/?page=1&limit=1' --header 'Authorization: Bearer <token>'

- DELETE {{SERVER}}/user/:user_id - Delete User

    curl --location --request DELETE 'localhost:3011/user/1' --header 'Authorization: Bearer <token>'

# User Settings

- PUT {{SERVER}}/user-settings/:user_id - Upload User Profile Image(s3 upload provision also supported )

    curl --location --request PUT 'localhost:3011/user-settings/6' \
    --header 'Authorization: Bearer <token>' \
    --form 'profile_picture=@"/C:/Users/BAPS/Downloads/Screenshot 2024-06-03 120327.png"'
