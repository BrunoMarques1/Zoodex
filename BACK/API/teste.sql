CREATE DATABASE zoodex;
DROP DATABASE zoodex;
USE zoodex;

CREATE TABLE animais (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome_eng VARCHAR(30) NOT NULL,
  nome VARCHAR(30) NOT NULL,
  descricao VARCHAR(2000) NOT NULL
);

SELECT * FROM animais;

INSERT INTO animais (nome_eng,nome,descricao) VALUES ("Lion","Leão","O leão é um mamífero pertencente à ordem Carnivora e família Felidae, sendo conhecido como “rei das selvas”. Ele se alimenta de outros animais, como gnus e zebras, e vive em grupos, que apresentam divisões bem marcadas, sendo o macho responsável pela defesa do grupo e a fêmea pela caça e cuidado com os filhotes. Apesar de serem admirados por sua força, atualmente as populações de leões estão em declínio, sendo a espécie classificada como vulnerável pela IUCN (sigla em inglês para União Internacional para a Conservação da Natureza). Os leões costumam ser divididos em subpopulações asiáticas e subpopulações africanas.");
INSERT INTO animais (nome_eng,nome,descricao) VALUES ("Giraffe","Girafa","As girafas são mamíferos nativos do continente africano. Algumas das características mais marcantes desses animais é a sua altura e o seu padrão de coloração, com manchas marrons características. São animais herbívoros (só se alimentam de vegetais) que apresentam como um de seus alimentos preferidos as plantas conhecidas como acácias. Geralmente as fêmeas dão à luz um único filhote. Atualmente essa espécie é classificada como vulnerável pela Lista Vermelha de Espécies Ameaçadas da IUCN, e a tendência populacional é a redução do número de indivíduos. A perda de habitat e a caça ilegal são algumas das ameaças a esses animais.");
INSERT INTO animais (nome_eng,nome,descricao) VALUES ("Elephant","Elefante","");
INSERT INTO animais (nome_eng,nome,descricao) VALUES ("Rhino","Rinoceronte","");
INSERT INTO animais (nome_eng,nome,descricao) VALUES ("Hippo","Hipopótamo","");
INSERT INTO animais (nome_eng,nome,descricao) VALUES ("Tiger","Tigre","");