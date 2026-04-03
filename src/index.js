require('dotenv').config();
const fastify = require('fastify')({ logger: false });
const path = require('path');
const { executeCommand } = require('./routes/commands');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function loadState() {
  const { data } = await supabase.from('studio_state').select('state').eq('id', 'main').single();
  return data?.state || null;
}

async function saveState(state) {
  await supabase.from('studio_state').upsert({ id: 'main', state, updated_at: new Date().toISOString() });
}

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/'
});

fastify.register(require('@fastify/websocket'));

const wsClients = new Set();
let sharedState = null;

fastify.get('/ws', { websocket: true }, (socket) => {
  wsClients.add(socket);
  if (sharedState) socket.send(JSON.stringify({ type: 'sync', state: sharedState }));
  socket.on('message', (raw) => {
    try {
      const m = JSON.parse(raw.toString());
      if (m.type === 'sync') {
        sharedState = m.state;
        saveState(m.state).catch(() => {});
      }
    } catch(_) {}
    for (const c of wsClients) {
      if (c !== socket && c.readyState === 1) c.send(raw.toString());
    }
  });
  socket.on('close', () => wsClients.delete(socket));
});

fastify.post('/auth', async (request, reply) => {
  const { username, password } = request.body;
  const correctUser = process.env.ADMIN_USERNAME || 'admin';
  const correctPass = process.env.ADMIN_PASSWORD || 'kivo2024';
  return { ok: username === correctUser && password === correctPass };
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
    sharedState = await loadState();
    console.log(sharedState ? '📦 State loaded from Supabase' : '🆕 No saved state yet');
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    console.log('🎮 AI Game Studio backend running on port 3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();