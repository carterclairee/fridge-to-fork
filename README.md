## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called ecg: `create database ecg`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=ecg
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create the tables called `User` and `Fridge`in your database.

- Make sure you understand how the `User` and the `Fridge` table is constructed. In your MySQL console, you can run `use ecg;` and then `describe User;` `describe Fridge;`  to see the structure of the tables.

### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.
