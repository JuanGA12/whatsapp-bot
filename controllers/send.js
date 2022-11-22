const fs = require('fs');
const { MessageMedia, Buttons } = require('whatsapp-web.js');
const DIR_MEDIA = `${__dirname}/../media`;
const sendMessage = (client, number = null, text = null) => {
  try {
    client.sendMessage(number, text);
    console.log('Mensaje enviado a ' + number);
    return true;
  } catch (error) {
    console.log('No se envio mensaje a ' + number + ' error: ' + error);
    return false;
  }
};

const sendMedia = async (
  client,
  number = null,
  fileName = null,
  caption = null
) => {
  if (!client) return console.error('El objeto cliente no está definido.');
  try {
    const file = `${DIR_MEDIA}/${fileName}`;
    if (fs.existsSync(file)) {
      const media = MessageMedia.fromFilePath(file);
      await client.sendMessage(number, media, {
        sendAudioAsVoice: true,
        caption: caption ? caption : '',
      });
      console.log('Imagen enviada a ' + number);
      return true;
    }
    console.log('No se encontró el archivo');
    return false;
  } catch (e) {
    console.log('No se envio imgaen a ' + number + ' error: ' + error);
    return false;
  }
};
const sendButtons = (
  client,
  number,
  message = null,
  buttons,
  title = null,
  footer = null
) => {
  try {
    let button = new Buttons(message, buttons, title, footer);
    client.sendMessage(number, button);
    console.log('Botones enviados a ' + number);
    return true;
  } catch (error) {
    console.log('No se envio botones a ' + number + ' error: ' + error);
    return false;
  }
};
module.exports = { sendMessage, sendMedia, sendButtons };
