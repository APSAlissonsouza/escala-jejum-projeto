function cadastrar() {
  const params = new URLSearchParams({
    tipo: "cadastro",
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
    telefone: document.getElementById("telefone").value,
    igreja: document.getElementById("igreja").value,
  });

  fetch(scriptURL, { method: 'POST', body: params })
    .then(res => res.text())
    .then(msg => alert(msg));
}

function escalar() {
  const params = new URLSearchParams({
    tipo: "escala",
    email: document.getElementById("emailEscala").value,
    data: document.getElementById("data").value,
    turno: document.getElementById("turno").value,
  });

  fetch(scriptURL, { method: 'POST', body: params })
    .then(res => res.text())
    .then(msg => alert(msg));
}

const scriptURL = "https://script.google.com/macros/s/AKfycbx-Wv5bwWBzd4OH9CCZZHHzOt6hrVp9UBSeWPYtZoIalMwuqfKCYNJ0_mo1TyBvW9r5/exec";
