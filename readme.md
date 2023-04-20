# RentCar Node 🚗

__RentCar Node__ is the backend service responsible to serve all rentCar front-end applications

# Pre-requesites

- Node >= v14.x
- npm or yarn
- Docker

<br>

# Running the application

1. Install the dependencies

```
yarn
```


2. Setup your dev environment running docker-compose

```
docker-compose up -d
```


3. Run all migrations

```
yarn typeorm migration:run
```

4. Start the application

```
yarn dev
```


# Testing

The unit tests were written uning `jest`, while the integration tests were simulated using `supertest`
<br> <br>
To execute all tests, just run

```
yarn test
```

# CI/CD

After push any commit into `main` branch, the CI/CD flow will be initialized through a github action.

The flow folow these steps:

- Checkout
- Build
- Transfer files for the Virtual Machine where it will be deployed
- Install dependencies in the virtual machine
- Deploy the application


# Database

In order to create new migrations, run the following command:
```
yarn typeorm migration:create -n <MIGRATON_NAME>
```

To execute migrations in your local database, run:
```
yarn typeorm migration:run
```
