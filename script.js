const scriptURL = 'https://script.google.com/macros/s/AKfycbxr1ZbCRmkJZ78eCgCXCuiYXkf0JKfotSVhy3wX7pJqidldlluGtPQhqC9BRDdhodkB/exec';

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
                .then(() => alert("Cadastro enviado!"))
                .catch(err => alert("Erro ao enviar: " + err));
        });
    }

    const formEscala = document.getElementById('formEscala');
    if (formEscala) {
        if (!localStorage.getItem('emailLogado')) {
            window.location.href = 'login.html';
        }

        formEscala.addEventListener('submit', e => {
            e.preventDefault();
            const dados = {
                tipo: 'escala',
                email: localStorage.getItem('emailLogado'),
                data: document.getElementById('dataJejum').value,
                turno: document.getElementById('turnoJejum').value
            };
            fetch(scriptURL, { method: 'POST', body: new URLSearchParams(dados)})
                .then(() => alert("Escala salva!"))
                .catch(err => alert("Erro ao salvar escala: " + err));
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
                    const usuarios = data.filter(l => l[0] === 'Cadastro');
                    const achou = usuarios.find(u => u[3] === email && u[4] === senha);
                    if (achou) {
                        localStorage.setItem('emailLogado', email);
                        alert("Login bem-sucedido!");
                        window.location.href = 'escala.html';
                    } else {
                        alert("Email ou senha incorretos!");
                    }
                })
                .catch(() => alert("Erro ao tentar login."));
        });
    }

    if (document.getElementById('tabelaEscala')) {
        if (!localStorage.getItem('emailLogado')) {
            window.location.href = 'login.html';
        }
        fetch(scriptURL + '?tipo=ver')
            .then(res => res.json())
            .then(data => {
                const container = document.getElementById('tabelaEscala');
                container.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            });
    }
});

function sair() {
    localStorage.removeItem('emailLogado');
    window.location.href = 'login.html';
}
