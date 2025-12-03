document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegister");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    // Validação simples
    if (!nome || !email || !cpf || !telefone || !senha || !confirmarSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        nome,
        email,
        cpf,
        telefone,
        senha
      });

      alert("Conta criada com sucesso!");
      window.location.href = "../login/login.html";

    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Erro ao registrar. Tente novamente.");
      }
    }
  });
});
