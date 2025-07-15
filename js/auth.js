
// Cadastro
function register() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(() => {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => alert(error.message));
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => alert(error.message));
}

// Logout
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}

// Verificar se está logado e listar jejuns
function checkAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      listarJejuns();
    }
  });
}

// Agendar jejum
function agendarJejum() {
  const data = document.getElementById("dataJejum").value;
  const motivo = document.getElementById("motivo").value;
  const user = firebase.auth().currentUser;

  if (!data || !motivo) {
    alert("Preencha todos os campos.");
    return;
  }

  db.collection("jejuns").add({
    uid: user.uid,
    email: user.email,
    data: data,
    motivo: motivo,
    criadoEm: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("Jejum agendado!");
    listarJejuns();
  })
  .catch((error) => {
    alert("Erro ao agendar: " + error.message);
  });
}

// Listar jejuns
function listarJejuns() {
  const lista = document.getElementById("listaJejuns");
  if (!lista) return;
  lista.innerHTML = "";

  const user = firebase.auth().currentUser;
  db.collection("jejuns").where("uid", "==", user.uid).orderBy("data")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const j = doc.data();
        const item = document.createElement("li");
        item.textContent = `${j.data} - ${j.motivo}`;
        lista.appendChild(item);
      });
    });
}
