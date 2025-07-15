function doPost(e) {
  const ss = SpreadsheetApp.openById("1Gna-KUQO_mgVy4sm87yWu8JWL_sy_E0PFlQK_kZrc_Q");
  const sheet = ss.getSheetByName("Escala") || ss.insertSheet("Escala");
  const tipo = e.parameter.tipo;

  if (tipo === "cadastro") {
    // Cadastro de membro: salva nome, email, senha, telefone e igreja
    sheet.appendRow([
      "Cadastro",
      new Date(),
      e.parameter.nome,
      e.parameter.email,
      e.parameter.senha,
      e.parameter.telefone,
      e.parameter.igreja,
      "", ""
    ]);
    return ContentService.createTextOutput("Cadastro OK");
  }

  if (tipo === "Escala") {
    // Agendamento de jejum: salva email, data e turno
    sheet.appendRow([
      "Escala",
      new Date(),
      "", // nome
      e.parameter.email,
      "", // senha
      "", // telefone
      "", // igreja
      e.parameter.data,
      e.parameter.turno
    ]);
    return ContentService.createTextOutput("Escala OK");
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.openById("1Gna-KUQO_mgVy4sm87yWu8JWL_sy_E0PFlQK_kZrc_Q");
  const sheet = ss.getSheetByName("Escala");
  const data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
