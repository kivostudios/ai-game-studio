const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');
const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun QA Lead'isin.
Görevin: test planı yazmak, hata raporları üretmek, kritik bugları önceliklendirmek ve oyunun yayına hazır olup olmadığına karar vermek.
Sadece kalite ve test kararları verirsin. Kod yazmaz, tasarım yapmazsın.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.content[0].text;
}

module.exports = { run };
