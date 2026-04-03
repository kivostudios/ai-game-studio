const agents = require('../agents/index');
const { extractAndSaveScripts } = require('../utils/unitybridge');

const commandMap = {
  '/new-game': [
    { agent: 'creativedirector', task: 'Bana Steam için uygun 3 indie oyun fikri üret. Her biri için: isim, tür, core loop, benzersizlik faktörü ve tahmini geliştirme süresi yaz.' },
    { agent: 'producer', task: 'Yeni bir oyun projesi için ilk 30 günlük üretim takvimi oluştur.' }
  ],
  '/game-design-doc': [
    { agent: 'gamedesigner', task: 'Seçilen oyun için tam bir Game Design Document yaz.' },
    { agent: 'systemdesigner', task: 'Oyun için denge tablosu oluştur.' },
    { agent: 'leveldesigner', task: 'İlk 5 bölüm için level tasarım belgesi oluştur.' }
  ],
  '/build': [
    { agent: 'technicaldirector', task: 'Teknik mimari planı oluştur.' },
    { agent: 'gameplaydeveloper', task: 'Throne Runners: Together için Unity 6 C# scriptleri yaz. Her script mutlaka ```csharp ile başlayıp ``` ile bitmeli. EnemyAI ve GameHUD scriptlerini yaz.', saveToUnity: true },
    { agent: 'uiuxdesigner', task: 'Ana menü ve HUD tasarım belgesi oluştur.' }
  ],
  '/playtest': [
    { agent: 'qalead', task: 'Mevcut build için test planı oluştur.' },
    { agent: 'playtester', task: 'Oyunu gerçek oyuncu gözüyle değerlendir.' },
    { agent: 'analyticsspecialist', task: 'Playtest verilerine göre analiz raporu oluştur.' }
  ],
  '/steam-page': [
    { agent: 'steammanager', task: 'Steam sayfası için tam içerik oluştur.' },
    { agent: 'marketinglead', task: 'Steam lansmanı için pazarlama stratejisi oluştur.' },
    { agent: 'contentcreator', task: 'Lansman için sosyal medya takvimi oluştur.' }
  ],
  '/launch-plan': [
    { agent: 'producer', task: 'Lansman için tam kontrol listesi oluştur.' },
    { agent: 'marketinglead', task: 'Lansman günü pazarlama planı oluştur.' },
    { agent: 'steammanager', task: 'Steam lansman stratejisi oluştur.' }
  ],
  '/concept-art': [
    { agent: 'conceptart', task: 'Throne Runners: Together için konsept sanat üret.' }
  ]
};

async function executeCommand(command, context) {
  const tasks = commandMap[command];
  if (!tasks) return { error: `Bilinmeyen komut: ${command}` };

  console.log(`\n🎮 Komut: ${command}`);
  console.log(`📋 ${tasks.length} ajan devreye giriyor...\n`);

  const results = [];
  for (const { agent, task, saveToUnity } of tasks) {
    console.log(`🤖 ${agent} çalışıyor...`);
    const fullTask = context ? `Proje bağlamı: ${context}\n\n${task}` : task;
    const output = await agents[agent].run(fullTask);

    if (saveToUnity) {
  const { saveScript } = require('../utils/unitybridge');
  const classMatches = [...output.matchAll(/public class (\w+)/g)];
  if (classMatches.length > 0) {
    classMatches.forEach(m => {
      saveScript(`${m[1]}.cs`, output);
    });
    console.log(`📁 ${classMatches.length} script Unity'e kaydedildi.`);
  } else {
    console.log('📁 0 script Unity\'e kaydedildi.');
  }
}

    results.push({ agent, output });
    console.log(`✅ ${agent} tamamladı.\n`);
  }

  return { command, results };
}

module.exports = { executeCommand, commandMap };
