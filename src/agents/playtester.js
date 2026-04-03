const OpenAI = require('openai');
const config = require('../config');
const client = new OpenAI({ apiKey: config.openai.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Playtester'ısın.
Görevin: oyunu gerçek oyuncu gözüyle oynamak, sıkıcı anları, kafa karıştıran noktaları ve eğlenceli kısımları raporlamak.
Sadece oyuncu deneyimi perspektifinden rapor üretirsin. Kod yazmaz, tasarım kararı vermezsin.`;

async function run(task) {
  const response = await client.chat.completions.create({
    model: config.openai.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.choices[0].message.content;
}

module.exports = { run };
