// const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { sendMessage, sendMedia, sendButtons } = require('./controllers/send');
const stepsInitial = require('./messages/initial.json');
const cron = require('node-cron');

const numbers = [
  '51959163747@c.us',
  '51958838270@c.us',
  '51991310917@c.us',
  '51975348795@c.us',
  '51991692079@c.us',
  '51984112977@c.us',
  '51941476428@c.us',
  '51994712454@c.us',
  '51992386664@c.us',
];
const buttons = [
  { id: 'boton_si', body: 'SI' },
  { id: 'boton_no', body: 'NO' },
];
const emojis = ['😍', '😀', '😐', '🙁', '😠'];
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
    .schedule('0 10 18 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 1');
      numbers.map(async (number, idx) => {
        sendMedia(client, number, 'Anuncio_bienvenida.png');
        await sleep(1000);
        for (let i = 0; i < stepsInitial[0].message.length; i++) {
          sendMessage(client, number, stepsInitial[0].message[i]);
          await sleep(1000);
        }
        sendButtons(
          client,
          number,
          '¿Te puedo ayudar en algo más?, presiona SI o NO.',
          buttons
        );
        await sleep(1000);
      });
    })
    .start();
  const job2 = cron
    .schedule('0 13 18 * * * ', async () => {
      console.log('--------------------------');
      console.log('Job 2');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[1].message.length; i++) {
          sendMessage(client, number, stepsInitial[1].message[i]);
          await sleep(1000);
        }
        sendButtons(
          client,
          number,
          '¿Te puedo ayudar en algo más?, presiona SI o NO.',
          buttons
        );
        await sleep(1000);
      });
    })
    .start();
  const job3 = cron
    .schedule('0 16 18 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 3');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[2].message.length; i++) {
          sendMessage(client, number, stepsInitial[2].message[i]);
          await sleep(1000);
        }
        await sleep(1000);
        sendMedia(
          client,
          number,
          'paso3.png',
          'Y queremos que te sientas seguro utilizándola. Sigue estas recomendaciones.'
        );
        await sleep(1000);
        sendButtons(
          client,
          number,
          '¿Te puedo ayudar en algo más?, presiona SI o NO.',
          buttons
        );
        await sleep(1000);
      });
    })
    .start();
  const job4 = cron
    .schedule('0 19 18 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 4');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[3].message.length; i++) {
          sendMessage(client, number, stepsInitial[3].message[i]);
          await sleep(1000);
        }

        sendButtons(
          client,
          number,
          '¿Te puedo ayudar en algo más?, presiona SI o NO.',
          buttons
        );
        await sleep(1000);
      });
    })
    .start();
  const job5 = cron
    .schedule('0 21 18 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 5');
      numbers.map(async (number, idx) => {
        sendMedia(
          client,
          number,
          'Anuncio_pagar_servicio.png',
          '¡Hola! 👋 ¡Recuerda que ya no es necesario que hagas cola para pagar tus recibos! Ahorra tiempo y recarga tu celular o paga tu luz, agua o teléfono desde la App Interbank.'
        );
        await sleep(1000);
        for (let i = 0; i < stepsInitial[4].message.length; i++) {
          sendMessage(client, number, stepsInitial[4].message[i]);
          await sleep(1000);
        }
        sendButtons(
          client,
          number,
          '¿Te puedo ayudar en algo más?, presiona SI o NO.',
          buttons
        );
        await sleep(1000);
      });
    })
    .start();
  const job6 = cron
    .schedule('0 23 18 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 6');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[5].message.length; i++) {
          sendMessage(client, number, stepsInitial[5].message[i]);
          await sleep(1000);
        }
        sendButtons(
          client,
          number,
          '¿Te puedo ayudar en algo más?, presiona SI o NO.',
          buttons
        );
        await sleep(1000);
      });
    })
    .start();
  const job7 = cron
    .schedule('0 26 18 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 7');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[6].message.length; i++) {
          sendMessage(client, number, stepsInitial[6].message[i]);
          await sleep(1000);
        }
        sendButtons(
          client,
          number,
          '¿Te puedo ayudar en algo más?, presiona SI o NO.',
          buttons
        );
        await sleep(1000);
      });
    })
    .start();
  const job8 = cron
    .schedule('0 28 18 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 8');
      numbers.map(async (number, idx) => {
        sendMedia(client, number, 'f.png');
        await sleep(1000);
        for (let i = 0; i < stepsInitial[7].message.length; i++) {
          sendMessage(client, number, stepsInitial[7].message[i]);
          await sleep(1000);
        }
      });
    })
    .start();
});

client.on('message', async (msg) => {
  const { from, body, selectedButtonId } = msg;
  if (from == 'status@broadcast') {
    return;
  }
  if (body == 'SI' && selectedButtonId == 'boton_si') {
    sendMessage(client, from, 'Si tienes alguna duda, escríbenos por aquí 👇');
    await sleep(1000);
    sendMessage(
      client,
      from,
      'Recuerda que te atenderemos en nuestro horario de lunes a viernes 9 a 6 pm.'
    );
    await sleep(1000);
  }

  if (body == 'NO' && selectedButtonId == 'boton_no') {
    sendMessage(client, from, 'Ok, ¡hasta luego! 😊');
    await sleep(1000);
  }
  if ((body >= 1 && body <= 5) || emojis.includes(body)) {
    sendMessage(
      client,
      from,
      '*¡Excelente!* 🙌  te agradeceríamos que nos dejes un comentario para mejorar poco a poco nuestro contenido.'
    );
    await sleep(1000);
  }
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
