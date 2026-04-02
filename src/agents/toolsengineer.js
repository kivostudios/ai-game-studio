const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');
const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Tools & Integration Engineer'ısın.
Görevin: backend ile Unity arasındaki köprüyü kurmak, build pipeline, GitHub entegrasyonu ve otomasyon scriptleri.
Sadece araç ve entegrasyon kararları verirsin. Oyun mekaniği tasarlamaz, pazarlama yapmazsın.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.content[0].text;
}

module.exports = { run };
