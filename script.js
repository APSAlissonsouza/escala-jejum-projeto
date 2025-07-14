const scriptURL = 'https://script.google.com/macros/s/AKfycbzlrZ7NpCZmULnpcjPf0PpLoOjkaZgoYoZCpwMd9ZjBD8-_HnycJc9i-jVRVHrJETp7/exec';

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
        formEscala.addEventListener('submit', e => {
            e.preventDefault();
            const dados = {
                tipo: 'escala',
                email: document.getElementById('emailEscala').value,
                data: document.getElementById('dataJejum').value,
                turno: document.getElementById('turnoJejum').value
            };
            fetch(scriptURL, { method: 'POST', body: new URLSearchParams(dados)})
                .then(() => alert("Escala salva!"))
                .catch(err => alert("Erro ao salvar escala: " + err));
        });
    }
});

function carregarEscala() {
    fetch(scriptURL + '?tipo=ver')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('tabelaEscala');
            container.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        });
}
