const mineflayer = require('mineflayer');
const http = require('http');

// فتح سيرفر HTTP بسيط لإرضاء Render ومنعه من إغلاق الخدمة
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AFK Bot is running!\n');
}).listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

// إعدادات بوت ماين كرافت
function createBot() {
  console.log('Connecting to Minecraft server...');
  
  const bot = mineflayer.createBot({
    host: 'AlWorldA3.aternos.me',
    port: 61658,
    username: 'AFK_Bot_Helper'
  });

  bot.on('login', () => {
    console.log('>>> Bot has successfully connected to the server! <<<');
  });

  bot.on('spawn', () => {
    console.log('Bot spawned in the world.');
  });

  bot.on('end', (reason) => {
    console.log(`Bot disconnected (${reason}). Reconnecting in 15 seconds...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Minecraft Error:', err.message);
  });
}

createBot();
