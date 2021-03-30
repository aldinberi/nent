# CRUD-based backend with usefull features

> The goal of this project is to create a secure CRUD-based backend on a restaurant datebase

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
  - [Required features](#required-features)
  - [Additional features](#additional-features)
- [Possible improvments](#possible-improvments)

## General info

The task in this project was to create a CRUD-based backend for a website for managing restaurants. For the creation of this backend, NodeJS was used together with Express. All the usual CRUD APIs have been created and a few extra features have been added that would complement the existing ones. All of the API created are documented using Swagger OpenAPI which can found at [link](https://nent-a.herokuapp.com/api-docs/)

## Technologies

The node packages used for the creation of this project are:

- axios - version 0.21.1
- bcrypt - version 5.0.0
- express - version 4.17.1
- express-validator - version 6.9.2
- jest - version 26.6.3
- jsonwebtoken - version 8.5.1
- mongoose - version 5.11.15
- nodemon - version 2.0.7
- supertest - version 6.1.3
- swagger-jsdoc - version 6.0.2
- swagger-ui-express - version 4.1.6

## Setup

Be able to set up the project it is enough to have [NodeJS](https://nodejs.org/en/) installed on your machine locally and to execute `npm install` in the terminal inside of the project folder. To start the project is it enough to execute `npm start`. One problem that may occur is that the config file is missing from the repository because of security reasons.

## Features

### CRUD operations

#### Endpoint for listing all restaurants

The API for listing all of the restaurants is located at the route `/restaurant` with the usage of the GET method. The API has pagination which will by default return only 5 restaurants. By using the limit and offset query parameters this can be changed. The limit and offset parameters are validated and sanitized by the API.

#### Endpoint for getting more info on a single restaurant

The API for getting more info on a single restaurant is located at the route `/restaurant/:id` with the usage of the GET method. By providing the mongo generated id the route returns the specific restaurant from the database which all of its information as an object. The provided id is being validated by the API for the right type and content.

#### Endpoint for posting a single restaurant

The API for posting a single restaurant is located at the route `/restaurant` with the usage of POST method. One requirement to be able to post is for the request to have in the header a JWT token with a specific signature. This JWT token is generated when a user logs in using the route `/user/login`. This has been added because in the real world we wouldn't let anyone be able to post restaurants on the systems but rather only specific individuals. All data being send in the body of the POST request is being validated by the API for the right type and contents. One example is that it's not allowed to post a restaurant with a name that already exists in the database.

#### Endpoint for deleting a single restaurant

The API for deleting a single restaurant is located at the route `/restaurant/:id` with the usage of the DELETE method. One requirement to be able to delete is for the request to have in the header a JWT token with a specific signature. This JWT token is generated when a user loggs in using the route `/user/login`. This has been added because in the real world we wouldn't let anyone be able to delete restaurants on the systems but rather only specific individuals. The provided id is being validated by the API for the right type and content.

#### Endpoint for filtering and sorting restaurants

The API for listing all of the restaurants is located at the route `/restaurant` with the usage of the GET method. By sending query parameters that request the restaurants can be filtered by name, address, opening hours, closing hours, and days. Sorting is done on the field rating and price level in a manager descending by default and ascending by additional parameter. All data being sent as query parameters are being validated API for the right type and contents.

#### Endpoint for updating restaurants

The API for updating a single restaurant is located at the route `/restaurant/:id` with the usage of PUT method. One requirement to be able to post is for the request to have in the header a JWT token with a specific signature. This JWT token is generated when a user logs in using the route `/user/login`. This has been added because in the real world we wouldn't let anyone be able to post restaurants on the systems but rather only specific individuals. All data being send in the body of the PUT request as well the provided id is being validated by the API for the right type and contents. One example is that it's not allowed to post a restaurant with a name that already exists in the database.

#### Testing

The testing framework used for the creation of the tests is [Jest](https://nodejs.org/en/). In total 55 tests have been created which are checking various validation on body and query parameters and the functionalities of the APIs. Continuous integration has been implemented using Travis CI in such a way that every time something is committed on the main branch Travis CI builds the project and runs the included tests. If all pass Travis deploys the project on Heroku otherwise it sends a mail saying not all tests passed and nothing is deployed.

### Additional features

#### Deployment

This project is fully deployed by using:

- MongoDB Atlas - where the database is hosted
- Heroku - where the backend is hosted, here is the [link](https://nent-a.herokuapp.com/api-docs/)

One additional feature added is the inclusion of Travis CI which allows continuous integration and deployment. It is integrated into this project in such a way that every time something is committed on the main branch Travis CI builds the project and runs the included tests (55 tests). If all pass Travis deploys the project on Heroku otherwise it sends a mail saying not all tests passed and nothing is deployed.

#### Validation

Validation has been added to all possible inputs of the APIs using express-validator which checks for the type of the inputted data as well as if it contains the right content, for example, the first name not having special characters or latitude being greater than 90.

Besides the API validation, a validation schema has been added on the database level as well preventing the creating of additional fields, locking the type of data in the fields, and which fields are required for the creation of a record (document).

#### User APIs

User registration and login APIs have been added to secure the more sensitive APIs for updating, posting, and deleting the restaurants. On the register API, the email field is checked if it already exists in the database and the password is checked if it has been breached using the "have I been pwned" public database of breached passwords. The password is encrypted using bcrypt and then stored in the database.

#### Swagger OpenAPI specification

Because the goal of this test was to create APIs, OpenAPI specification has been added which can be accessed on this [link](https://nent-a.herokuapp.com/api-docs/). It presents in a clear way using generated frontend all the available APIs including all the relevant information about them as well as the possibility to test them.

#### Singleton pattern

Singleton design pattern has been used for DAO (Data Access Objects) to have a cleaner way to access the mongoose methods and avoid repetition as well as keeping only one instance of the DAO class instantiated.

## Possible improvments

### Dockerization

Due to the lack of time and the unfamiliarity of docker containers, I didn't set up the project to work inside of a docker container. The master thesis I am working on right now on the topic of making a resource-aware schduler inludes the usage of docker container so in the near future I should be quite familiar with them.
