document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  const loginInput = document.getElementById("loginInput");
  const senhaInput = document.getElementById("senhaInput");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const login = loginInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!login || !senha) {
      alert("Preencha email/CPF e senha.");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: login, // futuramente: verificar CPF
        senha
      });

      if (response.data.status === "ok") {
        // Salva token
        localStorage.setItem("token", response.data.token);

        // Salva dados do usuário
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redireciona para o painel
        window.location.href = "../painel/painel.html";
      }
    } catch (err) {
      console.error("Erro no login:", err);

      if (err.response) {
        alert(err.response.data.message || "Erro ao fazer login.");
      } else {
        alert("Erro de conexão com o servidor.");
      }
    }
  });
});
