const qrcode = require('qrcode-terminal');
const { Client, Buttons } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
  console.log('client ready');
});
client.on('message', (message) => {
  const d = new Date();
  const hour = d.getHours();
  if (hour < 13) {
    client.sendMessage(message.from, 'No atendemos a esta hora');
  }
  if (message.body == 'hola') {
    // let button = new Buttons(
    //   'Recuerda todo este contenido es gratis y estaria genial que me siguas!',
    //   [{ body: 'Cursos' }, { body: 'Youtube' }, { body: 'Telegram' }],
    //   '¿Que te interesa ver?',
    //   'Gracias'
    // );
    // console.log(message, button);
    // client.sendMessage(message.from, button);
    client.sendMessage(message.from, 'escoge entre 1 o 2');
  }
  if (message.body == '1') {
    client.sendMessage(message.from, 'uno uno');
  }
  if (message.body == '2') {
    client.sendMessage(message.from, 'dos dos');
  }
});
client.initialize();
