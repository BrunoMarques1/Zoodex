CREATE DATABASE zoodex;
USE zoodex; 	
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  foto_perfil VARCHAR(255)
);

CREATE TABLE animais (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  nome_cientifico VARCHAR(100) NOT NULL,
  caracteristicas TEXT,
  imagem_padrao VARCHAR(255)
);

CREATE TABLE zoologicos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  localizacao VARCHAR(255) NOT NULL,
  mapa BLOB,
  animais_disponiveis TEXT -- Ajustar o tipo de dado conforme a implementação
);

CREATE TABLE animais_zoologico (
  id INT PRIMARY KEY AUTO_INCREMENT,
  animal_id INT,
  zoologico_id INT,
  descricao TEXT,
  audio VARCHAR(255),
  imagem VARCHAR(255),
  FOREIGN KEY (animal_id) REFERENCES animais(id),
  FOREIGN KEY (zoologico_id) REFERENCES zoologicos(id)
);

CREATE TABLE historico (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT,
  animal_id INT,
  zoologico_id INT,
  data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (animal_id) REFERENCES animais(id),
  FOREIGN KEY (zoologico_id) REFERENCES zoologicos(id)
);
/*DROP DATABASE zoodex;*/