function doPost(e) {
  const ss = SpreadsheetApp.openById("https://script.google.com/macros/s/AKfycbzyGBrEvsIquajAtertiyS5VuXO5-KhRKpgDfT-BOwSiAkY5vBK5MNhIx4Q7FBhe326/exec");
  const sheet = ss.getSheetByName("Escala") || ss.insertSheet("Escala");
  const tipo = e.parameter.tipo;

  if (tipo === "cadastro") {
    sheet.appendRow(["Cadastro", new Date(), e.parameter.nome, e.parameter.email, e.parameter.telefone, e.parameter.igreja]);
    return ContentService.createTextOutput("Cadastro OK");
  } else if (tipo === "escala") {
    sheet.appendRow(["Escala", new Date(), e.parameter.email, e.parameter.data, e.parameter.turno]);
    return ContentService.createTextOutput("Escala OK");
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.openById("https://script.google.com/macros/s/AKfycbzyGBrEvsIquajAtertiyS5VuXO5-KhRKpgDfT-BOwSiAkY5vBK5MNhIx4Q7FBhe326/exec");
  const sheet = ss.getSheetByName("Escala");
  const data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
