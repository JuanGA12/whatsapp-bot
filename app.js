const qrcode = require('qrcode-terminal');
const { Client, Buttons } = require('whatsapp-web.js');
const { sendMessage, sendMedia } = require('./controllers/send');
const stepsInitial = require('./messages/initial.json');

// 51958838270@c.us
const cron = require('node-cron');
const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('client ready');
  // listenMessage();
  // const job = cron
  //   .schedule('*/3 * * * * *', () => {
  //     console.log('------------------------');
  //     console.log('Enviando mensaje 1');
  //     client.sendMessage('51991310917@c.us', stepsInitial[0].message[0]);
  //     client.sendMessage('51991310917@c.us', stepsInitial[0].message[1]);
  //     client.sendMessage('51991310917@c.us', stepsInitial[0].message[2]);
  //   })
  //   .start();
});

client.on('message', async (msg) => {
  const { from, body } = msg;
  for (let i = 0; i < stepsInitial[0].message.length; i++) {
    sendMessage(client, from, stepsInitial[0].message[i]);
    await sleep(1000);
  }
  await sleep(1000);
  sendMedia(client, from, 'Anuncio_bienvenida.png');
});

client.initialize();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}