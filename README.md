## Setting up the Project:
Run `npm install` to install the required dependecies below.
#### Dependencies
`npm i bcrypt`
`npm i body-parser`
`npm i cors`
`npm i dotenv`
`npm i express`
`npm i jasmine`
`npm i jasmine-spec-reporter`
`npm i jsonwebtoken`
`npm i pg`
#### Dev Dependencies
`npm i --save-dev @types/bcrypt`
`npm i --save-dev @types/cors`
`npm i --save-dev @types/dotenv`
`npm i --save-dev @types/eslint`
`npm i --save-dev @types/express`
`npm i --save-dev @types/jasmine`
`npm i --save-dev @types/jsonwebtoken`
`npm i --save-dev @types/node`
`npm i --save-dev @types/nodemon`
`npm i --save-dev @types/pg`
`npm i --save-dev @types/prettier`
`npm i --save-dev @types/supertest`
`npm i --save-dev @types/typescript`
`npm i --save-dev @typescript-eslint/eslint-plugin`
`npm i --save-dev @typescript-eslint/parser`
`npm i --save-dev db-migrate-pg`
`npm i --save-dev eslint`
`npm i --save-dev eslint-config-prettier`
`npm i --save-dev eslint-plugin-prettier`
`npm i --save-dev jasmine-ts`
`npm i --save-dev nodemon`
`npm i --save-dev prettier`
`npm i --save-dev supertest`
`npm i --save-dev ts-node`
`npm i --save-dev tsc-watch`
`npm i --save-dev typescript`

## Creating the Database:
`CREATE USER admin WITH PASSWORD 'password123';`
`CREATE DATABASE store_backend_dev;`
`CREATE DATABASE store_backend_test;`
`GRANT ALL PRIVILEGES ON DATABASE store_backend_dev TO admin;`
`GRANT ALL PRIVILEGES ON DATABASE store_backend_test TO admin;`

## Running Database migrations: 
Run `db-migrate up` to get the database schema below:

    /* products table up */
    CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    price NUMERIC NOT NULL
    );

    /* Users table up */
    CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password text,
    userName VARCHAR(50) NOT NULL
    );    
    
    /* Orders table up */

    CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(50)
    );
    
    /* Order_products table up */

    CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    order_id INTEGER REFERENCES orders(id),
    quantity INTEGER
    );
## Connecting to the database:
#### required ENV variables:
    PG_HOST= 127.0.0.1
    PG_DB= store_backend_dev
    PG_TEST_DB= store_backend_test
    PG_USER= admin
    PG_PASSWORD= password123
    ENV= dev
    BCRYPT_PASSWORD= b32c357b130e40d043156c5750dfc7d9a104d57d38fc66285fea923afb8633274649f8e34a814d9a246667bdf2d3943e2c0245eee9002382e6800aa696ce5b10
    SALT_ROUNDS=10
    SECRET= 22b84b8cbf2c8406ccb42ab8e272514637b63bf6e97defa23b7f928a9687a6606eb6d41a140030af9d9fff417b52f9f3eba0a3f6e36b81bf75012e240d83ac38

#### Ports:
Database is running on default PG Port: 5432
Backend is running on port: 3000

## npm scripts.
#### Test script:
- `npm run test`

#### Start script:
- `npm run start` to start nodemon or `node ./build/server.js` after compiling to JS.

#### Build script:
- `npm run build` to build the project and compile to JS.

#### prettier and lint scripts:
- `npm run lint` and `npm run prettier` to check the code for errors and make it more readable.


