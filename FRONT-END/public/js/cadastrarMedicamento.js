document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-med");
  const chips = document.querySelectorAll(".chip");
  const classificacaoInput = document.getElementById("classificacao");
  const horariosList = document.getElementById("horarios-list");
  const addHorarioBtn = document.getElementById("add-horario");
  const fotoInput = document.getElementById("foto");

  const urlParams = new URLSearchParams(window.location.search);
  const editingId = urlParams.get("id");

  // Seleção de Classificação
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      classificacaoInput.value = chip.dataset.value;
    });
  });

  // Adicionar Horário
  function addHorarioRow(value = "") {
    const row = document.createElement("div");
    row.className = "horario-row";

    row.innerHTML = `
      <input class="input" type="time" name="horarios[]" value="${value}" />
      <button type="button" class="btn-secondary small remove">✖</button>
    `;

    row.querySelector(".remove").addEventListener("click", () => row.remove());
    horariosList.appendChild(row);
  }

  addHorarioBtn.addEventListener("click", () => addHorarioRow());

  // Carregar Medicamento (edição)
  async function loadMedicamento(id) {
    try {
      const res = await axios.get(`/api/medicamentos/${id}`);
      const m = res.data;

      document.getElementById("title").textContent = "Editar Medicamento";
      form.nome.value = m.nome;
      form.medico.value = m.medico;
      form.especialidade.value = m.especialidade;
      form.estoque.value = m.estoque;
      form.instrucoes.value = m.instrucoes || "";

      classificacaoInput.value = m.classificacao;
      chips.forEach(c => {
        if (c.dataset.value === m.classificacao) c.classList.add("active");
      });

      horariosList.innerHTML = "";
      (m.horarios || []).forEach(h => addHorarioRow(h));

    } catch (err) {
      console.error(err);
      alert("Erro ao carregar medicamento.");
    }
  }

  if (editingId) loadMedicamento(editingId);
  else addHorarioRow();

  // SUBMIT
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("nome", form.nome.value);
    fd.append("classificacao", classificacaoInput.value);
    fd.append("medico", form.medico.value);
    fd.append("especialidade", form.especialidade.value);
    fd.append("estoque", form.estoque.value);
    fd.append("instrucoes", form.instrucoes.value);

    document.querySelectorAll("input[name='horarios[]']").forEach(h => {
      fd.append("horarios[]", h.value);
    });

    // FOTO (opcional)
    if (fotoInput.files.length > 0) {
      fd.append("foto", fotoInput.files[0]);
    }

    try {
      if (editingId) {
        // SE ESTÁ EDITANDO
        await axios.put(`/api/medicamentos/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        alert("Medicamento atualizado com sucesso.");
      } else {
        // SE ESTÁ CRIANDO
        await axios.post("/api/medicamentos", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        alert("Medicamento cadastrado!");
      }

      window.location.href = "/pages/medicamentos/medicamentos.html";

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erro ao salvar medicamento.");
    }
  });
});
