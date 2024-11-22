CREATE DATABASE zoodex;
DROP DATABASE zoodex;
USE zoodex;

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  foto_perfil VARCHAR(500)
);

CREATE TABLE animais (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome_eng VARCHAR(30) NOT NULL,
  nome VARCHAR(30) NOT NULL,
  descricao VARCHAR(2000) NOT NULL,
  foto VARCHAR(1000),
  foto_silhueta VARCHAR(1000)
);


CREATE TABLE historico (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT,
  animal_id INT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (animal_id) REFERENCES animais(id)
);


DROP TABLE usuarios;
DROP TABLE animais;
DROP TABLE historico;

SELECT * FROM animais;
SELECT * FROM usuarios;
SELECT * FROM historico;
DELETE FROM usuarios WHERE id > 1;
DELETE FROM animais WHERE id < 0;
DELETE FROM historico WHERE id > 0;

SELECT usuarios.nome AS nome_usuario, animais.nome AS nome_animal
FROM historico
INNER JOIN usuarios ON historico.usuario_id = usuarios.id
INNER JOIN animais ON historico.animal_id = animais.id;


UPDATE usuarios SET foto_perfil = './node_api/private/style/images/perfil.jpg' WHERE id = 1;
UPDATE animais SET foto = './node_api/private/style/images/girafa.jpg'  WHERE id = 2;

INSERT INTO historico (usuario_id,animal_id) VALUES (1,4);

INSERT INTO animais (nome_eng,nome,foto,foto_silhueta,descricao) VALUES 
("Lion","Leão","./node_api/private/style/images/animais/leao.jpg","./node_api/private/style/images/animais_silhueta/leao_silhueta.png","O leão é um mamífero pertencente à ordem Carnivora e família Felidae, sendo conhecido como “rei das selvas”. Ele se alimenta de outros animais, como gnus e zebras, e vive em grupos, que apresentam divisões bem marcadas, sendo o macho responsável pela defesa do grupo e a fêmea pela caça e cuidado com os filhotes. Apesar de serem admirados por sua força, atualmente as populações de leões estão em declínio, sendo a espécie classificada como vulnerável pela IUCN (sigla em inglês para União Internacional para a Conservação da Natureza). Os leões costumam ser divididos em subpopulações asiáticas e subpopulações africanas."),
("Giraffe","Girafa","./node_api/private/style/images/animais/girafa.jpg","./node_api/private/style/images/animais_silhueta/girafa_silhueta.png","As girafas são mamíferos nativos do continente africano. Algumas das características mais marcantes desses animais é a sua altura e o seu padrão de coloração, com manchas marrons características. São animais herbívoros (só se alimentam de vegetais) que apresentam como um de seus alimentos preferidos as plantas conhecidas como acácias. Geralmente as fêmeas dão à luz um único filhote. Atualmente essa espécie é classificada como vulnerável pela Lista Vermelha de Espécies Ameaçadas da IUCN, e a tendência populacional é a redução do número de indivíduos. A perda de habitat e a caça ilegal são algumas das ameaças a esses animais."),
("Elephant","Elefante","./node_api/private/style/images/animais/elefante.jpg","./node_api/private/style/images/animais_silhueta/elefante_silhueta.png","Elefantes são animais mamíferos que se destacam pelo seu grande porte, sendo considerados os maiores vertebrados terrestres existentes no mundo na atualidade. Algumas características que chamam a atenção são suas longas presas e uma tromba comprida. Esses são animais herbívoros que, para terem todas as suas necessidades metabólicas supridas, precisam ingerir vários quilos de alimento todos os dias. Atualmente, os elefantes estão ameaçados de extinção por causa da perda/fragmentação de seu habitat e pela caça."),
("Rhino","Rinoceronte","./node_api/private/style/images/animais/rinoceronte.jpg","./node_api/private/style/images/animais_silhueta/rinoceronte_silhueta.png","Rinocerontes são mamíferos herbívoros encontrados na África e Ásia que apresentam pele grossa e cornos muito visados comercialmente. O termo rinoceronte é usado para se referir a cinco espécies distintas: rinoceronte-branco, rinoceronte-negro, rinoceronte-indiano, rinoceronte-de-sumatra e  rinoceronte-de-java. Das espécies conhecidas, três estão classificadas como “criticamente em perigo”, o que nos mostra a necessidade de preservação desses animais."),
("Hippo","Hipopótamo","./node_api/private/style/images/animais/hipopotamo.jpg","./node_api/private/style/images/animais_silhueta/hipopotamo_silhueta.png","Hipopótamos são animais mamíferos que estão divididos em dois gêneros e duas espécies. Trata-se de animais relativamente grandes, apesar de o hipopótamo-pigmeu ser bem menor que o hipopótamo-comum. Possuem corpo em forma de barril e volumoso e uma pele com poucos pelos e que secreta uma substância avermelhada que os ajuda a se proteger do sol e da ação de bactérias. Hipopótamos-comuns vivem em grupos, sendo os pigmeus menos sociais. Ambas espécies ocorrem na África."),
("Tiger","Tigre","./node_api/private/style/images/animais/tigre.jpg","./node_api/private/style/images/animais_silhueta/tigre_silhueta.png","O tigre é um mamífero carnívoro que faz parte da família dos felídeos e é considerado o maior felino do mundo. É um animal que apresenta hábito solitário e se alimenta, principalmente, de ungulados (animais que possuem casco). Para capturar suas presas, utiliza a técnica de se aproximar delas sem que seja percebido, movendo-se de maneira silenciosa. É um animail ágil, forte e que apresenta olfato apurado e boa visão. Destaca-se por ter um padrão de pelagem típico, com pelos laranja-avermelhados e linhas pretas dispostas ao longo de seu corpo. Atualmente, são reconhecidas seis subespécies de tigres viventes.");

INSERT INTO animais (nome_eng,nome,descricao) VALUES 
('teste','teste','teste');