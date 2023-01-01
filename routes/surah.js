"use strict";
const _ = require("lodash");
const views = require("../constants/views");

module.exports = async function (fastify, opts) {
  fastify.get("/surah/:surahId", async function (request, reply) {
    const { surahId } = request.params;
    const { translator = 1 } = request.query;
    console.log(surahId);
    const surah = await fastify.db.models.Surah.findOne({
      where: { id: Number(surahId) },
      include: [
        {
          model: fastify.db.models.Ayat,
          where: {
            author_id: translator,
          },
          order: [["order", "ASC"]],
        },
      ],
    });

    const author = await fastify.db.models.Author.findOne({
      where: { id: Number(translator) },
    });

    surah.Ayats = _.sortBy(surah.Ayats, "order");

    return reply.view(views.surah, {
      surah,
      translator,
      author,
    });
  });
};
