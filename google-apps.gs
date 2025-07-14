function doPost(e) {
  const ss = SpreadsheetApp.openById("https://script.google.com/macros/s/AKfycbzlrZ7NpCZmULnpcjPf0PpLoOjkaZgoYoZCpwMd9ZjBD8-_HnycJc9i-jVRVHrJETp7/exec");
  const sheet = ss.getSheetByName("Escala") || ss.insertSheet("Escala");
  const tipo = e.parameter.tipo;

  if (tipo === "cadastro") {
    sheet.appendRow(["Cadastro", new Date(), e.parameter.nome, e.parameter.email, e.parameter.telefone, e.parameter.igreja]);
    return ContentService.createTextOutput("Cadastro OK");
  } else if (tipo === "escala") {
    sheet.appendRow(["Escala", new Date(), e.parameter.email, e.parameter.dias]);
    return ContentService.createTextOutput("Escala OK");
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.openById("https://script.google.com/macros/s/AKfycbzlrZ7NpCZmULnpcjPf0PpLoOjkaZgoYoZCpwMd9ZjBD8-_HnycJc9i-jVRVHrJETp7/exec");
  const sheet = ss.getSheetByName("Escala");
  const data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
