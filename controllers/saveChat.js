const xl = require('excel4node');
var wb = new xl.Workbook();
wb.write('ExcelFile.xlsx');
const saveChat = async (chat) => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('persona1');
  const style = wb.createStyle({
    font: {
      color: '#040404',
      size: 12,
    },
  });
  const greenS = wb.createStyle({
    font: {
      color: '#388813',
      size: 12,
    },
  });
  ws.cell(1, 1).string('Timestamp').style(greenS);
  ws.cell(1, 2).string('De').style(greenS);
  ws.cell(1, 3).string('Mensaje').style(greenS);

  chat.map((message, idx) => {
    const { timestamp, from, body } = message;
    ws.cell(idx + 2, 1)
      .string(timestamp.toString())
      .style(style);
    ws.cell(idx + 2, 2)
      .string(from)
      .style(style);
    ws.cell(idx + 2, 3)
      .string(body)
      .style(style);
  });
  wb.write('Chats.xlsx');
};
module.exports = { saveChat };
