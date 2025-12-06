// FRONT-END/public/js/medicamentos.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("med-cards");
  const searchInput = document.getElementById("search-med");

  if (!container) {
    console.error("medicamentos.js: elemento #med-cards não encontrado no DOM.");
    return;
  }

  const fallbackImg = "/public/img/medicamento-default.png"; // ajuste se seu caminho for diferente
  let medicamentos = [];

  // inicial
  loadMedicamentos();

  // carrega do backend
  async function loadMedicamentos() {
    try {
      const res = await axios.get("/api/medicamentos");
      if (!res || !res.data) {
        console.warn("medicamentos.js: resposta vazia de /api/medicamentos", res);
        medicamentos = [];
      } else if (!Array.isArray(res.data)) {
        // caso o backend retorne um objeto com { data: [...] } ou algo diferente
        console.warn("medicamentos.js: /api/medicamentos retornou não-array. Verifique API.", res.data);
        medicamentos = Array.isArray(res.data.medicamentos) ? res.data.medicamentos : [];
      } else {
        medicamentos = res.data;
      }

      render(medicamentos);

      // Se o input de busca existir, (re)ligar listener — evita múltiplas ligações
      if (searchInput) {
        // remove listeners antigos guardando referência simples
        searchInput.oninput = () => {
          const text = (searchInput.value || "").toLowerCase().trim();
          const filtered = medicamentos.filter(m => (m.nome || "").toLowerCase().includes(text));
          render(filtered);
        };
      }

    } catch (err) {
      console.error("medicamentos.js: erro ao carregar medicamentos:", err);
      container.innerHTML = `<p style="color:#d00">Erro ao carregar medicamentos. Veja console para detalhes.</p>`;
    }
  }

  // render
  function render(list) {
    container.innerHTML = "";

    if (!Array.isArray(list) || list.length === 0) {
      container.innerHTML = "<p>Nenhum medicamento encontrado.</p>";
      return;
    }

    list.forEach(m => {
      // segurança: garantir campos mínimos
      const nome = m.nome || "Sem nome";
      const classificacao = m.classificacao || "—";
      const medico = m.medico || "—";
      const estoque = (typeof m.estoque === "number") ? m.estoque : (m.estoque ? m.estoque : 0);
      const horarios = Array.isArray(m.horarios) ? m.horarios : [];

      // calcular src da imagem (se houver caminho absoluto no DB, usa direto; se for relativo, junta com origin)
      let imgSrc;
      if (m.foto && String(m.foto).trim()) {
        const caminho = String(m.foto).trim();
        // se já começa com http ou //, usa direto
        if (/^(https?:)?\/\//i.test(caminho)) {
          imgSrc = caminho;
        } else {
          // junta com origin — cuidado com barras duplicadas
          imgSrc = window.location.origin + (caminho.startsWith("/") ? caminho : "/" + caminho);
        }
      } else {
        imgSrc = fallbackImg;
      }

      // construir card
      const card = document.createElement("div");
      card.className = "med-card";

      // imagem
      const img = document.createElement("img");
      img.className = "med-img";
      img.src = imgSrc;
      // se der erro no carregamento, trocar para fallback
      img.onerror = () => {
        if (img.src !== fallbackImg) img.src = fallbackImg;
      };

      // corpo do card
      const nameEl = document.createElement("div");
      nameEl.className = "med-name";
      nameEl.textContent = nome;

      const classEl = document.createElement("div");
      classEl.className = "med-class";
      classEl.textContent = classificacao;

      const infoEl = document.createElement("div");
      infoEl.className = "med-info";
      infoEl.innerHTML = `
        <p><strong>Prescrito por:</strong> ${escapeHtml(medico)}</p>
        <p><strong>Estoque:</strong> ${escapeHtml(String(estoque))} unidades</p>
        <p><strong>Horários:</strong> ${escapeHtml(horarios.join(", ") || "—")}</p>
      `;

      const btn = document.createElement("a");
      btn.className = "btn-details";
      // abrir página de edição/visualização — confirme o path que você usa
      btn.href = `/pages/cadastrarMedicamento/cadastrarMedicamento.html?id=${encodeURIComponent(m._id)}`;
      btn.textContent = "Ver Detalhes";

      // append na ordem
      card.appendChild(img);
      card.appendChild(nameEl);
      card.appendChild(classEl);
      card.appendChild(infoEl);
      card.appendChild(btn);

      container.appendChild(card);
    });
  }

  // pequeno escape para evitar XSS quando injetamos strings em HTML
  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;","<": "&lt;",">": "&gt;",'"': "&quot;","'": "&#39;"
    }[m]));
  }

});
