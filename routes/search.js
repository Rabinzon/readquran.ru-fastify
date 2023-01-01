"use strict";
const _ = require("lodash");
const views = require("../constants/views");

module.exports = async function (fastify, opts) {
  // @todo валидация!
  fastify.get("/search", async function (request, reply) {
    const { query, translator = 1 } = request.query;

    const results = await await fastify.db.query(
      `select 
        surah_id, 
        "order",
        author_id,
        ts_headline('russian', text, keywords, 'StartSel=<mark>,StopSel=</mark>,HighlightAll=true') as text
      from plainto_tsquery('russian', :query) as keywords, "ayats"
      where "ayats".author_id = :authorId and _search @@ keywords
    `,
      {
        model: fastify.db.models.Ayat,
        replacements: { query, authorId: translator },
      }
    );

    return reply.view(views.search, {
      query,
      translator,
      results,
    });
  });
};
