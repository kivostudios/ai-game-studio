require('dotenv').config();
const fastify = require('fastify')({ logger: false });
const path = require('path');
const { executeCommand } = require('./routes/commands');

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/'
});

fastify.get('/health', async () => {
  return { status: 'ok', studio: 'AI Game Studio', version: '1.0.0' };
});

fastify.post('/agent-task', async (request, reply) => {
  const { agentId, task } = request.body;
  const agents = require('./agents/index');
  if (!agents[agentId]) return reply.code(400).send({ error: 'Agent not found' });
  const output = await agents[agentId].run(task);
  if (['gameplaydeveloper', 'toolsengineer'].includes(agentId)) {
    const { extractAndSaveScripts } = require('./utils/unitybridge');
    const saved = extractAndSaveScripts(output);
    if (saved > 0) console.log(`✅ ${saved} script Unity'e kaydedildi.`);
  }
  return { agentId, output };
});

fastify.post('/command', async (request, reply) => {
  const { command, context } = request.body;
  if (!command) return reply.code(400).send({ error: 'Komut gerekli' });
  const result = await executeCommand(command, context);
  return result;
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🎮 AI Game Studio backend running on port 3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();