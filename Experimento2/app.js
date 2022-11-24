const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { sendMessage, sendMedia, sendButtons } = require('./controllers/send');
const cron = require('node-cron');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const { generateImage } = require('./controllers/handle');

const buttons = [
  { id: 'boton_si', body: 'SI' },
  { id: 'boton_no', body: 'NO' },
];
const buttons2 = [
  { id: 'menu_si', body: 'SI' },
  { id: 'menu_no', body: 'NO' },
];
const buttonText = '¿Te resultó útil esta información? Presiona *SI* o *NO*';
const buttonText2 = '¿Volver al menú principal? Presiona *SI* o *NO*';
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const client = new Client();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/', require('./routes/web'));
// const server = require('http').Server(app);

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'bd_whatsapp_exp2',
});

// client.on('qr', (qr) =>
//   generateImage(qr, () => {
//     qrcode.generate(qr, { small: true });
//     console.log(`Ver QR http://localhost:8080/qr`);
//   })
// );
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
    .schedule('0 18 12 * * *', async () => {
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
          '¡La tarjeta digital te permite comprar, sacar dinero y pagar desde tu celular sin costo adicional. Ahora podrás utilizar tu dinero *sin ir a la Tienda a recoger una tarjeta física* 💳 y aprovechar tu tiempo en lo que tú quieras 😉.\n\nPodrás usar tu sueldo y hacer todas tus operaciones utilizando la *app Interbank* 📱'
        );
        await sleep(2000);
        sendMessage(
          client,
          number,
          'Soy *Chicho* 🐷, tu asesor de Interbank. Te estaré enviando información importante sobre *cómo usar tu sueldo SIN tarjeta* y todo lo que puedes hacer desde la app 💚\n\nSi tienes alguna pregunta, escríbeme por acá para ayudarte'
        );
        await sleep(2000);
        sendMessage(
          client,
          number,
          '*Comienza a usar tu dinero SIN tarjeta*, descubre cómo escribiendo la letra de la opción que quieras conocer:\n\nA) ¿Cómo retiro dinero con mi tarjeta digital?\nB) ¿Cómo pago mis servicios?\nC) ¿Cómo pago con código QR desde PLIN?\nD) ¿Cómo envío dinero por PLIN?\nE) ¿Cómo transfiero dinero desde mi app?\nF) ¿Cuál es el punto de atención de Interbank más cercano?\nG) Quiero escribir una consulta'
        );
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase1', menu = ${true} WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 1');
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
        await sendMedia(
          client,
          number,
          'chicho_agro_hoypagan.png',
          '¡Hola! 👋 ¡*Hoy recibirás tu 1er sueldo* en Hortifrut! Ahora que tienes tu cuenta sueldo y tarjeta digital, ¿ya sabes *cómo sacar tu dinero SIN tarjeta* 💵 desde el agente Interbank o cajero GlobalNet más cercano? 🤔'
        );
        await sleep(2000);
        sendMessage(
          client,
          number,
          'Elige la *opción A* y descubre cómo hacerlo:\n\nA) ¿Cómo retiro dinero con mi tarjeta digital?\nB) ¿Cómo pago mis servicios? (recarga, luz, agua, etc)\nC) ¿Cómo pago con código QR desde PLIN?\nD) ¿Cómo envío dinero por PLIN?\nE) ¿Cómo transfiero dinero desde mi app?\nF) ¿Cuál es el punto de atención de Interbank más cercano?\nG) Quiero escribir una consulta'
        );

        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase1', menu = ${true} WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 2');
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
        sendMessage(
          client,
          number,
          '¡Hola! 👋 Sigue estas recomendaciones para cuidar tu tarjeta digital 💳 Interbank. ¡Queremos que estés seguro usándola! 💚'
        );
        await sleep(2000);
        await sendMedia(client, number, 'chicho_agro_cuidamostutarjeta.png');
        await sleep(2000);
        sendMessage(
          client,
          number,
          '*Comienza a usar tu dinero SIN tarjeta*, descubre cómo escribiendo la letra de la opción que quieras conocer:\n\nA) ¿Cómo retiro dinero con mi tarjeta digital?\nB) ¿Cómo pago mis servicios? (recarga, luz, agua, etc)\nC) ¿Cómo pago con código QR desde PLIN?\nD) ¿Cómo envío dinero por PLIN?\nE) ¿Cómo transfiero dinero desde mi app?\nF) ¿Cuál es el punto de atención de Interbank más cercano?\nG) Quiero escribir una consulta'
        );
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase1', menu = ${true} WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 3');
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
        sendMessage(
          client,
          number,
          '¡Hola! 👋 ¿Necesitas pagarle al casero todo lo que le compraste en la semana? Con *PLIN* puedes *enviar o recibir dinero al toque y GRATIS* 😎 entre cuentas de Interbank, Scotiabank, BBVA, BanBif, Caja Arequipa y Caja Sullana usando solo el número de celular 🙌'
        );
        await sleep(2000);
        sendMessage(
          client,
          number,
          'Elige la *opción D* y descubre cómo hacerlo:\n\nA) ¿Cómo retiro dinero con mi tarjeta digital?\nB) ¿Cómo pago mis servicios? (recarga, luz, agua, etc)\nC) ¿Cómo pago con código QR desde PLIN?\nD) ¿Cómo transfiero por PLIN?\nE) ¿Cómo transfiero desde mi app?\nF) ¿Cuál es el punto de atención más cercano?\nG) Quiero escribir una consulta'
        );
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase4', menu = ${true} WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 4');
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
        sendMessage(
          client,
          number,
          '¡Hola! 👋 *¿Te provocó una gaseosita y te quedaste sin efectivo?* Tranquilo, puedes pagar con tu celular 📱 en mercados o bodegas que tengan código QR de PLIN o código QR de Izipay 😯'
        );
        await sleep(2000);
        sendMessage(
          client,
          number,
          'Elige la *opción C* y descubre cómo hacerlo:\n\nA) ¿Cómo retiro dinero con mi tarjeta digital?\nB) ¿Cómo pago mis servicios? (recarga, luz, agua, etc)\nC) ¿Cómo pago con código QR desde PLIN?\nD) ¿Cómo transfiero por PLIN?\nE) ¿Cómo transfiero desde mi app?\nF) ¿Cuál es el punto de atención más cercano?\nG) Quiero escribir una consulta'
        );
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase5', menu = ${true} WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 5');
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
        sendMessage(
          client,
          number,
          '¡Hola! 👋 ¡*Evita las colas para pagar tus recibos* y ahorra tiempo! Recarga tu celular o paga tu luz, agua, teléfono (¡y mucho más!) desde la app Interbank 📱'
        );
        await sleep(2000);
        sendMessage(
          client,
          number,
          'Elige la *opción B* y descubre cómo hacerlo:\n\nA) ¿Cómo retiro dinero con mi tarjeta digital?\nB) ¿Cómo pago mis servicios? (recarga, luz, agua, etc)\nC) ¿Cómo pago con código QR desde PLIN?\nD) ¿Cómo transfiero por PLIN?\nE) ¿Cómo transfiero desde mi app?\nF) ¿Cuál es el punto de atención más cercano?\nG) Quiero escribir una consulta'
        );
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase6', menu = ${true} WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 6');
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
        sendMessage(
          client,
          number,
          '¡Hola! 👋 *¿Tienes que enviar dinero a un familiar?* Puedes hacerlo desde la app Interbank 📱 GRATIS y rápido ⏱'
        );
        await sleep(2000);
        sendMessage(
          client,
          number,
          'Elige la *opción E* y descubre cómo hacerlo:\n\nA) ¿Cómo retiro dinero con mi tarjeta digital?\nB) ¿Cómo pago mis servicios? (recarga, luz, agua, etc)\nC) ¿Cómo pago con código QR desde PLIN?\nD) ¿Cómo transfiero por PLIN?\nE) ¿Cómo transfiero desde mi app?\nF) ¿Cuál es el punto de atención más cercano?\nG) Quiero escribir una consulta'
        );
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase7', menu = ${true} WHERE celular = '${
          number.split('@')[0]
        }'`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 7');
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
        sendMedia(
          client,
          number,
          'chicho_agro_despedida.png',
          '¡Felicitaciones! llegaste al final de nuestra travesía 💚. Ahora eres experto en usar tu nueva Tarjeta Digital 💳 y algunos conceptos del mundo bancario 😎. Fue sencillo, ¿verdad? 😊'
        );
        await sleep(2000);
        sendMessage(
          client,
          number,
          'Recuerda que con tu Tarjeta Digital 💳 puedes:\n- Retirar dinero sin tarjeta\n- Enviar dinero o pagar a contactos con PLIN\n- Pagar en bodegas y tiendas con código QR\n- Pagar servicios de luz, agua, teléfono y recargar el saldo de tu celular\n- Enviar dinero a otras de cuentas de Interbank y de otros bancos\n- ¡Y mucho más! 🤩 Descúbrelo aquí: https://interbank.pe/tarjetas/tarjeta-digital/tarjeta-digital'
        );
        await sleep(2000);
        sendMessage(
          client,
          number,
          'Antes de despedirnos, te pedimos califiques la experiencia que tuviste con nosotros. Solo escribe el número:\n\n5. Excelente \n4. Muy bueno \n3. Bueno \n2. Malo \n1. Muy malo 😠'
        );
        await sleep(2000);
        const sql = `UPDATE usuarios SET fase = 'Fase8', menu = ${true} WHERE celular = ${
          number.split('@')[0]
        }`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Usuario' + number + ' actualizado a fase 8');
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
  const sql = `SELECT fase, menu FROM usuarios where celular = ${
    from.split('@')[0]
  }`;
  let fase_;
  let menu_;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0]) {
      // console.log(result);
      const { fase, menu } = result[0];
      fase_ = fase;
      menu_ = menu;
    }
  });
  await sleep(2000);

  //Selección opción A
  if (
    (body == 'A' || body == 'a' || body == 'opción A' || body == 'opcion A') &&
    menu_ == true
  ) {
    const sql = `UPDATE usuarios SET menu = ${false} WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    await sleep(2000);
    await sendMedia(
      client,
      from,
      'A.png',
      'Descubre cómo sacar dinero sin tarjeta en esta imagen o sigue estos pasos:\n1. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n2. Elige *Retiro sin tarjeta*\n3. Selecciona *Para mí*\n4. Selecciona la *cuenta de retiro* (de dónde sale el dinero), la *moneda* e ingresa el *monto*\n5. Ingresa la clave que te enviaremos, *confirma*, ¡y listo! 🤩'
    );
    await sleep(2000);
    sendMessage(
      client,
      from,
      '☝ Con la clave de retiro y número de celular, podrás acercarte a un *cajero GlobalNet* y seleccionar Operaciones sin tarjeta, o a un *agente Interbank* a retirar el dinero.'
    );
    await sleep(2000);
    //opcion de menu
    sendButtons(client, from, buttonText2, buttons2);
    await sleep(2000);
    //
  }
  //Selección opción B
  if (
    (body == 'B' || body == 'b' || body == 'opción B' || body == 'opcion B') &&
    menu_ == true
  ) {
    const sql = `UPDATE usuarios SET menu = ${false} WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    await sleep(2000);
    await sendMedia(
      client,
      from,
      'B.png',
      'Descubre cómo pagar recibos y recargar el saldo de tu celular en esta imagen o sigue estos pasos:\n1. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n2. Elige la opción *Pagos y recargas* y luego *Recarga de celular* o *Pago de servicios* según lo que quieras realizar\n3. Completa la información, ¡y listo!'
    );
    await sleep(2000);
    sendButtons(client, from, buttonText2, buttons2);
    await sleep(2000);
  }
  //Selección opción C
  if (
    (body == 'C' || body == 'c' || body == 'opción C' || body == 'opcion C') &&
    menu_ == true
  ) {
    const sql = `UPDATE usuarios SET menu = ${false} WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    await sleep(2000);
    await sendMedia(
      client,
      from,
      'C.png',
      'Descubre cómo pagar con QR en esta imagen o sigue estos pasos:\n1. Pregúntale al bodeguero si tiene QR\n2. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n3. Selecciona *Pago con QR*\n4. Enciende la cámara de tu celular y enfoca el *código QR*\n5. Escribe el *monto* que quieres pagar'
    );
    await sleep(2000);
    sendButtons(client, from, buttonText2, buttons2);
    await sleep(2000);
  }
  //Selección opción D
  if (
    (body == 'D' || body == 'd' || body == 'opción D' || body == 'opcion D') &&
    menu_ == true
  ) {
    const sql = `UPDATE usuarios SET menu = ${false} WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    await sleep(2000);
    await sendMedia(
      client,
      from,
      'D.png',
      '¿Necesitas enviar dinero a otra persona? Descubre cómo plinear en esta imagen o sigue estos pasos:\n1. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n2. Selecciona *Pago a contacto*. Si es la primera vez que usas PLIN, enlaza tu cuenta sueldo\n3. Activa el permiso para ver tus contactos de celular\n4. Elige *a quién pagar* e ingresa el *monto*\n5. *Confirma* con la clave que te enviamos ¡y listo!\n\n☝ Recuerda que para hacer una transferencia de dinero PLIN tu contacto de destino también debe tener PLIN.'
    );
    await sleep(2000);
    sendButtons(client, from, buttonText2, buttons2);
    await sleep(2000);
  }
  //Selección opción E
  if (
    (body == 'E' || body == 'e' || body == 'opción E' || body == 'opcion E') &&
    menu_ == true
  ) {
    const sql = `UPDATE usuarios SET menu = ${false} WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    await sleep(2000);
    await sendMedia(
      client,
      from,
      'E.png',
      'Descubre cómo enviar dinero en esta imagen o sigue estos pasos:\n1. Ingresa a tu app 📱 y selecciona *Operaciones*, ubicado en la parte inferior\n2. Elige *Transferencias* y luego *A otra cuenta Interbank* o *A otro banco* según el tipo de transferencia que quieras realizar\n3. Selecciona la *cuenta de cargo* (de dónde sale el dinero) e ingresa el número  o CCI de la *cuenta de destino* (a dónde va el dinero)\n4. Elige la *moneda* y el *monto*\n5. Ingresa la clave que te enviaremos y *confirma* '
    );
    await sleep(2000);
    sendButtons(client, from, buttonText2, buttons2);
    await sleep(2000);
  }
  //Selección opción F
  if (
    (body == 'F' || body == 'f' || body == 'opción F' || body == 'opcion F') &&
    menu_ == true
  ) {
    const sql = `UPDATE usuarios SET menu = ${false} WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    await sleep(2000);
    sendMessage(
      client,
      from,
      'Conoce el punto de atención Interbank más cercano aquí: https://interbank.pe/puntos-de-atencion'
    );
    await sleep(2000);
    sendButtons(client, from, buttonText2, buttons2);
    await sleep(2000);
  }
  //Selección opción G
  if (
    (body == 'G' || body == 'g' || body == 'opción G' || body == 'opcion G') &&
    menu_ == true
  ) {
    const sql = `UPDATE usuarios SET menu = ${false} WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    await sleep(2000);
    sendMessage(client, from, 'Por favor escribe tu consulta');
    await sleep(2000);
  }

  //Botón SI
  if (body == 'SI' && selectedButtonId == 'boton_si') {
    sendMessage(
      client,
      from,
      '¡Qué bueno que te haya servido la información! 🤩 Si tienes alguna pregunta, escríbenos por este medio.'
    );
    await sleep(2000);
  }
  //Botón NO
  if (body == 'NO' && selectedButtonId == 'boton_no') {
    sendMessage(
      client,
      from,
      'Lamentamos que la información no haya sito de tu utilidad. 🙁 Si tienes alguna pregunta, escríbenos por este medio.'
    );
    await sleep(2000);
  }
  //Boton menu si
  if (body == 'SI' && selectedButtonId == 'menu_si') {
    const sql = `UPDATE usuarios SET menu = ${true} WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    await sleep(2000);
    sendMessage(
      client,
      from,
      '*Comienza a usar tu dinero SIN tarjeta*, descubre cómo escribiendo la letra de la opción que quieras conocer:\n\nA) ¿Cómo retiro dinero con mi tarjeta digital?\nB) ¿Cómo pago mis servicios?\nC) ¿Cómo pago con código QR desde PLIN?\nD) ¿Cómo envío dinero por PLIN?\nE) ¿Cómo transfiero dinero desde mi app?\nF) ¿Cuál es el punto de atención de Interbank más cercano?\nG) Quiero escribir una consulta'
    );
    await sleep(2000);
  }
  //Boton menu no
  if (body == 'NO' && selectedButtonId == 'menu_no') {
    const sql = `UPDATE usuarios SET menu = ${true} WHERE celular = ${
      from.split('@')[0]
    }`;
    con.query(sql, function (err, result) {
      console.error(err ? err : 'SQL DONE');
    });
    await sleep(2000);
    sendButtons(client, from, buttonText, buttons);
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
});

client.initialize();
// server.listen(8080, () => {
//   console.log('⚡️[server]: Server is running at https://localhost:8080');
// });
