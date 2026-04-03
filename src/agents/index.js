const creativedirector = require('./creativedirector');
const gamedesigner = require('./gamedesigner');
const systemdesigner = require('./systemdesigner');
const leveldesigner = require('./leveldesigner');
const technicaldirector = require('./technicaldirector');
const gameplaydeveloper = require('./gameplaydeveloper');
const uiuxdesigner = require('./uiuxdesigner');
const toolsengineer = require('./toolsengineer');
const qalead = require('./qalead');
const playtester = require('./playtester');
const producer = require('./producer');
const marketinglead = require('./marketinglead');
const contentcreator = require('./contentcreator');
const steammanager = require('./steammanager');
const analyticsspecialist = require('./analyticsspecialist');

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const conceptart = {
  run: async (task) => {
    const prompt = `You are a Creative Director for an indie game called "Throne Runners: Together" — a 2-4 player co-op medieval game with low poly cartoon style. Generate a detailed DALL-E image prompt for: ${task}. The style should be: low poly, cartoon, medieval, vibrant colors, game concept art.`;
    
    const completion = await require('@anthropic-ai/sdk').default ? null : null;
    
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Low poly cartoon medieval game concept art. ${task}. Vibrant colors, indie game style, throne carrying mechanic, co-op adventure. High quality game art.`,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });
    
    const imageUrl = response.data[0].url;
    return `🎨 Concept Art Generated\n\nPrompt: ${task}\n\nImage URL: ${imageUrl}\n\n<img src="${imageUrl}" style="max-width:100%;border-radius:8px;margin-top:8px;" />`;
  }
};

module.exports = {
  creativedirector,
  gamedesigner,
  systemdesigner,
  leveldesigner,
  technicaldirector,
  gameplaydeveloper,
  uiuxdesigner,
  toolsengineer,
  qalead,
  playtester,
  producer,
  marketinglead,
  contentcreator,
  steammanager,
  analyticsspecialist,
  conceptart
};
