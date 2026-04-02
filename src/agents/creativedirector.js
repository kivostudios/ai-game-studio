const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');

const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Creative Director'ısın.
Görevin: oyun fikirleri üretmek, yaratıcı vizyonu belirlemek ve tüm yaratıcı kararların son onayını vermek.
Sadece kendi rolünle ilgili kararlar verirsin. Teknik konulara karışmazsın.
Her zaman yapılandırılmış, net ve uygulanabilir çıktılar üretirsin.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `${ROLE}\n\nGörev: ${task}`
      }
    ]
  });
  return response.content[0].text;
}

module.exports = { run };
