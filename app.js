const qrcode = require('qrcode-terminal');
const { Client, Buttons } = require('whatsapp-web.js');
var sessionStorage = require('sessionstorage');
sessionStorage.setItem("level", 0);
sessionStorage.setItem("option", '');
const greetens = ['HOLA', 'HOLA, QUÉ TAL', 'HOLA QUE TAL', 'HOLA AMIGO'];
const options = ['A', 'B', 'C']

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

  if(hour < 13){
    client.sendMessage(message.from, 'No atendemos a esta hora');
  }
  else{
    switch(sessionStorage.getItem("level")){

      case 0: 
        if(greetens.includes(message.body.toLocaleUpperCase())){
          client.sendMessage(message.from, 
            `Hola, soy el tio Marco Agro de IBK 😀, puedo ayudarte en los siguientes temas

          A) Tema uno
          B) Tema dos
          C) Tema tres
        
          Elige una de las opciones...🤔`);
          sessionStorage.setItem("level", 1);
        }
        break;

      case 1:
        if(greetens.includes(message.body.toLocaleUpperCase())){
          client.sendMessage(message.from, 
            `Hola 😀, puedo ayudarte en los siguientes temas
        
          A) Tema uno
          B) Tema dos
          C) Tema tres
        
          Elige una de las opciones...🤔`);
          sessionStorage.setItem("level", 1);
        }
        if(options.includes(message.body.toLocaleUpperCase())){
          switch(message.body.toLocaleUpperCase()){
            case 'A': client.sendMessage(message.from, `Información de la opción A`);
                      client.sendMessage(message.from,'https://interbank.pe/');
                      break;
            case 'B': client.sendMessage(message.from, `Información de la opción B`);
                      client.sendMessage(message.from,'https://interbank.pe/');
                      break;
            case 'C': client.sendMessage(message.from, `Información de la opción C`);
                      client.sendMessage(message.from,'https://interbank.pe/');
                      break;
          }
          sessionStorage.setItem("level", 2);
        }
        break;
      
      case 2: 
        switch(sessionStorage('option')){
          case 'A': client.sendMessage(message.from, `Información de la opción A`);
                    client.sendMessage(message.from,'https://interbank.pe/');
                    break;
          case 'B': client.sendMessage(message.from, `Información de la opción B`);
                    client.sendMessage(message.from,'https://interbank.pe/');
                    break;
          case 'C': client.sendMessage(message.from, `Información de la opción C`);
                    client.sendMessage(message.from,'https://interbank.pe/');
                    break;
        }
        break;
    }
  }
});
client.initialize();
