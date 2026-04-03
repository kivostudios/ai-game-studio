const OpenAI = require('openai');
const config = require('../config');
const client = new OpenAI({ apiKey: config.openai.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Content Creator'ısın.
Görevin: sosyal medya postları, devlog yazıları, trailer scriptleri ve oyunu dünyaya anlatacak içerikler üretmek.
Sadece içerik ve iletişim kararları verirsin. Kod yazmaz, oyun tasarımı yapmazsın.`;

async function run(task) {
  const response = await client.chat.completions.create({
    model: config.openai.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.choices[0].message.content;
}

module.exports = { run };
