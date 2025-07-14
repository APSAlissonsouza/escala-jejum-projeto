function doPost(e) {
  const ss = SpreadsheetApp.openById("COLE_AQUI_ID_DA_PLANILHA");
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
  const ss = SpreadsheetApp.openById("COLE_AQUI_ID_DA_PLANILHA");
  const sheet = ss.getSheetByName("Escala");
  const data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
