// Importando o módulo mysql2
var mysql2 = require("mysql2");

// Configuração para acessar o banco de dados
var connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "electronatividade",
});

// Função responsável por conectar com o banco de dados
function conectarBancoDeDados() {

  // Verificar conexão com o banco de dados
  connection.connect(function (error) {
    if (error) {
      console.log(
        `Ocorreu um erro ao conectar no banco de dados: ${error.code}`
      );
      console.log(
        `Ocorreu um erro ao conectar no banco de dados: ${error.fatal}`
      );
    } else {
      console.log("Conectado ao banco de dados com sucesso!");
    }
  });
}

// Função responsável por adicionar item pelo evento de onkeypress no input
function adicionarItemPelaTecla(event) {
  // Pegando o tipo da tecla pelo evento
  var tecla = event.key;

  // Verificando se a tecla pressionada é o Enter
  if (tecla === "Enter") {
    // Chamando a função responsável por adicionar item
    adicionarItem();
  }
}

function adicionarItem() {
  // Invocando a função conectarBancoDeDados
  conectarBancoDeDados();

  // Pegando o elemento input
  var elementoInput = document.getElementById("input-tarefa");

  // Pegando o valor do input
  var valorInput = elementoInput.value;

  // Pegando a tag UL do nosso HTML pelo ID
  var minhaTagUL = document.getElementById("lista-de-tarefas");

  // Criando tag LI com JavaScript
  var criarTagLI = document.createElement("li");

  // Adicionando um evento de click para a tag <li>
  criarTagLI.addEventListener("click", concluirTarefa);

  // Criando uma tag em negrito
  var tagRemover =
    "<i onclick='removerItem(event)' class='fa-solid fa-circle-minus'></i>";

  // Adicionando um texto para nossa tag li criada
  criarTagLI.innerHTML = valorInput + tagRemover;

  // Adicionando a tag li para nossa ul
  minhaTagUL.appendChild(criarTagLI);

  /** ADICIONE A QUERY DE INSERT AQUI */
  var query = `INSERT INTO todolist (item,concluida) VALUES ('${valorInput}',false)`;

  connection.query(query, function (error) {
    if (error) {
      console.log("Ocorreu um erro ao inserir no banco de dados");
    } else {
      console.log("Tarefa cadastrada com sucesso!!!")
    }
  })
  /** ================================== */
}

// Função responsável por remover item
function removerItem(event) {
  // Pegando tag <i> dentro do nosso event
  var meuIcone = event.target;

  // Pegando a tag <li> através da minha tag <i> com propriedade parentElement
  var minhaLi = meuIcone.parentElement;

//pegar o atributo ID da tag <li>
var idLI = minhaLi.id;

//query de DELETE
var query = `DELETE FROM todolist WHERE id = ${idLI}`;

connection.query(query, function (error) {
  if (error) {
    console.log("Ocorreu um erro ao deletar no banco de dados");
  } else {
    console.log("Tarefa deletada com sucesso");
  }
})

console.log(minhaLi);

  // Excluindo a tag <li> com a função remove()
  minhaLi.remove();
}

// Função responsável por concluir tarefa
function concluirTarefa(event) {
  // Pegando tag <li> dentro do nosso event
  var minhaTagLi = event.target;

  minhaTagLi.className = "concluida";
}

//Função responsável por carregar os itens do banco de dados
function carregarItensDoBancoDeDados() {
  //Invocando a função conectarBancoDeDados
  conectarBancoDeDados();

  //Query de SELECT

  var query = "select * from  todolist";

  //Executando a query 
  connection.query(query, function (error, resultados) {
    if (error) {
      console.log('Ocorreu um erro ao executar a query');
    } else {
      console.log(resultados)

      resultados.forEach(function (resultado) {

        var minhaTagUL = document.getElementById("lista-de-tarefas");

        // Criando tag LI com JavaScript
        var criarTagLI = document.createElement("li");
        criarTagLI.id = resultado.id;

        // Adicionando um evento de click para a tag <li>
        criarTagLI.addEventListener("click", concluirTarefa);

        // Criando uma tag em negrito
        var tagRemover =
          "<i onclick='removerItem(event)' class='fa-solid fa-circle-minus'></i>";

        // Adicionando um texto para nossa tag li criada
        criarTagLI.innerHTML = resultado.item + tagRemover;

        // Adicionando a tag li para nossa ul
        minhaTagUL.appendChild(criarTagLI);

        console.log(resultado)
      })
    }
  })
}

//Chamando a função carregarItensDoBancoDeDados
carregarItensDoBancoDeDados();