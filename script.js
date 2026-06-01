const btnIniciar = document.getElementById("btnIniciar");
const inicio = document.getElementById("inicio");
const jogo = document.getElementById("jogo");

const boasVindas = document.getElementById("boasVindas");
const erro = document.getElementById("erro");

const lucroEl = document.getElementById("lucro");
const ambientalEl = document.getElementById("ambiental");
const comunidadeEl = document.getElementById("comunidade");

const mensagem = document.getElementById("mensagem");
const anoEl = document.getElementById("ano");

const telaFinal = document.getElementById("final");
const resultado = document.getElementById("resultado");

let lucro = 50;
let ambiental = 50;
let comunidade = 50;

let ano = 1;

btnIniciar.addEventListener("click", iniciarJogo);

function iniciarJogo(){

    const nome = document
        .getElementById("nome")
        .value
        .trim();

    if(nome === ""){
        erro.textContent =
        "Digite seu nome para começar.";
        return;
    }

    boasVindas.textContent =
    `Olá, ${nome}! Administre sua fazenda com sabedoria.`;

    inicio.classList.add("oculto");
    jogo.classList.remove("oculto");
}

const botoes =
document.querySelectorAll(".escolha");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        const opcao =
        botao.dataset.opcao;

        if(opcao === "1"){

            lucro -= 5;
            ambiental += 15;
            comunidade += 10;

            mensagem.textContent =
            "Você investiu em sustentabilidade.";

        }

        if(opcao === "2"){

            lucro += 20;
            ambiental -= 15;
            comunidade -= 10;

            mensagem.textContent =
            "Você priorizou o lucro imediato.";

        }

        if(opcao === "3"){

            lucro += 10;
            ambiental += 10;
            comunidade += 10;

            mensagem.textContent =
            "Você buscou equilíbrio.";

        }

        atualizarPainel();

        ano++;

        if(ano <= 5){

            anoEl.textContent =
            `Ano ${ano}`;

        }else{

            finalizarJogo();

        }

    });

});

function atualizarPainel(){

    lucroEl.textContent = lucro;
    ambientalEl.textContent = ambiental;
    comunidadeEl.textContent = comunidade;

}

function finalizarJogo(){

    jogo.classList.add("oculto");
    telaFinal.classList.remove("oculto");

    const total =
    lucro + ambiental + comunidade;

    if(total >= 240){

        resultado.textContent =
        "🏆 Excelente! Você alcançou o equilíbrio entre produção, comunidade e meio ambiente.";

    }else if(total >= 180){

        resultado.textContent =
        "👍 Boa gestão! Sua fazenda teve resultados positivos.";

    }else{

        resultado.textContent =
        "⚠️ Sua gestão precisa melhorar para garantir um futuro sustentável.";

    }

}