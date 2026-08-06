const mineflayer = require('mineflayer');
const http = require('http');
const dns = require('dns');

// فتح سيرفر HTTP لإبقاء الخدمة تعمل على Render 24/7
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AFK Bot is running!\n');
}).listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

function connectBot() {
  console.log('Resolving Minecraft server address...');
  
  // الاستعلام التلقائي عن الـ IP والـ Port الحالي للسيرفر
  dns.resolveSrv('_minecraft._tcp.AlWorldA3.aternos.me', (err, addresses) => {
    let host = 'AlWorldA3.aternos.me';
    let serverPort = 25565;

    if (!err && addresses && addresses.length > 0) {
      host = addresses[0].name;
      serverPort = addresses[0].port;
      console.log(`Connecting via resolved address: ${host}:${serverPort}`);
    } else {
      console.log('SRV resolution failed, connecting via default hostname...');
    }

    const bot = mineflayer.createBot({
      host: host,
      port: serverPort,
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
      setTimeout(connectBot, 15000);
    });

    bot.on('error', (err) => {
      console.log('Minecraft Error:', err.message);
    });
  });
}

connectBot();
