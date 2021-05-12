# A CRUD REST API

### API FUNCTIONS

- GET  `/`
    > gets all the DATA

- POST  `/`
    > ADDS A DATA
    ```JS
    BODY
    {
      "firstname": "sample",
      "lastname": "sample"
    }
    ```
- PUT  `/:firstname`
    > update a tdata item using by passing the firstname as parameter
    ``
    ```JS
    {
      "firstname": "sample",
      "lastname": "sample"
    }
    ```
- DELETE  `/:firstname`
    > Deletes the data passed in the parameter

Heroku link : https://pure-falls-56802.herokuapp.com/
