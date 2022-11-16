// const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Chat } = require('whatsapp-web.js');
const { sendMessage, sendMedia, sendButtons } = require('./controllers/send');
const stepsInitial = require('./messages/initial.json');
const cron = require('node-cron');
const mysql = require('mysql');

const numbers = ['51958838270@c.us'];

// '51959163747@c.us',
// '51991310917@c.us',
// '51975348795@c.us',
// '51991692079@c.us',
// '51984112977@c.us',
// '51941476428@c.us',
// '51994712454@c.us',
// '51992386664@c.us',
const buttons = [
  { id: 'boton_si', body: 'SI' },
  { id: 'boton_no', body: 'NO' },
];
const emojis = ['😍', '😀', '😐', '🙁', '😠'];
const buttonText = '¿Te puedo ayudar en algo más?, presiona *SI* o *NO*.';
const client = new Client();
/**{
  authStrategy: new LocalAuth({
    clientId: 'client-one',
  }),
} */
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bd_whatsapp',
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WHATSAPP WEB => Ready');
  const job1 = cron
    .schedule('0 1 10 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 1');
      numbers.map(async (number, idx) => {
        sendMedia(client, number, 'Anuncio_bienvenida.png');
        await sleep(2000);
        for (let i = 0; i < stepsInitial[0].message.length; i++) {
          sendMessage(client, number, stepsInitial[0].message[i]);
          await sleep(1500);
        }
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql =
          "INSERT INTO usuarios (celular, fase) VALUES ('" +
          number +
          "', " +
          "Fase1')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' insertado a la base de datos');
        });
        await sleep(2000);
      });
    })
    .start();
  const job2 = cron
    .schedule('0 16 10 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 2');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[1].message.length; i++) {
          sendMessage(client, number, stepsInitial[1].message[i]);
          await sleep(1500);
        }
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase2' WHERE celular = ${number}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actulizado a fase 2');
        });
        await sleep(2000);
      });
    })
    .start();
  const job3 = cron
    .schedule('10 19 10 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 3');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[2].message.length; i++) {
          sendMessage(client, number, stepsInitial[2].message[i]);
          await sleep(1500);
        }
        await sleep(1000);
        sendMedia(
          client,
          number,
          'paso3.png',
          'Queremos que te sientas seguro usando tu tarjeta. ¡Sigue estas recomendaciones!'
        );
        await sleep(2000);
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase3' WHERE celular = ${number}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actulizado a fase 3');
        });
        await sleep(2000);
      });
    })
    .start();
  const job4 = cron
    .schedule('10 27 10 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 4');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[3].message.length; i++) {
          sendMessage(client, number, stepsInitial[3].message[i]);
          await sleep(1500);
        }
        sendButtons(client, number, buttonText, buttons);
        await sleep(1500);
        const sql = `UPDATE usuarios SET fase = 'Fase4' WHERE celular = ${number}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actulizado a fase 4');
        });
        await sleep(2000);
      });
    })
    .start();
  const job5 = cron
    .schedule('59 39 10 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 5');
      numbers.map(async (number, idx) => {
        sendMedia(
          client,
          number,
          'Anuncio_pagar_servicio.png',
          '¡Hola! 👋 ¡Recuerda que ahora puedes *aprovechar tu tiempo* porque ya no es necesario que hagas cola para pagar tus recibos! Ahorra tiempo y recarga tu celular o paga tu luz, agua o teléfono desde la App Interbank.'
        );
        await sleep(2000);
        for (let i = 0; i < stepsInitial[4].message.length; i++) {
          sendMessage(client, number, stepsInitial[4].message[i]);
          await sleep(1500);
        }
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase5' WHERE celular = ${number}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actulizado a fase 5');
        });
        await sleep(2000);
      });
    })
    .start();
  const job6 = cron
    .schedule('30 45 10 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 6');
      numbers.map(async (number, idx) => {
        for (let i = 0; i < stepsInitial[5].message.length; i++) {
          sendMessage(client, number, stepsInitial[5].message[i]);
          await sleep(1000);
        }
        sendButtons(client, number, buttonText, buttons);
        await sleep(1000);
        const sql = `UPDATE usuarios SET fase = 'Fase6' WHERE celular = ${number}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actulizado a fase 6');
        });
        await sleep(2000);
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
        sendButtons(client, number, buttonText, buttons);
        await sleep(1000);
        const sql = `UPDATE usuarios SET fase = 'Fase7' WHERE celular = ${number}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actulizado a fase 7');
        });
        await sleep(2000);
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
        const sql = `UPDATE usuarios SET fase = 'Fase8' WHERE celular = ${number}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actulizado a fase 8');
        });
        await sleep(2000);
      });
    })
    .start();
});

client.on('message', async (msg) => {
  await sleep(2000);
  const { from, body, selectedButtonId } = msg;

  const sql = `SELECT fase FROM usuarios where celular = ${from}`;
  let response;
  con.query(sql, function (err, result) {
    if (err) throw err;
    response = result;
  });

  if (from == 'status@broadcast') {
    return;
  }

  if (body == 'SI' && selectedButtonId == 'boton_si') {
    true;
    sendMessage(
      client,
      from,
      'Qué bueno que te haya servido la información. Si tienes alguna pregunta escríbenos por este medio'
    );
    await sleep(1000);
    sendMessage(
      client,
      from,
      'Lamentamos que la información no haya sito de tu utilidad. Si tienes alguna pregunta escríbenos por este medio'
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
  con.connect(function (err) {
    if (err) throw err;
    console.log('Database Connected!');
  });
});
client.on('disconnected', (reason) => {
  console.log('WHATSAPP WEB => Disconnected');
  client.initialize();
});
client.initialize();

/*
{
  if (err) throw err;
  var sql =
    "INSERT INTO calificacion (celular, calificacion, mensaje, fecha) VALUES ('" +
    from +
    "', " +
    body +
    ", '', '" +
    new Date() +
    "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log('1 record inserted');
  });
}

*/
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
