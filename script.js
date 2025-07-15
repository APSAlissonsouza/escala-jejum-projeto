const scriptURL = 'https://script.google.com/macros/s/AKfycbxog93JRJFWV52hRa7scLbh30f7jPIfSL_Y-ADLDww40OxkI9p8zH7iEg9Hn-5HMSU-/exec';

// Função para enviar dados via POST
async function enviarDados(dados) {
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: new URLSearchParams(dados)
    });
    alert("Operação realizada com sucesso!");
  } catch (err) {
    alert("Erro: " + err.message);
  }
}

// Cadastro
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
      tipo: 'cadastro',
      nome: formCadastro.nome.value,
      email: formCadastro.email.value,
      senha: formCadastro.senha.value,
      telefone: formCadastro.telefone.value,
      igreja: formCadastro.igreja.value
    };
    await enviarDados(dados);
  });
}

// Login
const formLogin = document.getElementById('formLogin');
if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = formLogin.loginEmail.value;
    const senha = formLogin.loginSenha.value;

    try {
      const res = await fetch(scriptURL + '?tipo=ver');
      const data = await res.json();
      const users = data.filter(r => r[0] === "Cadastro");
      const user = users.find(u => u[3] === email && u[4] === senha);
      if (user) {
        localStorage.setItem('emailLogado', email);
        window.location.href = 'escala.html';
      } else {
        alert("Email ou senha inválidos.");
      }
    } catch (err) {
      alert("Erro no login: " + err.message);
    }
  });
}

// Escala
const formEscala = document.getElementById('formEscala');
if (formEscala) {
  const email = localStorage.getItem('emailLogado');
  if (!email) window.location.href = 'login.html';

  formEscala.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
      tipo: 'escala',
      email,
      data: formEscala.dataJejum.value,
      turno: formEscala.turnoJejum.value
    };
    await enviarDados(dados);
  });
}

// Exibir Escala
const tabelaEscala = document.getElementById('tabelaEscala');
if (tabelaEscala) {
  const email = localStorage.getItem('emailLogado');
  if (!email) window.location.href = 'login.html';

  fetch(scriptURL + '?tipo=ver')
    .then(res => res.json())
    .then(data => {
      const linhas = data.map(r => r.join(' | ')).join('\n');
      tabelaEscala.innerHTML = `<pre>${linhas}</pre>`;
    })
    .catch(err => alert("Erro ao carregar escala: " + err.message));
}

// Sair
function sair() {
  localStorage.removeItem('emailLogado');
  window.location.href = 'login.html';
}

// Exportar para PDF
function exportarPDF() {
  window.print();
}
