// const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Chat } = require('whatsapp-web.js');
const { sendMessage, sendMedia, sendButtons } = require('./controllers/send');
const stepsInitial = require('./messages/initial.json');
const cron = require('node-cron');
const mysql = require('mysql');
const buttons = [
  { id: 'boton_si', body: 'SI' },
  { id: 'boton_no', body: 'NO' },
];
const emojis = ['😍', '😀', '😐', '🙁', '😠'];
const buttonText = '¿Te resultó útil esta información? Presiona *SI* o *NO*';
const client = new Client();
/**{
  authStrategy: new LocalAuth({
    clientId: 'client-one',
  }),
} */
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'bd_whatsapp_exp1',
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('WHATSAPP WEB => Ready');
  const sql = 'SELECT celular FROM usuarios';
  let numbers;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    numbers = result.map((ele) => {
      return ele.celular + '@c.us';
    });
  });
  await sleep(2000);
  const job1 = cron
    .schedule('0 49 11 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 1');
      numbers.map(async (number, idx) => {
        sendMessage(client, number, '-----Mensaje 1-----');
        await sendMedia(
          client,
          number,
          'chicho_agro_bienvenida.png',
          '¡Felicidades por activar tu *tarjeta digital* Interbank! 🥳'
        );
        await sleep(2000);
        await sendMedia(
          client,
          number,
          'chicho_agro_antesydespues.png',
          '¡La tarjeta digital te permite comprar, sacar dinero y pagar desde tu celular sin costo adicional. Ahora podrás usar tu dinero *sin ir a la Tienda a recoger una tarjeta física* 💳 y aprovechar tu tiempo en lo que tú quieras 😉.\n\nPodrás usar tu sueldo y hacer todas tus operaciones usando la *app Interbank* 📱'
        );
        await sleep(2000);
        for (let i = 0; i < stepsInitial[0].message.length; i++) {
          sendMessage(client, number, stepsInitial[0].message[i]);
          await sleep(2000);
        }
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase1' WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 1');
        });
        await sleep(2000);
        const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES (${Date.now()}, ${
          number.split('@')[0]
        },
          ${true},
          "¡Felicidades por activar tu tarjeta digital Interbank!\n\n¡La tarjeta digital te permite comprar, sacar dinero y pagar desde tu celular sin costo adicional. Ahora podrás usar tu dinero sin ir a la Tienda a recoger una tarjeta física  y aprovechar tu tiempo en lo que tú quieras. Podrás usar tu sueldo y hacer todas tus operaciones usando la app Interbank\n\nSoy Chicho, tu asesor de Interbank. Te estaré enviando información importante sobre cómo usar tu sueldo SIN tarjeta y todo lo que puedes hacer desde la app.\n\nSi tienes alguna pregunta, escríbeme por acá para ayudarte\n\n${buttonText}"
          )`;
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log('Mensaje guardado: ' + number);
        });
        await sleep(2000);
      });
    })
    .start();
  const job2 = cron
    .schedule('0 23 11 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 2');
      numbers.map(async (number, idx) => {
        sendMessage(client, number, '-----Mensaje 2-----');
        sendMessage(
          client,
          number,
          '¡Hola!👋 ¡*Hoy te pagarán tu 1er sueldo* en Hortifrut! Ahora que tienes tu cuenta sueldo y tarjeta digital, ¿ya sabes *cómo sacar tu dinero SIN tarjeta* 💵 en el agente Interbank o cajero GlobalNet más cercano? 🤔'
        );
        await sleep(2000);
        await sendMedia(
          client,
          number,
          'chicho_agro_retirosintarjeta.png',
          'Descubre cómo sacar dinero sin tarjeta en esta imagen o sigue estos pasos:\n1. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n2. Elige *Retiro sin tarjeta*\n3. Selecciona *Para mí*\n5. Selecciona la *cuenta de retiro* (de dónde sale el dinero), la *moneda* e ingresa el *monto*\n6. Ingresa la clave que te enviaremos, *confirma*, ¡y listo! 🤩'
        );
        await sleep(2000);
        for (let i = 0; i < stepsInitial[1].message.length; i++) {
          sendMessage(client, number, stepsInitial[1].message[i]);
          await sleep(2000);
        }
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase2' WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 2');
        });
        await sleep(2000);
        const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES (${Date.now()}, ${
          number.split('@')[0]
        },
          ${true},
          "¡Hola! ¡Hoy te pagarán tu 1er sueldo en Hortifrut! Ahora que tienes tu cuenta sueldo y tarjeta digital, ¿ya sabes cómo sacar tu dinero SIN tarjeta en el agente Interbank o cajero GlobalNet más cercano?\n\nDescubre cómo sacar dinero sin tarjeta en esta imagen o sigue estos pasos:\n1. Ingresa a tu app y selecciona Operaciones, ubicado en la parte inferior\n2. Elige Retiro sin tarjeta\n3. Selecciona Para mí\n5. Selecciona la cuenta de retiro (de dónde sale el dinero), la moneda e ingresa el monto\n6. Ingresa la clave que te enviaremos, confirma, ¡y listo!\n\nCon la clave de retiro y número de celular, podrás acercarte a un cajero GlobalNet y seleccionar Operaciones sin tarjeta, o a un agente Interbank a retirar el dinero.\n\n${buttonText}"
          )`;
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log('Mensaje guardado: ' + number);
        });
        await sleep(2000);
      });
    })
    .start();
  const job3 = cron
    .schedule('0 25 11 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 3');
      numbers.map(async (number, idx) => {
        sendMessage(client, number, '-----Mensaje 3-----');
        for (let i = 0; i < stepsInitial[2].message.length; i++) {
          sendMessage(client, number, stepsInitial[2].message[i]);
          await sleep(2000);
        }
        await sleep(2000);
        await sendMedia(client, number, 'chicho_agro_cuidamostutarjeta.png');
        await sleep(2000);
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase3' WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 3');
        });
        await sleep(2000);
        const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES (${Date.now()}, ${
          number.split('@')[0]
        },
          ${true},
          "¡Hola! Sigue estas recomendaciones para cuidar tu tarjeta digital Interbank. ¡Queremos que estés seguro usándola!\n\n${buttonText}"
          )`;
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log('Mensaje guardado: ' + number);
        });
        await sleep(2000);
      });
    })
    .start();
  const job4 = cron
    .schedule('0 30 11 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 4');
      numbers.map(async (number, idx) => {
        sendMessage(client, number, '-----Mensaje 4-----');
        for (let i = 0; i < stepsInitial[3].message.length; i++) {
          sendMessage(client, number, stepsInitial[3].message[i]);
          await sleep(2000);
        }
        await sendMedia(
          client,
          number,
          'chicho_agro_transferenciaplin.png',
          '¿Necesitas enviar dinero a otra persona? Descubre cómo plinear en esta imagen o sigue estos pasos:\n1. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n2. Selecciona *Pago a contacto*. Si es la primera vez que usas PLIN, enlaza tu cuenta sueldo\n3. Activa el permiso para ver tus contactos de celular\n4. Elige *a quién pagar* e ingresa el *monto*\n5. *Confirma* con la clave que te enviamos ¡y listo!\n\n☝ Recuerda que para hacer una transferencia de dinero PLIN tu contacto de destino también debe tener PLIN.'
        );
        await sleep(2000);
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase4' WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 4');
        });
        await sleep(2000);
        const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES (${Date.now()}, ${
          number.split('@')[0]
        },
          ${true},
          "¡Hola! ¿Necesitas pagarle al casero todo lo que le compraste en la semana? Con PLIN puedes enviar o recibir dinero al toque y GRATIS entre cuentas de Interbank, Scotiabank, BBVA, BanBif, Caja Arequipa y Caja Sullana usando solo el número de celular\n\n¿Necesitas enviar dinero a otra persona? Descubre cómo plinear en esta imagen o sigue estos pasos:\n1. Ingresa a tu app y selecciona Operaciones, ubicado en la parte inferior\n2. Selecciona Pago a contacto. Si es la primera vez que usas PLIN, enlaza tu cuenta sueldo\n3. Activa el permiso para ver tus contactos de celular\n4. Elige a quién pagar e ingresa el monto\n5. Confirma con la clave que te enviamos ¡y listo!\n\nRecuerda que para hacer una transferencia de dinero PLIN tu contacto de destino también debe tener PLIN.\n\n${buttonText}"
          )`;
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log('Mensaje guardado: ' + number);
        });
        await sleep(2000);
      });
    })
    .start();
  const job5 = cron
    .schedule('0 40 11 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 5');
      numbers.map(async (number, idx) => {
        sendMessage(client, number, '-----Mensaje 5-----');
        for (let i = 0; i < stepsInitial[4].message.length; i++) {
          sendMessage(client, number, stepsInitial[4].message[i]);
          await sleep(2000);
        }
        await sendMedia(
          client,
          number,
          'chicho_agro_qrplin.png',
          'Descubre cómo pagar con QR en esta imagen o sigue estos pasos:\n1. Pregúntale al bodeguero si tiene QR\n2. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n3. Selecciona *Pago con QR*\n4. Enciende la cámara de tu celular y enfoca el *código QR*\n5. Escribe el *monto* que quieres pagar'
        );
        await sleep(2000);
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase5' WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 5');
        });
        await sleep(2000);
        const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES (${Date.now()}, ${
          number.split('@')[0]
        },
          ${true},
          "¡Hola! ¿Te provocó una gaseosita y te quedaste sin efectivo? Tranquilo, puedes pagar con tu celular en mercados o bodegas que tengan código QR de PLIN o código QR de Izipay\n\nDescubre cómo pagar con QR en esta imagen o sigue estos pasos:\n1. Pregúntale al bodeguero si tiene QR\n2. Ingresa a tu app y selecciona Operaciones, ubicado en la parte inferior\n3. Selecciona Pago con QR\n4. Enciende la cámara de tu celular y enfoca el código QR\n5. Escribe el monto que quieres pagar\n\n${buttonText}"
          )`;
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log('Mensaje guardado: ' + number);
        });
        await sleep(2000);
      });
    })
    .start();
  const job6 = cron
    .schedule('0 45 11 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 6');
      numbers.map(async (number, idx) => {
        sendMessage(client, number, '-----Mensaje 6-----');
        for (let i = 0; i < stepsInitial[5].message.length; i++) {
          sendMessage(client, number, stepsInitial[5].message[i]);
          await sleep(2000);
        }
        await sendMedia(
          client,
          number,
          'chicho_agro_pagoservicios.png',
          'Descubre cómo pagar recibos y recargar el saldo de tu celular en esta imagen o sigue estos pasos:\n1. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n2. Elige la opción *Pagos y recargas* y luego *Recarga de celular* o *Pago de servicios* según lo que quieras realizar\n3. Completa la información, ¡y listo!'
        );
        await sleep(2000);
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase6' WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 6');
        });
        await sleep(2000);
        const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES (${Date.now()}, ${
          number.split('@')[0]
        },
          ${true},
          "¡Hola! ¡Evita las colas para pagar tus recibos y ahorra tiempo! Recarga tu celular o paga tu luz, agua, teléfono (¡y mucho más!) desde la app Interbank\n\nDescubre cómo pagar recibos y recargar el saldo de tu celular en esta imagen o sigue estos pasos:\n1. Ingresa a tu app y selecciona Operaciones, ubicado en la parte inferior\n2. Elige la opción Pagos y recargas y luego Recarga de celular o Pago de servicios según lo que quieras realizar\n3. Completa la información, ¡y listo!\n\n${buttonText}"
          )`;
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log('Mensaje guardado: ' + number);
        });
        await sleep(2000);
      });
    })
    .start();
  const job7 = cron
    .schedule('30 47 11 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 7');
      numbers.map(async (number, idx) => {
        sendMessage(client, number, '-----Mensaje 7-----');
        for (let i = 0; i < stepsInitial[6].message.length; i++) {
          sendMessage(client, number, stepsInitial[6].message[i]);
          await sleep(2000);
        }
        await sendMedia(
          client,
          number,
          'chicho_agro_transferenciaapp.png',
          'Descubre cómo enviar dinero en esta imagen o sigue estos pasos:\n1. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n2. Elige *Transferencias* y luego *A otra cuenta Interbank* o *A otro banco* según el tipo de transferencia que quieras realizar\n3.Selecciona la *cuenta de cargo* (de dónde sale el dinero) e ingresa el número  o CCI de la *cuenta de destino* (a dónde va el dinero) \n4.Elige la *moneda* y el *monto*\n5.Ingresa la clave que te enviaremos y *confirma*'
        );
        await sendMedia(client, number, 'chicho_agro_transferenciaapp.png');
        await sleep(2000);
        sendButtons(client, number, buttonText, buttons);
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase7' WHERE celular = '${
          number.split('@')[0]
        }'`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 7');
        });
        await sleep(2000);
        const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES (${Date.now()}, ${
          number.split('@')[0]
        },
          ${true},
          "¡Hola! ¿Tienes que enviar dinero a un familiar? Puedes hacerlo desde la app Interbank GRATIS y rápido\n\nDescubre cómo enviar dinero en esta imagen o sigue estos pasos:\n1. Ingresa a tu app y selecciona Operaciones, ubicado en la parte inferior\n2. Elige Transferencias y luego A otra cuenta Interbank o A otro banco según el tipo de transferencia que quieras realizar\n3.Selecciona la cuenta de cargo (de dónde sale el dinero) e ingresa el número o CCI de la cuenta de destino (a dónde va el dinero) \n4.Elige la *moneda* y el monto\n5.Ingresa la clave que te enviaremos y confirma\n\n${buttonText}"
          )`;
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log('Mensaje guardado: ' + number);
        });
        await sleep(2000);
      });
    })
    .start();
  const job8 = cron
    .schedule('0 50 11 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 8');
      numbers.map(async (number, idx) => {
        sendMessage(client, number, '-----Mensaje 8-----');
        sendMessage(
          client,
          number,
          '¡Hola! 👋 ¿Sabes dónde se encuentra el agente, cajero o Tienda Interbank más cercano a ti? 💚 Revísalo aquí: https://interbank.pe/puntos-de-atencion'
        );
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase8' WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 8');
        });
        await sleep(2000);
        const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES (${Date.now()}, ${
          number.split('@')[0]
        },
          ${true},
          "¡Hola! ¿Sabes dónde se encuentra el agente, cajero o Tienda Interbank más cercano a ti? Revísalo aquí: https://interbank.pe/puntos-de-atencion\n\n${buttonText}"
          )`;
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log('Mensaje guardado: ' + number);
        });
        await sleep(2000);
      });
    })
    .start();
  const job9 = cron
    .schedule('0 55 11 * * *', async () => {
      console.log('--------------------------');
      console.log('Job 9');
      numbers.map(async (number, idx) => {
        sendMessage(client, number, '-----Mensaje 9-----');
        await sendMedia(
          client,
          number,
          'chicho_agro_despedida.png',
          '¡Felicitaciones! llegaste al final de nuestra travesía 💚 Ahora eres experto en usar tu nueva Tarjeta Digital 💳 y algunos conceptos del mundo bancario 😎. Fue sencillo, ¿verdad? 😊'
        );
        await sleep(2000);
        for (let i = 0; i < stepsInitial[7].message.length; i++) {
          sendMessage(client, number, stepsInitial[7].message[i]);
          await sleep(2000);
        }
        const sql = `UPDATE usuarios SET fase = 'Fase9' WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 8');
        });
        await sleep(2000);
        const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES (${Date.now()}, ${
          number.split('@')[0]
        },
          ${true},
          "¡Felicitaciones! llegaste al final de nuestra travesía Ahora eres experto en usar tu nueva Tarjeta Digital y algunos conceptos del mundo bancario. Fue sencillo, ¿verdad?\n\nRecuerda que con tu Tarjeta Digital puedes:\n- Retirar dinero sin tarjeta\n- Enviar dinero o pagar a contactos con PLIN\n- Pagar en bodegas y tiendas con código QR\n- Pagar servicios de luz, agua, teléfono y recargar el saldo de tu celular\n- Enviar dinero a otras de cuentas de Interbank y de otros bancos\n- ¡Y mucho más! Descúbrelo aquí: https://interbank.pe/tarjetas/tarjeta-digital/tarjeta-digital \n\nAntes de despedirnos, te pedimos califiques la experiencia que tuviste con nosotros. Solo escribe el número:\n\n5. Excelente\n4. Muy bueno\n3. Bueno\n2. Malo\n1. Muy malo\n\n${buttonText}"
          )`;
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log('Mensaje guardado: ' + number);
        });
        await sleep(2000);
      });
    })
    .start();
});

client.on('message', async (msg) => {
  const { from, body, selectedButtonId } = msg;
  if (from == 'status@broadcast') {
    return;
  }
  const sql = `SELECT fase FROM usuarios where celular = ${from.split('@')[0]}`;
  let fase;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0]) {
      fase = result.map((ele) => ele.fase)[0];
    }
  });
  await sleep(2000);
  const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES ("${Date.now()}", "${
    from.split('@')[0]
  }", ${false}, "${body.replaceAll(/\p{Emoji}/gu, '[-emoji-]')}")`;
  con.query(sql2, function (err, result) {
    console.log(err ? err : 'Mensaje guardado: ' + from.split('@')[0]);
  });
  await sleep(2000);
  if (body == 'SI' && selectedButtonId == 'boton_si') {
    sendMessage(
      client,
      from,
      '¡Qué bueno que te haya servido la información! 🤩 Si tienes alguna pregunta, escríbenos por este medio.'
    );
    await sleep(2000);
    const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES ("${Date.now()}", "${
      from.split('@')[0]
    }", ${true}, "¡Qué bueno que te haya servido la información! Si tienes alguna pregunta, escríbenos por este medio.")`;
    con.query(sql2, function (err, result) {
      console.log(err ? err : 'Mensaje guardado: ' + from.split('@')[0]);
    });
    await sleep(2000);
  }

  if (body == 'NO' && selectedButtonId == 'boton_no') {
    sendMessage(
      client,
      from,
      'Lamentamos que la información no haya sito de tu utilidad. 🙁 Si tienes alguna pregunta, escríbenos por este medio.'
    );
    await sleep(2000);
    const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES ("${Date.now()}", "${
      from.split('@')[0]
    }", ${true}, "Lamentamos que la información no haya sito de tu utilidad. Si tienes alguna pregunta, escríbenos por este medio.")`;
    con.query(sql2, function (err, result) {
      console.log(err ? err : 'Mensaje guardado: ' + from.split('@')[0]);
    });
    await sleep(2000);
  }
  if (fase == 'Fase9' && ((body >= 1 && body <= 5) || emojis.includes(body))) {
    sendMessage(
      client,
      from,
      '*¡Excelente!* 🙌  te agradeceríamos que nos dejes un comentario para mejorar poco a poco nuestro contenido.'
    );
    const sql = `UPDATE usuarios SET fase = 'Terminado' WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    //Se podria cambiar a fase6 para que no envie mensaje si hay un 1---5 o emoji
    await sleep(1000);
    const sql2 = `INSERT INTO mensajes (fecha, celular, envio, contenido) VALUES ("${Date.now()}", "${
      from.split('@')[0]
    }", ${true}, "¡Excelente! te agradeceríamos que nos dejes un comentario para mejorar poco a poco nuestro contenido.")`;
    con.query(sql2, function (err, result) {
      console.log(err ? err : 'Mensaje guardado: ' + from.split('@')[0]);
    });
    await sleep(2000);
  }
});
client.on('authenticated', (session) => {
  console.log('WHATSAPP WEB => Authenticated');
  con.connect(function (err) {
    if (err) {
      client.logout();
      throw err;
    }
    console.log('Database Connected!');
  });
});
client.on('disconnected', (reason) => {
  console.log('WHATSAPP WEB => Disconnected');
  client.initialize();
});
client.initialize();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
