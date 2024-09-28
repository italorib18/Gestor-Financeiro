//variaveis gerais
let currentMonth = parseInt(localStorage.getItem('currentMonth')) || 1; 
let ganhos = [];
let gastos = [];

// Função para obter a chave do mês atual
function getKeyForMonth() {
    return `mes_${currentMonth}`;
}

// Função para salvar os dados no localStorage
function salvarDados() {
    const dadosMes = { ganhos, gastos };
    localStorage.setItem(getKeyForMonth(), JSON.stringify(dadosMes));
}

// Função para carregar os dados do mês atual
function carregarDados() {
    const dadosMes = JSON.parse(localStorage.getItem(getKeyForMonth())) || { ganhos: [], gastos: [] };
    
    ganhos = dadosMes.ganhos;
    gastos = dadosMes.gastos;

    // Limpar as divs antes de adicionar os itens do mês
    document.getElementById("resultadoDiv").innerHTML = "";
    document.getElementById("resultadoDiv2").innerHTML = "";

    // Carregar os ganhos e gastos na interface
    ganhos.forEach(ganho => {
        const novoItem = document.createElement("div");
        novoItem.innerHTML = `<strong>Valor:</strong> R$ ${ganho.valor.toFixed(2)} - <strong>Descrição:</strong> ${ganho.descricao}`;
        document.getElementById("resultadoDiv").appendChild(novoItem);
    });

    gastos.forEach(gasto => {
        const novoItem = document.createElement("div");
        novoItem.innerHTML = `<strong>Valor:</strong> R$ ${gasto.valor.toFixed(2)} - <strong>Descrição:</strong> ${gasto.descricao}`;
        document.getElementById("resultadoDiv2").appendChild(novoItem);
    });

    // Atualiza a exibição do mês
    updateMonthDisplay();
}

// Função para adicionar item de ganho
function adicionarItemGanho() {
    const valor = parseFloat(document.getElementById("valorGanhoInput").value);
    const descricao = document.getElementById("descricaoGanhoInput").value;

    if (!isNaN(valor) && descricao !== "") {
        ganhos.push({ valor, descricao });
        const novoItem = document.createElement("div");
        novoItem.innerHTML = `<strong>Valor:</strong> R$ ${valor.toFixed(2)} - <strong>Descrição:</strong> ${descricao}`;
        document.getElementById("resultadoDiv").appendChild(novoItem);

        salvarDados();  // Salva os dados após adicionar o ganho

        // Limpar os campos
        document.getElementById("valorGanhoInput").value = "";
        document.getElementById("descricaoGanhoInput").value = "";
    } else {
        abrirAlerta('Erro', 'Preencha ambos os campos corretamente.');
    }
}

// Função para adicionar item de gasto
function adicionarItemGasto() {
    const valor = parseFloat(document.getElementById("valorGastoInput").value);
    const descricao = document.getElementById("descricaoGastoInput").value;

    if (!isNaN(valor) && descricao !== "") {
        gastos.push({ valor, descricao });
        const novoItem = document.createElement("div");
        novoItem.innerHTML = `<strong>Valor:</strong> R$ ${valor.toFixed(2)} - <strong>Descrição:</strong> ${descricao}`;
        document.getElementById("resultadoDiv2").appendChild(novoItem);

        salvarDados();  // Salva os dados após adicionar o gasto

        // Limpar os campos
        document.getElementById("valorGastoInput").value = "";
        document.getElementById("descricaoGastoInput").value = "";
    } else {
        abrirAlerta('Erro', 'Preencha ambos os campos corretamente.');
    }
}

// Avança o mês
document.getElementById('avança-mes').addEventListener('click', () => {
    if (currentMonth < 12) {
        currentMonth++;
        localStorage.setItem('currentMonth', currentMonth); // Salva o mês atual
        carregarDados();  // Carrega os dados do novo mês
    } else {
        abrirAlerta("Limite de Mês", "Você já está no último mês do ano.");
    }
});

// Volta o mês
document.getElementById('volta-mes').addEventListener('click', () => {
    if (currentMonth > 1) {
        currentMonth--;
        localStorage.setItem('currentMonth', currentMonth); // Salva o mês atual
        carregarDados();  // Carrega os dados do novo mês
    } else {
        abrirAlerta("Limite de Mês", "Você já está no primeiro mês do ano.");
    }
});
// Função para finalizar o mês e exibir na tela

function finalizarMes() {
    const totalGanhos = ganhos.reduce((acc, item) => acc + item.valor, 0);
    const totalGastos = gastos.reduce((acc, item) => acc + item.valor, 0);
    const saldoFinal = totalGanhos - totalGastos;

    abrirAlerta("Resumo do Mês", `Total de Ganhos: R$ ${totalGanhos.toFixed(2)}\nTotal de Gastos: R$ ${totalGastos.toFixed(2)}\nSaldo Final: R$ ${saldoFinal.toFixed(2)}`);
}

// Função para limpar as folhas
function limparFolhas() {
    // Zera os arrays de ganhos e gastos
    ganhos = [];
    gastos = [];

    // Atualiza o localStorage para o mês atual, removendo os dados
    salvarDados();

    // Limpa a exibição das divs de resultado
    document.getElementById("resultadoDiv").innerHTML = "";
    document.getElementById("resultadoDiv2").innerHTML = "";

    abrirAlerta("Limpeza Concluída", "As folhas de ganho e gasto foram limpas.");
}


// Função para abrir a ajuda

function abrirAlerta(titulo = "Como Usar?", mensagem = "Coloque os valores nas respectivas folhas de Ganho e Gasto. Assim que concluir, clique em 'Finalizar Mês' para ver o resultado das suas finanças no mês.") {
    document.getElementById('alertaTitulo').textContent = titulo;
    document.getElementById('alertaMensagem').textContent = mensagem;
    document.getElementById('alertaPersonalizado').style.display = 'block';
}

// Função para fechar a ajuda
function fecharAlerta() {
    document.getElementById('alertaPersonalizado').style.display = 'none';
}

// Função da mensagem de boas vindas
function exibirMensagemBemVindo() {
    abrirAlerta('Bem-vindo! É um prazer ter você aqui!', 'O gestor financeiro foi criado para ajudá-lo(a) a manter suas contas em dias! Sinta-se a vontade para usá-lo!');
}

// Atualiza a exibição do mês
function updateMonthDisplay() {
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    document.getElementById('mes-atual').textContent = meses[currentMonth - 1];
}

// Chama a função ao carregar a página
window.onload = function() {
    carregarDados();  // Carregar os dados do mês (se for o caso)
    exibirMensagemBemVindo();  // Exibir a mensagem de boas-vindas sempre
};


