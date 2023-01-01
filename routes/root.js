const views = require("../constants/views");

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    const surahs = await fastify.db.models.Surah.findAll();
    return reply.view(views.index, { surahs });
  });
};
