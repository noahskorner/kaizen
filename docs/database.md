# Database

## Connecting to the database

### Prerequisites

Ensure the database docker container is running. You can start it by running the application:

```bash
npm run dev
```

### Connect to the database

To connect to the database, run the following command from the root of the repo:

```bash
npm run db:connect
```

## Seeding

### Prerequisites

Before running the seed command, you must tell the application what credentials you will be using to login. Run the following command from the root of the repo:

```bash
cp packages/data/src/prisma/seed/local.example.json packages/data/src/prisma/seed/local.json
```

And replace the values with your own credentials:

`local.json`

```json
{
  "user": {
    "email": "YOUR_EMAIL_HERE",
    "password": "YOUR_PASSWORD_HERE"
  }
}
```

### Running the seed command

To populate the database with some sample data for a user, run the following command from the root of the repo:

```bash
npm run db:seed
```
