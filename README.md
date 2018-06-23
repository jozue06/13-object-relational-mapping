# Lab 13 Josh

[![Build Status](https://travis-ci.com/jozue06/13-object-relational-mapping.svg?branch=josh)](https://travis-ci.com/jozue06/13-object-relational-mapping)

* GitHub: https://github.com/jozue06/13-object-relational-mapping/pull/1

* Heroku: https://josh-lab13.herokuapp.com/

## Server Endpoints

### `/api/v1/resource-name`
- [x]  `POST` request 
  * should pass data as stringifed JSON in the body of a post request to create a new resource
### `api/v1/resource-name`
- [x] `GET` request
* Fetch all resources
### `/api/v1/resource-name/:id`
- [x]  `GET` request
  * should pass the id of a resource through the url endpoint to get a resource
    * **this should use `req.params`, not querystring parameters**
- [x]  `PUT` request
  * should pass data as stringifed JSON in the body of a put request to overwrite a pre-existing resource
- [x] `DELETE` request
  * should pass the id of a resource though the url endpoint to delete a resource
    * **this should use `req.params`**

### Tests
- [x] * create a test that will ensure that your API returns a status code of 404 for routes that have not been registered
* create a series of tests to ensure that your `/api/v1/resource-name` endpoint responds as described for each condition below:
 - [x]  `GET` - test 200, returns a resource with a valid body
 - [x]  `GET` - test 404, respond with 'not found' for valid requests made with an id that was not found
 - [x]  `PUT` - test 200, returns a resource with an updated body
 - [x]  `PUT` - test 400, responds with 'bad request' if no request body was provided
 - [x]  `PUT` - test 404, responds with 'not found' for valid requests made with an id that was not found
 - [x]  `POST` - test 400, responds with 'bad request' if no request body was provided
 - [x]  `POST` - test 200, returns a resource for requests made with a valid body
