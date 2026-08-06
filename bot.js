const mineflayer = require('mineflayer');
const http = require('http');
const { SocksClient } = require('socks');

// فتح سيرفر HTTP لإبقاء الخدمة تعمل 24/7 على Render
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AFK Bot is running!\n');
}).listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

function connectBot() {
  console.log('Connecting to Aternos via Proxy...');

  // استخدام Proxy مجاني لتجاوز حظر Render للـ Ports
  const proxyOptions = {
    proxy: {
      ipaddress: '184.174.9.198',
      port: 1080,
      type: 5
    },
    command: 'connect',
    destination: {
      host: '185.107.194.75',
      port: 61658
    }
  };

  SocksClient.createConnection(proxyOptions)
    .then((info) => {
      const bot = mineflayer.createBot({
        stream: info.socket,
        username: 'AFK_Bot_Helper',
        auth: 'offline',
        checkTimeoutInterval: 60000
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
    })
    .catch((err) => {
      console.log('Proxy Connection Error:', err.message);
      console.log('Retrying in 15 seconds...');
      setTimeout(connectBot, 15000);
    });
}

connectBot();
