const qrcode = require('qrcode-terminal');
const { Client, Buttons } = require('whatsapp-web.js');
const { sendMessage } = require('./controllers/send');
const stepsInitial = require('./messages/initial.json');
// var sessionStorage = require('sessionstorage');
// sessionStorage.setItem("level", 0);
// sessionStorage.setItem("option", '');
// const greetens = ['HOLA', 'HOLA, QUÉ TAL', 'HOLA QUE TAL', 'HOLA AMIGO'];
// const options = ['A', 'B', 'C']
//  51958838270@c.us
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
    if (hour < 13) {
      const response = await sendMessage(
        client,
        from,
        'No atendemos a esta hora'
      );
      const { status, message } = response;
      console.log(message);
    }
    if (body == 'a') {
      const response = await sendMessage(client, from, stepsInitial.message);
      const { status, message } = response;
      console.log(message);
    }
    /*
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
  */
  });

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('client ready');
  listenMessage();
});

client.initialize();
