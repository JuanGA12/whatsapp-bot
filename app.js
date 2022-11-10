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
client.on('message', (msg) => {
  const { from, body } = msg;
  // if (from == 'status@broadcast' || from == '120363025006115402@g.us') {
  //   return;
  // }
  //const date = new Date();
  //const hour = date.getHours();
  // if (hour < 13) {
  //   const response = await sendMessage(
  //     client,
  //     from,
  //     'No atendemos a esta hora'
  //   );
  //   const { status, message } = response;
  //   console.log(message);
  //    return
  // }
  if (body == 'a') {
    // client.sendMessage(from, 'holaaaaa');
    //console.log(stepsInitial[0].message.length);
    // for (let i = 0; i < stepsInitial[0].message.length; i++) {
    //   sendMessage(client, from, stepsInitial[0].message[i]);
    // }
    client.sendMessage(from, 'hola1');
    client.sendMessage(from, 'hola2');
    client.sendMessage(from, 'hola3');
    // sendMedia(client, from, 'Anuncio_bienvenida.png');
    // // await sendMedia(client, from, 'Anuncio_bienvenida.png');
    // await sendMessage(client, from, 'hola2');
    // await sendMessage(client, from, 'hola3');
    // await sendMedia(client, from, 'Anuncio_bienvenida.png');
    //const response3 = await sendMedia(client, from, 'Anuncio_bienvenida.png');
    //const { message } = response3;
    //console.log(message);
    // let button = new Buttons(
    //   'Button body',
    //   [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }],
    //   'title',
    //   'footer'
    // );
    // const messages = stepsInitial[0].message;
    // console.log(messages);
    // messages.map(async (e) => {
    //   const a = await client.sendMessage(from, e);
    // });
  }
});

client.initialize();
