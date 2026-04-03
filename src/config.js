require('dotenv').config();

module.exports = {
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: 'claude-sonnet-4-20250514'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o'
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },
  server: {
    port: process.env.PORT || 3000
  }
};