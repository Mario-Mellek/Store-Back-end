## API Endpoints

### Products

#### Index: Shows all products.

-   HTTP verb: GET
-   http://localhost:3000/products

#### Show: Shows a single product.

-   HTTP verb: GET
-   http://localhost:3000//products/id

#### Create [token required]: Creates a new product.

-   HTTP verb: POST
-   http://localhost:3000/products

### Users

#### Index [token required]: Shows all users.

-   HTTP verb: GET
-   http://localhost:3000/users

#### Show [token required]: Shows a single user.

-   HTTP verb: GET
-   http://localhost:3000/users/id

#### Create: Creates a new user.

-   HTTP verb: POST
-   http://localhost:3000/users

#### Authenticate: Authinticates a signed up user.

-   HTTP verb: POST
-   http://localhost:3000/users/authenticate

### Orders

#### Index [token required]: Shows all orders.

-   HTTP verb: GET
-   http://localhost:3000/orders

#### Show [token required]: Shows a single order.

-   HTTP verb: GET
-   http://localhost:3000//orders/id

#### Create: Creates a new order.

-   HTTP verb: POST
-   http://localhost:3000/orders

#### order_products [token required]: Adds products to order.

-   HTTP verb: POST
-   http://localhost:3000//orders/addItems

## Data Shapes

#### Product

-   id SERIAL PRIMARY KEY
-   name VARCHAR NOT NULL
-   price NUMERIC NOT NULL

#### User

-   id SERIAL PRIMARY KEY
-   firstName VARCHAR(50) NOT NULL
-   lastName VARCHAR(50) NOT NULL
-   password text
-   userName VARCHAR(50) NOT NULL

#### Orders

-   id SERIAL PRIMARY KEY
-   user_id INTEGER REFERENCES users(id)
-   status VARCHAR(50)

#### Order_products

-   id SERIAL PRIMARY KEY
-   product_id INTEGER REFERENCES products(id)
-   order_id INTEGER REFERENCES orders(id)
-   quantity INTEGER
