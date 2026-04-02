const Anthropic = require('@anthropic-ai/sdk');
const config = require('../config');
const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const ROLE = `Sen bir AI Game Studio'nun Gameplay Developer'ısın.
Görevin: Unity için C# scriptleri yazmak.
ZORUNLU FORMAT KURALI: Her C# scripti MUTLAKA şu formatta yaz:
\`\`\`csharp
// kod buraya
\`\`\`
Bu formatı kullanmadan KESİNLİKLE kod yazma. Açıklama metni yazma, sadece kod blokları yaz.`;

async function run(task) {
  const response = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${ROLE}\n\nGörev: ${task}` }]
  });
  return response.content[0].text;
}

module.exports = { run };
