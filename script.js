const scriptURL = 'https://script.google.com/macros/s/AKfycby-lKvsB9C3zBgjDjnnr7asDNAp7_zuJ9kZJ78lpV5gu1MHn4Cx4fh3VrPS-AMWi9OK/exec';

document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');
    const formLogin = document.getElementById('formLogin');
    const formEscala = document.getElementById('formEscala');

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
                .then(() => alert("Cadastro enviado!"))
                .catch(err => alert("Erro ao enviar: " + err));
        });
    }

    if (formLogin) {
        formLogin.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const senha = document.getElementById('loginSenha').value.trim();

            fetch(scriptURL + '?tipo=ver')
                .then(res => res.json())
                .then(data => {
                    const usuario = data.find(u => u.email === email && u.senha === senha);
                    if (usuario) {
                        localStorage.setItem('usuarioLogado', JSON.stringify({
                            email: usuario.email,
                            nome: usuario.nome
                        }));
                        alert("Login realizado com sucesso!");
                        window.location.href = "escala.html";
                    } else {
                        alert("Email ou senha inválidos.");
                    }
                })
                .catch(err => alert("Erro ao validar login: " + err));
        });
    }

    if (formEscala) {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuarioLogado) {
            alert("Você precisa fazer login para acessar essa página.");
            window.location.href = "login.html";
            return;
        }

        formEscala.addEventListener('submit', e => {
            e.preventDefault();
            const email = usuarioLogado.email;
            const checkboxes = document.querySelectorAll('input[name="escala"]:checked');
            const diasSelecionados = Array.from(checkboxes).map(cb => cb.value).join(', ');
            const dados = {
                tipo: 'escala',
                email,
                dias: diasSelecionados
            };
            fetch(scriptURL, { method: 'POST', body: new URLSearchParams(dados)})
                .then(() => alert("Escala salva!"))
                .catch(err => alert("Erro ao salvar escala: " + err));
        });
    }

    const isAdmin = document.getElementById('tabelaEscala');
    if (isAdmin) {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuarioLogado) {
            alert("Você precisa fazer login para acessar essa página.");
            window.location.href = "login.html";
            return;
        }

        fetch(scriptURL + '?tipo=ver')
            .then(res => res.json())
            .then(data => {
                const tabela = gerarTabela(data);
                document.getElementById('tabelaEscala').innerHTML = tabela;
            });
    }
});

function gerarTabela(data) {
    if (!Array.isArray(data)) return "Nenhum dado disponível.";
    let html = "<table><tr><th>Nome</th><th>Email</th><th>Dias de Jejum</th></tr>";
    data.forEach(item => {
        if (item.dias) {
            html += `<tr><td>${item.nome || ''}</td><td>${item.email}</td><td>${item.dias}</td></tr>`;
        }
    });
    html += "</table>";
    return html;
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "login.html";
}
