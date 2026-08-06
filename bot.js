const mineflayer = require('mineflayer');
const http = require('http');

// سيرفر HTTP لإبقاء الخدمة شغال على Render
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AFK Bot is running!\n');
}).listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

function createBot() {
  console.log('Connecting to Aternos...');

  const bot = mineflayer.createBot({
    host: 'AlWorldA3.aternos.me',
    port: 61658,
    username: 'AFK_Bot_Helper',
    version: '1.20.4',
    auth: 'offline',
    checkTimeoutInterval: 120000 // رفع المهلة إلى دقيقتين لتجاوز بطء شبكة Render
  });

  bot.on('login', () => {
    console.log('>>> Bot has successfully connected to the server! <<<');
  });

  bot.on('spawn', () => {
    console.log('Bot spawned in the world.');
  });

  bot.on('end', (reason) => {
    console.log(`Bot disconnected (${reason}). Reconnecting in 10 seconds...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Minecraft Error:', err.message);
  });
}

createBot();
