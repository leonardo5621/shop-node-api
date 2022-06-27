## Starting the database

This is an example of a Node API with Express, TypeORM and PostgreSQL.

The database can be setup by just running a docker container specified in the `docker-compose` file by just running:

    docker-compose up -d
 
You can configure the database with the pre-defined models running:

    npm run typeorm schema:sync
    npm run typeorm migration:run


## Launching the application

You can launch the server through the command:

    npm run serve

The API is going to be available at the local port 3333.

### Available routes

 - POST `/order`: Create an order
 - PUT `/order/:orderId`: Update an open order
 - GET `/order/:orderId`: Get an order by its id
 - POST `/order/complete`: Complete the order

Example of an order creation:

    { 
      "shopId": 1,
      "productsRelation": [
        { "productId": 1, "quantity": 2},
        { "productId": 2, "quantity": 1}
      ],
      "clientEmail": "test@example.com"
    }
    
Completing the order:

    { 
      "orderId": 1,
      "billingAddress": "Example billing",
      "paymentType": "card",
      "billTo": "Customer 1"
    }
