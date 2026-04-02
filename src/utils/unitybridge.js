const fs = require('fs');
const path = require('path');

const UNITY_SCRIPTS_PATH = path.join(
  process.env.HOME,
  'ThroneRunners/Assets/_Game/Scripts'
);

function saveScript(filename, code) {
  if (!fs.existsSync(UNITY_SCRIPTS_PATH)) {
    fs.mkdirSync(UNITY_SCRIPTS_PATH, { recursive: true });
  }

  const cleanCode = code
    .replace(/```csharp/g, '')
    .replace(/```/g, '')
    .trim();

  const filePath = path.join(UNITY_SCRIPTS_PATH, filename);
  fs.writeFileSync(filePath, cleanCode, 'utf8');
  console.log(`✅ Unity'e kaydedildi: ${filename}`);
  return filePath;
}

function extractAndSaveScripts(agentOutput) {
  const classes = [];
  const lines = agentOutput.split('\n');
  let currentClass = [];
  let inClass = false;
  let braceCount = 0;
  let className = '';

  for (const line of lines) {
    const classMatch = line.match(/public class (\w+)/);
    if (classMatch && !inClass) {
      inClass = true;
      className = classMatch[1];
      currentClass = [];
      braceCount = 0;
    }

    if (inClass) {
      currentClass.push(line);
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;

      if (braceCount === 0 && currentClass.length > 3) {
        classes.push({ name: className, code: currentClass.join('\n') });
        inClass = false;
        currentClass = [];
      }
    }
  }

  classes.forEach(c => saveScript(`${c.name}.cs`, c.code));
  return classes.length;
}

module.exports = { saveScript, extractAndSaveScripts, UNITY_SCRIPTS_PATH };
