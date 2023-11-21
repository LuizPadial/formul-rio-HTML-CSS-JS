// Inicializar um array para armazenar os dados dos usuários
var usuariosArmazenados = JSON.parse(localStorage.getItem("usuariosArmazenados")) || [];

function cadastrarCliente() {
    // Recuperar os dados do localStorage, se existirem
    let primeiroUsuario = localStorage.getItem("primeiroUsuario");

    // Se existirem dados, preencher os campos do formulário
    if (primeiroUsuario) {
        var dadosUsuario = JSON.parse(primeiroUsuario);
        document.getElementById("nome").value = dadosUsuario.nome;
        document.getElementById("email").value = dadosUsuario.email;
        document.getElementById("idade").value = dadosUsuario.idade;
        document.getElementById("curso").value = dadosUsuario.curso;
    }

    // Variáveis para armazenar os dados usando o DOM
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var idade = document.getElementById("idade").value;
    var curso = document.getElementById("curso").value;

    // Se algum campo não for preenchido, avisar o usuário
    if (nome === "" || email === "" || idade === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Construir a mensagem com os dados do usuário
    var mensagem = "Confirme os dados:\n\n" +
                   "Nome: " + nome + "\n" +
                   "E-mail: " + email + "\n" +
                   "Idade: " + idade + "\n" +
                   "Curso: " + curso + "\n\n" +
                   "Os dados estão corretos?";

    // Exibir um prompt para confirmar os dados
    var confirmacao = confirm(mensagem);

    // Se o usuário cancelar, não faz nada
    if (!confirmacao) {
        return;
    } else {
        console.log("O usuário confirmou os dados.")
    }

    // Condições de desconto de acordo com as idades digitadas
    var desconto = (idade < 18) ? 0.2 : 0.1;

    // Alerta para o usuário de acordo com o desconto 
    alert("Desconto aplicado: " + (desconto * 100) + "%");

    // Adicionar os dados do usuário ao array de usuários
    var novoUsuario = {
        nome: nome,
        email: email,
        idade: idade,
        curso: curso
    };
    usuariosArmazenados.push(novoUsuario);

    // Armazenar o array de usuários no localStorage
    localStorage.setItem("usuariosArmazenados", JSON.stringify(usuariosArmazenados));

    // Limpar os campos do formulário
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("curso").value = "";

    // Focar no campo de nome para facilitar a digitação do próximo nome
    document.getElementById("nome").focus();
}



//função para deletar o nome cadastrado dentro do sessionStorage
function deletarCadastro() {
    // Recuperar o nome do usuário a ser deletado
    var nomeDeletar = prompt("Digite o nome do usuário que deseja deletar:");

    // Se o usuário não fornecer um nome, retornar
    if (!nomeDeletar) {
        return;
    }

    // Procurar o índice do usuário no array
    var indiceUsuario = -1;
    for (var i = 0; i < usuariosArmazenados.length; i++) {
        if (usuariosArmazenados[i].nome === nomeDeletar) {
            indiceUsuario = i;
            break;
        }
    }

    // Se o usuário não foi encontrado, exibir mensagem e retornar
    if (indiceUsuario === -1) {
        alert("Usuário não encontrado.");
        return;
    }

    // Remover o usuário do array (localStorage)
    var usuarioRemovido = usuariosArmazenados.splice(indiceUsuario, 1)[0];

    // Atualizar o localStorage
    localStorage.setItem("usuariosArmazenados", JSON.stringify(usuariosArmazenados));

    alert("Usuário '" + usuarioRemovido.nome + "' deletado com sucesso.");
}
