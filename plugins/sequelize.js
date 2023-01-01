"use strict";

const fp = require("fastify-plugin");
const initModels = require("../models/index");

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

const options = {
  schema: schema,
};

module.exports = fp(async function (fastify, opts) {
  fastify
    .register(require("sequelize-fastify"), {
      instance: "db",
      sequelizeOptions: fastify.config.DATABASE_URL,
    })
    .ready(async () => {
      try {
        // first connection
        await fastify.db.authenticate();
        initModels(fastify.db);

        fastify.log.info("Database connection is successfully established.");
      } catch (err) {
        fastify.log.error(`Connection could not established: ${err}`);
      }
    });
});
