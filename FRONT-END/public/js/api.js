// ================================
// CONFIGURAÇÃO GLOBAL DO AXIOS
// ================================

// URL base do seu backend
axios.defaults.baseURL = "http://localhost:3000";

// Permitir envio de cookies/JWT caso utilize no futuro
axios.defaults.withCredentials = false;

// Cabeçalhos padrão
axios.defaults.headers.common["Content-Type"] = "application/json";

// Função auxiliar para tratar erros facilmente
function handleApiError(error) {
    if (error.response) {
        console.error("Erro da API:", error.response.data);
        return error.response.data;
    } else if (error.request) {
        console.error("Nenhuma resposta do servidor.");
        return { status: "erro", message: "Servidor não respondeu." };
    } else {
        console.error("Erro inesperado:", error.message);
        return { status: "erro", message: "Erro inesperado." };
    }
}

// Exporta para ser usado em outros scripts
window.api = {
    async post(url, data) {
        try {
            const res = await axios.post(url, data);
            return res.data;
        } catch (err) {
            return handleApiError(err);
        }
    },

    async get(url) {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (err) {
            return handleApiError(err);
        }
    },

    async put(url, data) {
        try {
            const res = await axios.put(url, data);
            return res.data;
        } catch (err) {
            return handleApiError(err);
        }
    },

    async delete(url) {
        try {
            const res = await axios.delete(url);
            return res.data;
        } catch (err) {
            return handleApiError(err);
        }
    }
};
