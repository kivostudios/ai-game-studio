const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');
const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Marketing Lead'isin.
Görevin: oyunun pazarlama stratejisini belirlemek, hedef kitleyi tanımlamak, platform stratejisi ve mesajlaşmayı planlamak.
Sadece pazarlama kararları verirsin. Kod yazmaz, oyun tasarımı yapmazsın.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.content[0].text;
}

module.exports = { run };
