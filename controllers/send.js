const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
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

const sendMedia = (client, number = null, fileName = null) => {
  if (!client) return console.error('El objeto cliente no está definido.');
  try {
    const file = `${DIR_MEDIA}/${fileName}`;
    if (fs.existsSync(file)) {
      const media = MessageMedia.fromFilePath(file);
      client.sendMessage(number, media, { sendAudioAsVoice: true });
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
module.exports = { sendMessage, sendMedia };
