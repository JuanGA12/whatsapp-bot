// const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, Buttons, LocalAuth } = require('whatsapp-web.js');
const { sendMessage, sendMedia } = require('./controllers/send');
const stepsInitial = require('./messages/initial.json');
const cron = require('node-cron');

const numbers = ['51958838270@c.us', '51943731086@c.us'];
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: 'client-one',
  }),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WHATSAPP WEB => Ready');
  const job1 = cron
    .schedule('0 30 15 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 1');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[0].message.length; i++) {
          sendMessage(client, number, stepsInitial[0].message[i]);
          await sleep(1000);
        }
        await sleep(1000);
        sendMedia(client, number, 'Anuncio_bienvenida.png');
      });
    })
    .start();
  const job2 = cron
    .schedule('0 45 15 * * * ', async () => {
      console.log('--------------------------');
      console.log('Job 2');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[1].message.length; i++) {
          sendMessage(client, number, stepsInitial[1].message[i]);
          await sleep(1000);
        }
      });
    })
    .start();
  const job3 = cron
    .schedule('0 0 16 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 3');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[0].message.length; i++) {
          sendMessage(client, number, stepsInitial[0].message[i]);
          await sleep(1000);
        }
        await sleep(1000);
        sendMedia(client, number, 'Anuncio_pagar_servicio.png');
      });
    })
    .start();
  const job4 = cron
    .schedule('0 15 16 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 4');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[3].message.length; i++) {
          sendMessage(client, number, stepsInitial[3].message[i]);
          await sleep(1000);
        }
      });
    })
    .start();
  const job5 = cron
    .schedule('0 30 16 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 5');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[4].message.length; i++) {
          sendMessage(client, number, stepsInitial[4].message[i]);
          await sleep(1000);
        }
      });
    })
    .start();
  const job6 = cron
    .schedule('0 45 16 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 6');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[5].message.length; i++) {
          sendMessage(client, number, stepsInitial[5].message[i]);
          await sleep(1000);
        }
      });
    })
    .start();
  const job7 = cron
    .schedule('0 0 17 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 7');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[7].message.length; i++) {
          sendMessage(client, number, stepsInitial[7].message[i]);
          await sleep(1000);
        }
      });
    })
    .start();
  const job8 = cron
    .schedule('0 15 17 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 8');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[8].message.length; i++) {
          sendMessage(client, number, stepsInitial[8].message[i]);
          await sleep(1000);
        }
      });
    })
    .start();
});

client.on('message', async (msg) => {
  const { from, body } = msg;
  if (from == 'status@broadcast') {
    return;
  }
  // for (let i = 0; i < stepsInitial[0].message.length; i++) {
  //   sendMessage(client, from, stepsInitial[0].message[i]);
  //   await sleep(1000);
  // }
  // await sleep(1000);
  // sendMedia(client, from, 'Anuncio_bienvenida.png');
});
client.on('authenticated', (session) => {
  console.log('WHATSAPP WEB => Authenticated');
});
client.on('disconnected', (reason) => {
  console.log('WHATSAPP WEB => Disconnected');
  client.initialize();
});
client.initialize();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
