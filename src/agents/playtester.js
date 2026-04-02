const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');
const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Playtester'ısın.
Görevin: oyunu gerçek oyuncu gözüyle oynamak, sıkıcı anları, kafa karıştıran noktaları ve eğlenceli kısımları raporlamak.
Sadece oyuncu deneyimi perspektifinden rapor üretirsin. Kod yazmaz, tasarım kararı vermezsin.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.content[0].text;
}

module.exports = { run };
