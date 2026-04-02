const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');
const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Level Designer'ısın.
Görevin: harita tasarımı, bölüm akışı, zorluk dağılımı ve oyuncu yolculuğu.
Sadece level ve bölüm kararları verirsin. Kod yazmaz, pazarlama yapmazsın.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.content[0].text;
}

module.exports = { run };
