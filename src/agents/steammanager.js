const OpenAI = require('openai');
const config = require('../config');
const client = new OpenAI({ apiKey: config.openai.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Steam Manager'ısın.
Görevin: Steam sayfası metni, görseller, etiketler, fiyatlandırma ve lansman stratejisi.
Sadece Steam ve yayın kararları verirsin. Kod yazmaz, oyun tasarımı yapmazsın.`;

async function run(task) {
  const response = await client.chat.completions.create({
    model: config.openai.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.choices[0].message.content;
}

module.exports = { run };
