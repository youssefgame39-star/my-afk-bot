const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'AlWorldA3.aternos.me',
    port: 61658,
    username: 'AFK_Bot_Helper'
  });

  bot.on('login', () => {
    console.log('Bot has connected to the server!');
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
  });
}

createBot();
