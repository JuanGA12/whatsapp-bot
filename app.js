const qrcode = require('qrcode-terminal');
const { Client, Buttons } = require('whatsapp-web.js');
const { sendMessage } = require('./controllers/send');
const stepsInitial = require('./messages/initial.json');

// 51958838270@c.us
const cron = require('node-cron');
const client = new Client();
// console.log(stepsInitial);
const listenMessage = () =>
  client.on('message', async (msg) => {
    const { from, body, hasMedia } = msg;
    if (from == 'status@broadcast' || from == '120363025006115402@g.us') {
      return;
    }
    const date = new Date();
    const hour = date.getHours();
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
      // let button = new Buttons(
      //   'Button body',
      //   [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }],
      //   'title',
      //   'footer'
      // );
      const messages = stepsInitial[0].message;
      // for (let i = 0; i < messages.length; i++) {
      //   const response = await sendMessage(client, from, messages[i]);
      //   const { status, message } = response;
      //   console.log(message);
      // }
      console.log(messages);
      messages.map(async (e) => {
        const a = await client.sendMessage(from, e);
      });
      // client.sendMessage(from, messages[0]);
      // client.sendMessage(from, messages[1]);
      // client.sendMessage(from, messages[2]);
    }
  });

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('client ready');
  listenMessage();
  const job = cron
    .schedule('*/3 * * * * *', function () {
      console.log('---------------------');
      client.sendMessage('51991310917@c.us', stepsInitial[0].message[0]);
      client.sendMessage('51991310917@c.us', stepsInitial[0].message[1]);
      client.sendMessage('51991310917@c.us', stepsInitial[0].message[2]);
    })
    .start();
});

client.initialize();
