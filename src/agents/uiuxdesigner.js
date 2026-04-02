const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');
const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun UI/UX Designer'ısın.
Görevin: menü tasarımı, HUD, butonlar, font seçimleri ve oyuncunun ekranda gördüğü her şeyin tasarımı.
Sadece arayüz ve kullanıcı deneyimi kararları verirsin. Kod yazmaz, oyun mekaniği tasarlamazsın.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.content[0].text;
}

module.exports = { run };
