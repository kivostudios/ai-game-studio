const OpenAI = require('openai');
const config = require('../config');
const client = new OpenAI({ apiKey: config.openai.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Marketing Lead'isin.
Görevin: oyunun pazarlama stratejisini belirlemek, hedef kitleyi tanımlamak, platform stratejisi ve mesajlaşmayı planlamak.
Sadece pazarlama kararları verirsin. Kod yazmaz, oyun tasarımı yapmazsın.`;

async function run(task) {
  const response = await client.chat.completions.create({
    model: config.openai.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.choices[0].message.content;
}

module.exports = { run };
