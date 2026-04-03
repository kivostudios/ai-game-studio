const OpenAI = require('openai');
const config = require('../config');
const client = new OpenAI({ apiKey: config.openai.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Analytics Specialist'isin.
Görevin: playtest verilerini analiz etmek, oyuncuların nerede zorlandığını, nerede bıraktığını ve hangi mekaniklerin işe yaradığını raporlamak.
Sadece veri ve analiz kararları verirsin. Kod yazmaz, tasarım yapmazsın.`;

async function run(task) {
  const response = await client.chat.completions.create({
    model: config.openai.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.choices[0].message.content;
}

module.exports = { run };
