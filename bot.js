const mineflayer = require('mineflayer');
const http = require('http');

// فتح سيرفر HTTP لإبقاء الخدمة تعمل على Render
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AFK Bot is running!\n');
}).listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

function connectBot() {
  console.log('Connecting to Aternos via DynIP...');

  const bot = mineflayer.createBot({
    host: 'AlWorldA3.aternos.me',
    port: 61658,
    username: 'AFK_Bot_Helper',
    auth: 'offline',
    checkTimeoutInterval: 90000, // زيادة وقت الانتظار لتفادي ETIMEDOUT
    defaultChatPatterns: false
  });

  bot.on('login', () => {
    console.log('>>> Bot has successfully connected to the server! <<<');
  });

  bot.on('spawn', () => {
    console.log('Bot spawned in the world.');
  });

  bot.on('end', (reason) => {
    console.log(`Bot disconnected (${reason}). Reconnecting in 10 seconds...`);
    setTimeout(connectBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Minecraft Error:', err.message);
  });
}

connectBot();
