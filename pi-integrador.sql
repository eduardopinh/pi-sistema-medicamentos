
CREATE DATABASE pi_integrador;
USE pi_integrador;



-- =========================
-- ADMINISTRADOR
-- =========================
CREATE TABLE administrador (
    id_adm INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- =========================
-- CUIDADOR
-- =========================
CREATE TABLE cuidador (
    id_cuid INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    cpf VARCHAR(20),
    telefone VARCHAR(50)
);

CREATE TABLE telefone_cuidador (
    id_tel INT AUTO_INCREMENT PRIMARY KEY,
    telefone VARCHAR(50),
    id_cuid INT,
    FOREIGN KEY (id_cuid) REFERENCES cuidador(id_cuid)
);

-- =========================
-- IDOSO
-- =========================
CREATE TABLE idoso (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    genero ENUM('Masculino','Feminino','Não quero informar'),
    data_nascimento DATE NOT NULL,
    contatos_emergencia VARCHAR(255),
    historico_clinico VARCHAR(255),
    id_adm INT,
    FOREIGN KEY (id_adm) REFERENCES administrador(id_adm)
);

-- =========================
-- FAMILIAR
-- =========================
CREATE TABLE familiar (
    id_parente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES idoso(id_usuario)
);

-- =========================
-- DOENÇA
-- =========================
CREATE TABLE doenca (
    id_doenca INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_diagnostico DATE,
    medico_responsavel VARCHAR(120),
    especialidade VARCHAR(100),
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES idoso(id_usuario)
);

-- =========================
-- MEDICAMENTO
-- =========================
CREATE TABLE medicamento (
    id_remedio INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    especialidade VARCHAR(100),
    quantidade_inicial INT NOT NULL,
    especificacoes VARCHAR(255),
    classificacao VARCHAR(50),
    idoso_id INT NOT NULL,
    doenca_id INT,
    FOREIGN KEY (idoso_id) REFERENCES idoso(id_usuario),
    FOREIGN KEY (doenca_id) REFERENCES doenca(id_doenca)
);

-- =========================
-- HORÁRIOS DE MEDICAMENTO
-- =========================
CREATE TABLE horario_medicamento (
    id_hr_medicamento INT AUTO_INCREMENT PRIMARY KEY,
    horario TIME,
    medicamento_id INT,
    FOREIGN KEY (medicamento_id) REFERENCES medicamento(id_remedio)
);

-- =========================
-- ADMINISTRAÇÃO DE DOSES
-- =========================
CREATE TABLE administracao (
    id_direcao INT AUTO_INCREMENT PRIMARY KEY,
    horario_administrado DATETIME NOT NULL,
    tipo ENUM('correto','fora_horario','atrasado'),
    medicamento_id INT NOT NULL,
    cuidador_id INT,
    FOREIGN KEY (medicamento_id) REFERENCES medicamento(id_remedio),
    FOREIGN KEY (cuidador_id) REFERENCES cuidador(id_cuid)
);

-- =========================
-- CONSULTA MÉDICA
-- =========================
CREATE TABLE consulta (
    id_orientacao BIGINT AUTO_INCREMENT PRIMARY KEY,
    idoso_id INT NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    medico VARCHAR(150) NOT NULL,
    local_consulta VARCHAR(150) NOT NULL,
    data_hora DATETIME NOT NULL,
    status_consulta ENUM('Confirmada', 'Remarcada', 'Cancelada') NOT NULL DEFAULT 'Confirmada',
    FOREIGN KEY (idoso_id) REFERENCES idoso(id_usuario)
);

-- =========================
-- SINAL VITAL
-- =========================
CREATE TABLE sinal_vital (
    id_checagem BIGINT AUTO_INCREMENT PRIMARY KEY,
    idoso_id INT NOT NULL,
    tipo ENUM('pressao','temperatura','peso','glicemia','saturacao') NOT NULL,
    valor VARCHAR(60) NOT NULL,
    data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacoes VARCHAR(255),
    FOREIGN KEY (idoso_id) REFERENCES idoso(id_usuario)
);

-- =========================
-- ALERTA
-- =========================
CREATE TABLE alerta (
    id_aviso INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    mensagem VARCHAR(255) NOT NULL,
    prioridade ENUM('baixa','media','alta'),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    idoso_id INT,
    medicamento_id INT,
    FOREIGN KEY (idoso_id) REFERENCES idoso(id_usuario),
    FOREIGN KEY (medicamento_id) REFERENCES medicamento(id_remedio)
);

-- =========================
-- MOTORISTA
-- =========================
CREATE TABLE motorista(
    id_motora INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    cpf VARCHAR(20),
    ativo ENUM('ativo','não ativo') NOT NULL
);

CREATE TABLE telefone_motorista (
    id_telf INT AUTO_INCREMENT PRIMARY KEY,
    telefone VARCHAR(255),
    id_mot INT,
    FOREIGN KEY (id_mot) REFERENCES motorista(id_motora)
);

-- =========================
-- NOTIFICAÇÃO WHATSAPP
-- =========================
CREATE TABLE notificacao_whats(
    id_notifica INT AUTO_INCREMENT PRIMARY KEY,
    destinatario_tipo ENUM('cuidador','motorista','família'),
    texto TEXT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_notificacao ENUM('pendente','enviada'),
    id_cuid INT,
    id_motora INT,
    FOREIGN KEY (id_cuid) REFERENCES cuidador(id_cuid),
    FOREIGN KEY (id_motora) REFERENCES motorista(id_motora)
);

-- =========================
-- RELATÓRIO
-- =========================
CREATE TABLE relatorio(
    id_descricao INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('medicamentos','sinais_vitais','eventos','consultas'),
    arquivo VARCHAR(255),
    data_gerada DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_idoso INT,
    id_sinal_vital BIGINT,
    FOREIGN KEY (id_idoso) REFERENCES idoso(id_usuario),
    FOREIGN KEY (id_sinal_vital) REFERENCES sinal_vital(id_checagem)
);
