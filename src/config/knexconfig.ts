import knexStringcase from "knex-stringcase";

export = knexStringcase({
  client: "mysql2",
  connection: {
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "parking",
    host: process.env.DB_HOST || "localhost",
  },
  seeds: {
    directory: `${__dirname + `/..`}/seeders`,
  },
});
