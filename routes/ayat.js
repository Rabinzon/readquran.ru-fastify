"use strict";
const _ = require("lodash");
const views = require("../constants/views");

module.exports = async function (fastify, opts) {
  fastify.get(
    "/:surahId(^\\d+)/:ayatId(^\\d+)",
    async function (request, reply) {
      const { surahId, ayatId } = request.params;

      const ayats = await fastify.db.models.Ayat.findAll({
        where: { surah_id: surahId, order: ayatId },
        include: [fastify.db.models.Author, fastify.db.models.Surah],
      });

      const surah = ayats[0].Surah;
      return reply.view(views.ayat, {
        surah,
        ayats,
      });
    }
  );
};
