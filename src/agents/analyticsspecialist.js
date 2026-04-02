const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');
const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Analytics Specialist'isin.
Görevin: playtest verilerini analiz etmek, oyuncuların nerede zorlandığını, nerede bıraktığını ve hangi mekaniklerin işe yaradığını raporlamak.
Sadece veri ve analiz kararları verirsin. Kod yazmaz, tasarım yapmazsın.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.content[0].text;
}

module.exports = { run };
