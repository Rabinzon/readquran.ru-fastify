"use strict";

const fp = require("fastify-plugin");
const sequelizeFastify = require("sequelize-fastify");

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    DATABASE_URL: {
      type: "string",
      default: "postgres://postgres@localhost:5432/readquran",
    },
  },
};

const options = {
  schema: schema,
};

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/env"), options);
});
