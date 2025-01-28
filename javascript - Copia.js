const readlineSync = require('readline-sync');

//Cria a classe Cliente com seus atributos
class Cliente {
    constructor(id, nome, data, cpf, email, senha) {
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.reservas = []; 
    }
}

//Cria a classe Reserva responsável pelas informações de reserva do cliente
class Reserva {
    constructor(id, id_cliente, status, check_in, check_out) {
        this.id = id;
        this.id_cliente = id_cliente;
        this.status = status;
        this.check_in = check_in;
        this.check_out = check_out; 
    }
}

//Cria a classe Funcionario com seus atributos
class Funcionario {
    constructor(id, nome, cpf, email, senha) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

//Cria a classe Quartos com seus atributos
class Quartos {
    constructor(camas, preco, disponibilidade, nome, descricao) {
        this.camas = camas;
        this.preco = preco; 
        this.disponibilidade = disponibilidade;
        this.nome = nome;
        this.descricao = descricao;
    }
}

//Cria a classe Sistema onde a interação com alguém será feita
class Sistema {
    constructor() {
        this.Clientes = [];
        this.Funcionarios = [];
        this.Reservas = [];
        this.Quartos = [];
        this.usuario = null;
        this.Avaliacoes = []
    }

    inicio() {
        console.log("\n" + "=".repeat(40));
        console.log("\nBem-vindo ao sistema do hotel F-Luxo!!! Vamos comecar?\n");
        console.log("\n" + "=".repeat(40));
        console.log("1- Fazer Login");
        console.log("2- É novo por aqui? Fazer Cadastro");
        console.log("3- Sair\n");

        let opcao = readlineSync.question("Digite um numero: ");

        switch (opcao) {
            case "1":
                this.fazerLogin();
                break;
            case "2":
                this.fazerCadastro();
                break;
            case "3":
                console.log("Saindo");
                process.exit();
                break;
            default:
                console.log("Opcao invalida. Tente novamente");
                this.inicio();
                break;
        }
    }
//Funcao responsavel por fazer login tanto do cliente, quanto do funcionario. Utiliza loop, if e else para validar o login
    fazerLogin() {
        console.log("\n" + "=".repeat(40));
        let cpf = readlineSync.question("Digite seu CPF: ");
        let senha = readlineSync.question("Digite sua senha: ", { hideEchoBack: true });
        let Cliente = null;
        let Funcionario = null;

        for (let i = 0; i < this.Clientes.length; i++) {
            let c = this.Clientes[i];
            if (c.cpf === cpf && c.senha === senha) {
                Cliente = c;
                break;
            }
        }
        for (let i = 0; i < this.Funcionarios.length; i++) {
            let f = this.Funcionarios[i];
            if (f.cpf === cpf && f.senha === senha) {
                Funcionario = f;
                break;
            }
        }

        if (Cliente) {
            this.usuario = Cliente;
            console.log(`Bem-vindo, ${Cliente.nome}!`);
            this.menuCliente();
        } 
        else if (Funcionario) {
            this.usuario = Funcionario;
            console.log(`Bem-vindo, ${Funcionario.nome}!`);
            this.menuFuncionario();
        } 
        else {
            console.log("CPF ou senha incorretos. Tente novamente ou faca um cadastro.");
            this.inicio();
        }
    }
//Funcao responsavel pelo cadastro tanto de clientes quanto de funcionarios. Utiliza um switch e cria objetos das classes cliente e funcionario
    fazerCadastro() {
        console.log("\n" + "=".repeat(40));
        console.log("\nCadastro F-Luxo\n");
        console.log("\n" + "=".repeat(40));
        console.log("1 - Sou cliente");
        console.log("2 - Sou funcionario");
        let opcao = readlineSync.question("Digite um numero: ");

        switch (opcao) {
            case "1":
                console.log("\n" + "=".repeat(40));
                console.log("\nCadastro de cliente:");
                console.log("\n" + "=".repeat(40));
                let nome = readlineSync.question("Nome: ");
                let data = readlineSync.question("Data de nascimento: ");
                let cpf = readlineSync.question("CPF: ");
                let email = readlineSync.question("Email: ");
                let senha = readlineSync.question("Senha: ", { hideEchoBack: true });

                let novoCliente = new Cliente(this.Clientes.length + 1, nome, data, cpf, email, senha);
                this.Clientes.push(novoCliente);

                console.log("Cadastro realizado com sucesso!");
                this.inicio();
                break;

            case "2":
                console.log("\n" + "=".repeat(40));
                console.log("\nCadastro de funcionario:");
                console.log("\n" + "=".repeat(40));
                Funcionario.nome = readlineSync.question("Nome: ");
                Funcionario.cpf = readlineSync.question("CPF: ");
                Funcionario.email = readlineSync.question("Email: ");
                Funcionario.senha = readlineSync.question("Senha: ", { hideEchoBack: true });

                let novoFuncionario = new Funcionario(this.Funcionarios.length + 1, Funcionario.nome, Funcionario.cpf, Funcionario.email, Funcionario.senha);
                this.Funcionarios.push(novoFuncionario);

                console.log("Cadastro finalizado com sucesso!");
                this.inicio();
                break;

            default:
                console.log("Opcao invalida. Tente novamente.");
                this.fazerCadastro();
                break;
        }
    }
//Funcao responsavel por adicionar um quarto. Utiliza variaveis que sao determinadas por inputs e depois adiciona o quarto a uma lista
    adicionarQuarto() {
        let nome = readlineSync.question("Nome do quarto: ");
        let camas = readlineSync.questionInt("Numero de camas: ");
        let preco = readlineSync.questionFloat("Preço por noite: ");
        let disponibilidade = true
        let descricao = readlineSync.question("Descricao: ");

        let novoQuarto = new Quartos(camas, preco, disponibilidade, nome, descricao);
        this.Quartos.push(novoQuarto);
        console.log("Quarto adicionado com sucesso!");
    }
//Funcao responsavel por fazer a reserva, utiliza if para validar se há quartos, caso haja, utiliza loop para mostrar os quartos disponiveis. Tambem recebe o check-in e check-out 
    fazerReserva() {
        console.log("\n" + "=".repeat(40));
        console.log("\nFazendo sua reserva");
        console.log("\n" + "=".repeat(40));
    
        if (this.Quartos.length === 0) {
            console.log("Nao temos quartos disponiveis no momento.");
            this.menuCliente();
            return;
        }
    
        console.log("Quartos disponiveis:");
        for (let i = 0; i < this.Quartos.length; i++) {
            let Quarto = this.Quartos[i];
            if (Quarto.disponibilidade) { 
                console.log(
                    `Quarto ${i + 1}: Nome: ${Quarto.nome}, Camas: ${Quarto.camas}, Preco: R$ ${Quarto.preco}, Descricao: ${Quarto.descricao}`
                );
            }
        }
    
        let opcao = readlineSync.question("Digite o numero do quarto que deseja reservar: ") - 1;
    
        if (opcao < 0 || opcao >= this.Quartos.length || !this.Quartos[opcao].disponibilidade) {
            console.log("Opçao invalida ou quarto indisponivel. Tente novamente.");
            this.fazerReserva();
            return;
        }
    
        let quartoEscolhido = this.Quartos[opcao];
    
        let check_in = readlineSync.question("Digite a data de check-in (DD/MM/AAAA): ");
        let check_out = readlineSync.question("Digite a data de check-out (DD/MM/AAAA): ");
    
        let novaReserva = new Reserva(this.Reservas.length + 1, this.usuario.id, "Pendente", check_in, check_out);
        this.Reservas.push(novaReserva);
        this.usuario.reservas.push(novaReserva);

        quartoEscolhido.disponibilidade = false;
    
        console.log("Reserva realizada com sucesso!");  
    }
//Funcao responsavel por cancelar uma reserva. A funcao usa um loop para ver as reservas de um determinado cliente e entao da a escolha de qual reserva ele deseja cancelar.
    cancelarReserva(){
        if(this.usuario.reservas.length === 0){
            console.log("Voce nao tem reservas para cancelar.");
            this.menuCliente();
            return;
        }
        console.log("Suas reservas:");
        for (let i = 0; i < this.usuario.reservas.length; i++){
            let reserva = this.usuario.reservas[i];
            console.log(`${i + 1}. Reserva ID: ${reserva.id}, Check-in: ${reserva.check_in}, Check-out: ${reserva.check_out}, Status: ${reserva.status}`);
        }
        let opcao = readlineSync.question("Digite o numero da reserva que deseja cancelar: ") - 1;
        if (opcao <0 || opcao >= this.usuario.reservas.length){
            console.log("Opcao invalida.");
            return;
        }
        let reservaCancelada = this.usuario.reservas.splice(opcao, 1)[0];
        console.log(`Reserva ID ${reservaCancelada.id} foi cancelada com sucesso!`)
        
    }
//Funcao que retorna o id de um cliente em funcao do seu cpf
    getId_cliente(){
        let cpfCliente = readlineSync.question("Digite o cpf do cliente: ");
        let clienteEncontrado = null;

        for (let i = 0; i < this.Clientes.length; i++){
            let cliente = this.Clientes[i];
            if (cliente.cpf === cpfCliente) {
                clienteEncontrado = cliente;
                break;
            }
        }
        return clienteEncontrado.id;
    }
//Funcao responsavel por mudar o status de uma reserva. Usa getId_cliente para passar pela lista de reservas de um cliente especifico por meio de um loop e entao da a escolha de mudar o status
    mudarStatus_reserva() {
        let clienteId = this.getId_cliente();
    
        if (!clienteId) {
            console.log("Cliente nao encontrado. Tente novamente.");
            return;
        }

        let reservasDoCliente = [];
        for (let i = 0; i < this.Reservas.length; i++) {
            if (this.Reservas[i].id_cliente === clienteId) {
                reservasDoCliente.push(this.Reservas[i]);
            }
        }
    
        if (reservasDoCliente.length === 0) {
            console.log("Esse cliente nao possui reservas.");
            return;
        }
    
        console.log("\nReservas do cliente:");
        for (let i = 0; i < reservasDoCliente.length; i++) {
            let reserva = reservasDoCliente[i];
            console.log(
                `${i + 1}. Reserva ID: ${reserva.id}, Status: ${reserva.status}, Check-in: ${reserva.check_in}, Check-out: ${reserva.check_out}`
            );
        }
    
        let opcaoReserva = readlineSync.questionInt("Digite o numero da reserva que deseja alterar: ") - 1;
    
        if (opcaoReserva < 0 || opcaoReserva >= reservasDoCliente.length) {
            console.log("Opcao invalida. Tente novamente.");
            return;
        }
    
        let reservaSelecionada = reservasDoCliente[opcaoReserva];
        console.log("\n" + "=".repeat(40));
        console.log("\nStatus disponíveis:");
        console.log("\n" + "=".repeat(40));
        console.log("1. Pendente");
        console.log("2. Adiada");
        console.log("3. Realizada");
        console.log("4. Cancelada");
    
        let opcaoStatus = readlineSync.questionInt("Digite o numero do novo status: ");
    
        let novoStatus;
    
        switch (opcaoStatus) {
            case 1:
                novoStatus = "Pendente";
                break;
            case 2:
                novoStatus = "Adiada";
                break;
            case 3:
                novoStatus = "Realizada";
                break;
            case 4:
                novoStatus = "Cancelada";
                break;
            default:
                console.log("Opcao invalida. Tente novamente.");
                return;
        }
    
        reservaSelecionada.status = novoStatus;
        console.log(`O status da reserva ID ${reservaSelecionada.id} foi atualizado para: ${novoStatus}`);
    }
//Funcao responsavel pelo menu do cliente. Utiliza console.log para criar uma interface onde o cliente podera navegar pelas funcoes por meio de um switch 
    menuCliente() {
        console.log("\n" + "=".repeat(40));
        console.log("\nMenu do Cliente:");
        console.log("\n" + "=".repeat(40));
        console.log("1. Ver meus dados");
        console.log("2. Ver lista de quartos");
        console.log("3. Fazer reserva");
        console.log("4. Cancelar reserva");
        console.log("5. Ver minhas reservas");
        console.log("6. Sair do menu");

        let opcao = readlineSync.question("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                console.log(this.usuario);
                this.menuCliente();
                break;
            case "2":
                console.log(this.Quartos);
                this.menuCliente();
                break;
            case "3":
                this.fazerReserva();
                this.menuCliente();
                break;
            case "4":
                this.cancelarReserva();
                this.menuCliente();
                break;
            case "5":
                console.log(this.usuario.reservas || "Voce ainda nao tem reservas.");
                this.menuCliente();
                break;
            case "6":
            //sistema de avaliacao do hotel. A avaliacao é armazenada em uma lista
                console.log("\n" + "=".repeat(40));
                console.log("\nAvalie sua estadia!\n");
                console.log("\n" + "=".repeat(40));
                console.log("1. Péssimo");
                console.log("2. Ruim");
                console.log("3. Razoável");
                console.log("4. Boa");
                console.log("5. Excelente");

                let nota = readlineSync.questionInt("Digite uma numero: ");

                if (nota < 1 || nota > 5) {
                    console.log("Nota invalida. Tente novamente.");
                    this.avaliarEstadia();
                    return;
                }
                this.Avaliacoes.push({
                    nome: this.usuario.nome, 
                    cpf: this.usuario.cpf,
                    nota: nota
                });

                console.log("\nObrigado por avaliar sua estadia!");
                this.menuCliente();
                
            case "7":
                console.log("Logout realizado com sucesso!");
                this.usuario = null;
                this.inicio();
                break;
            default:
                console.log("Opcao invalida. Tente novamente.");
                this.menuCliente();
                break;
        }
    }
//Funcao que permite que o funcionario veja as avaliacoes e o cpf atrelado a elas
    visualizarAvaliacoes() {
        console.log("\n" + "=".repeat(40));
        console.log("\nAvaliações dos Clientes:\n");
        console.log("\n" + "=".repeat(40));

        if (this.Avaliacoes.length === 0) {
            console.log("Nenhuma avaliação disponível no momento.");
        } else {
            for (let i = 0; i < this.Avaliacoes.length; i++) {
                const avaliacao = this.Avaliacoes[i];
                console.log(
                    `${i + 1}. Nome: ${avaliacao.nome}, CPF: ${avaliacao.cpf}, Nota: ${avaliacao.nota}`
                );
            }
        }

        this.menuFuncionario();
    }
//Essa funcao é responsavel pelo meno do funcionario. Utiliza console.log para criar uma interface interativa e switch para escolher as opcoes
    menuFuncionario() {
        console.log("\n" + "=".repeat(40));
        console.log("\nMenu do Funcionario:");
        console.log("\n" + "=".repeat(40));
        console.log("1. Ver meus Dados");
        console.log("2. Ver Lista de Reservas");
        console.log("3. Ver Lista de Quartos");
        console.log("4. Ver Lista de Clientes");
        console.log("5. Mudar Status da Reserva");
        console.log("6. Adicionar Quarto");
        console.log("7. Ver Lista de Avaliacoes")
        console.log("8. Sair");

        let opcao = readlineSync.question("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                console.log(this.usuario);
                this.menuFuncionario();
                break;
            case "2":
                console.log(this.Reservas);
                this.menuFuncionario();
                break;
            case "3":
                console.log(this.Quartos);
                this.menuFuncionario();
                break;
            case "4":
                console.log(this.Clientes);
                this.menuFuncionario();
                break;
            case "5":
                this.mudarStatus_reserva();
                this.menuFuncionario();
                break;
            case "6":
                this.adicionarQuarto();
                this.menuFuncionario();
                break;
            case "7":
                this.visualizarAvaliacoes();
                this.menuFuncionario();
                break;
            case "8":
                console.log("Logout realizado com sucesso!");
                this.usuario = null;
                this.inicio();
                break;
            default:
                console.log("Opcao invalida. Tente novamente.");
                this.menuFuncionario();
                break;
        }
    }
}

//Inicialização do sistema
let sistema = new Sistema();
sistema.inicio();
