const scriptURL = 'https://script.google.com/macros/s/AKfycbwChfra_qiB1YrgsyH1uRcPPtzW3-NZqUTNK34yHRsW2dt--lQtpJyO7X2Fl0jaOhKB/exec';
document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('formCadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', e => {
      e.preventDefault();
      const dados = {
        tipo: 'cadastro',
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        telefone: document.getElementById('telefone').value,
        igreja: document.getElementById('igreja').value
      };
      fetch(scriptURL, { method: 'POST', body: new URLSearchParams(dados)})
        .then(() => alert("Cadastro realizado!"))
        .catch(err => alert("Erro no cadastro: " + err));
    });
  }

  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const senha = document.getElementById('loginSenha').value;

      fetch(scriptURL + '?tipo=ver')
        .then(res => res.json())
        .then(data => {
          const users = data.filter(r => r[0] === "Cadastro");
          const user = users.find(u => u[3] === email && u[4] === senha);
          if (user) {
            localStorage.setItem('emailLogado', email);
            window.location.href = 'escala.html';
          } else {
            alert("Email ou senha inválidos.");
          }
        });
    });
  }

  const formEscala = document.getElementById('formEscala');
  if (formEscala) {
    const email = localStorage.getItem('emailLogado');
    if (!email) return window.location.href = 'login.html';
    formEscala.addEventListener('submit', e => {
      e.preventDefault();
      const dados = {
        tipo: 'escala',
        email,
        data: document.getElementById('dataJejum').value,
        turno: document.getElementById('turnoJejum').value
      };
      fetch(scriptURL, { method: 'POST', body: new URLSearchParams(dados)})
        .then(() => alert("Escala salva!"))
        .catch(err => alert("Erro ao salvar escala: " + err));
    });
  }

  if (document.getElementById('tabelaEscala')) {
    const email = localStorage.getItem('emailLogado');
    if (!email) return window.location.href = 'login.html';
    fetch(scriptURL + '?tipo=ver')
      .then(res => res.json())
      .then(data => {
        const tabela = data.map(r => r.join(' | ')).join('\n');
        document.getElementById('tabelaEscala').innerHTML = `<pre>${tabela}</pre>`;
      });
  }
});

function sair() {
  localStorage.removeItem('emailLogado');
  window.location.href = 'login.html';
}

function exportarPDF() {
  window.print();
}
