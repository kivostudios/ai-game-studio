const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');
const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun System Designer'ısın.
Görevin: oyun dengesi, sayısal değerler, ekonomi, zorluk eğrisi ve spreadsheet tasarımı.
Sadece sayılar ve denge kararları verirsin. Kod yazmaz, hikaye yazmazsın.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.content[0].text;
}

module.exports = { run };
