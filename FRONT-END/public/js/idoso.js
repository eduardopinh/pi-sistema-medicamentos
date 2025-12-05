document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Idoso não especificado.");
    window.location.href = "/pages/pacientes/pacientes.html";
    return;
  }

  const photoEl = document.getElementById("idoso-photo");
  const nomeEl = document.getElementById("idoso-nome");
  const ageEl = document.getElementById("idoso-age");
  const infoEl = document.getElementById("idoso-info");
  const contatosEl = document.getElementById("idoso-contatos");
  const doencasEl = document.getElementById("idoso-doencas");
  const medsEl = document.getElementById("idoso-medicamentos");
  const sinaisEl = document.getElementById("idoso-sinais");

  const editarLink = document.getElementById("editar-link");
  const excluirBtn = document.getElementById("excluir-btn");
  const formSinal = document.getElementById("sinal-form");

  function getPhotoUrl(path) {
    if (!path) return "https://cdn-icons-png.flaticon.com/512/847/847969.png";
    return window.location.origin + path;
  }

  function calcAge(date) {
    if (!date) return "";
    const dt = new Date(date);
    const diff = Date.now() - dt.getTime();
    return Math.floor(diff / (1000 * 3600 * 24 * 365.25)) + " anos";
  }

  function formatDate(d) {
    if (!d) return "";
    return new Date(d).toLocaleDateString("pt-BR");
  }

  function formatDateTime(d) {
    if (!d) return "";
    return new Date(d).toLocaleString("pt-BR");
  }

  function escape(str) {
    return String(str || "").replace(/[&<>"']/g, m => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    }[m]));
  }

  async function load() {
    try {
      const res = await axios.get(`/api/idosos/${id}`);
      const i = res.data;

      document.getElementById("idoso-title").textContent = i.nome;
      nomeEl.textContent = i.nome;
      ageEl.textContent = calcAge(i.data_nasc);
      infoEl.textContent = i.informacoes || "Nenhuma observação registrada";

      photoEl.src = getPhotoUrl(i.foto);

      // contatos
      contatosEl.innerHTML = "";
      (i.contatos || []).forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${escape(c.nome)}</strong> — ${escape(c.telefone)}`;
        contatosEl.appendChild(li);
      });

      // doenças
      doencasEl.innerHTML = "";
      (i.doencas || []).forEach(d => {
        const card = document.createElement("div");
        card.className = "accordion";
        card.innerHTML = `
          <summary>${escape(d.diagnostico)}</summary>
          <p class='doctor'>${escape(d.medico || "")}</p>
          <p>${escape(d.observacoes || "")}</p>
        `;
        doencasEl.appendChild(card);
      });

      // medicamentos
      medsEl.innerHTML = "";
      (i.medicamentos || []).forEach(m => {
        const div = document.createElement("div");
        div.className = "med-item";
        div.innerHTML = `
          <strong>${escape(m.nome)}</strong> — ${escape(m.dose)} — ${escape(m.horario)}
        `;
        medsEl.appendChild(div);
      });

      // sinais
      sinaisEl.innerHTML = "";
      (i.sinais_vitais || []).slice().reverse().forEach(s => {
        const item = document.createElement("div");
        item.className = "sinal-item";
        item.innerHTML = `
          <small>${formatDateTime(s.data)}</small>
          <p>PA: ${s.pressao_sistolica}/${s.pressao_diastolica} — BPM: ${s.batimentos} — Temp: ${s.temperatura}°C</p>
          <p>${escape(s.observacoes)}</p>
        `;
        sinaisEl.appendChild(item);
      });

      editarLink.href = `/pages/cadastroIdoso/cadastroIdoso.html?id=${i._id}`;

    } catch (e) {
      console.error(e);
      alert("Erro ao carregar idoso.");
      window.location.href = "/pages/pacientes/pacientes.html";
    }
  }

  excluirBtn.addEventListener("click", async () => {
    if (!confirm("Deseja excluir este idoso?")) return;
    await axios.delete(`/api/idosos/${id}`);
    alert("Idoso removido.");
    window.location.href = "/pages/pacientes/pacientes.html";
  });

  formSinal?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(formSinal);
    const novo = {
      data: new Date().toISOString(),
      pressao_sistolica: fd.get("pressao_sistolica"),
      pressao_diastolica: fd.get("pressao_diastolica"),
      batimentos: fd.get("batimentos"),
      temperatura: fd.get("temperatura"),
      observacoes: fd.get("observacoes")
    };

    const res = await axios.get(`/api/idosos/${id}`);
    const i = res.data;

    const sinais = i.sinais_vitais || [];
    sinais.push(novo);

    await axios.put(`/api/idosos/${id}`, { sinais_vitais: sinais });

    formSinal.reset();
    load();
  });

  // troca de abas
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".tab.active")?.classList.remove("active");
      btn.classList.add("active");

      document.querySelector(".tab-content.active")?.classList.remove("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  load();
});
