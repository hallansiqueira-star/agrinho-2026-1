/**
 * Jogo de Decisão: O Gestor Sustentável
 * Lógica do jogo construída em JavaScript Puro (Vanilla JS)
 */

// --- BANCO DE DADOS DOS CENÁRIOS (HISTÓRIA) ---
const scenarios = [
    {
        title: "Cenário 1: Uso da Água na Irrigação",
        text: "Uma forte estiagem está prevista. Qual sistema de irrigação você vai implementar na lavoura?",
        options: {
            A: {
                text: "Irrigação por inundação (Mais barata, alta produção imediata, alto desperdício de água).",
                prod: 20,
                sust: -25,
                feedback: "Sua produção subiu, mas os lençóis freáticos da região sofreram um estresse severo."
            },
            B: {
                text: "Gotejamento automatizado (Investimento inicial alto, economia extrema de recursos hídricos).",
                prod: 5,
                sust: 20,
                feedback: "Excelente! Tecnologia aliada ao campo. Uso eficiente da água garante o futuro da região."
            }
        }
    },
    {
        title: "Cenário 2: Controle de Pragas",
        text: "Uma nova lagarta ameaça a plantação de milho de forma agressiva. O que fazer?",
        options: {
            A: {
                text: "Pulverização maciça de defensivos químicos tradicionais de largo espectro.",
                prod: 25,
                sust: -30,
                feedback: "As pragas morreram, mas polinizadores como as abelhas locais foram severamente afetados."
            },
            B: {
                text: "Adotar o Manejo Integrado de Pragas (MIP) usando inimigos naturais e defensivos biológicos.",
                prod: 15,
                sust: 25,
                feedback: "Perfeito! O equilíbrio ecológico barrou a praga sem envenenar o solo e a fauna."
            }
        }
    },
    {
        title: "Cenário 3: Fontes de Energia",
        text: "A fazenda precisa expandir sua estrutura elétrica para os galpões de armazenamento. De onde virá a energia?",
        options: {
            A: {
                text: "Conectar à rede antiga padrão movida a geradores a Diesel auxiliares.",
                prod: 15,
                sust: -15,
                feedback: "Rápido e barato, porém aumentou a pegada de carbono da propriedade rural."
            },
            B: {
                text: "Instalar painéis solares fotovoltaicos aproveitando a área do telhado dos galpões.",
                prod: 10,
                sust: 25,
                feedback: "Inovação limpa! A fazenda agora produz a própria energia de forma limpa."
            }
        }
    }
];

// --- VARIÁVEIS DE ESTADO DO JOGO ---
let currentScenarioIndex = 0;
let stats = { production: 50, sustainability: 50 };
let playerName = "";

// --- SELETORES DO DOM ---
const authSection = document.getElementById("auth-section");
const gameSection = document.getElementById("game-section");
const resultSection = document.getElementById("result-section");

const startForm = document.getElementById("start-form");
const usernameInput = document.getElementById("username");
const nameError = document.getElementById("name-error");
const welcomeText = document.getElementById("dinamic-welcome");

const barProduction = document.getElementById("bar-production");
const barSustainability = document.getElementById("bar-sustainability");
const txtProduction = document.getElementById("txt-production");
const txtSustainability = document.getElementById("txt-sustainability");

const scenarioTitle = document.getElementById("scenario-title");
const scenarioText = document.getElementById("scenario-text");
const optAButton = document.getElementById("opt-A");
const optBButton = document.getElementById("opt-B");

const feedbackContainer = document.getElementById("feedback-container");
const feedbackText = document.getElementById("feedback-text");
const resultContent = document.getElementById("result-content");
const btnRestart = document.getElementById("btn-restart");

// --- RECURSO DIFERENCIAL: MENSAGEM DINÂMICA DE ACORDO COM O HORÁRIO ---
function setDynamicWelcome() {
    const hours = new Date().getHours();
    let greeting = "Olá";
    if (hours >= 5 && hours < 12) greeting = "Bom dia";
    else if (hours >= 12 && hours < 18) greeting = "Boa tarde";
    else greeting = "Boa noite";
    
    welcomeText.textContent = `¡${greeting}, produtor rural! Prepare-se para gerenciar.`;
}

// --- EXECUÇÃO INICIAL ---
setDynamicWelcome();

// --- CONTROLE DE FLUXO E VALIDAÇÃO ---
startForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o recarregamento do HTML
    
    const inputVal = usernameInput.value.trim();
    
    // Validação Avançada via JS
    if (inputVal.length < 3) {
        nameError.style.display = "block";
        return;
    }
    
    nameError.style.display = "none";
    playerName = inputVal;
    
    // Transição de telas
    authSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    
    initGame();
});

function initGame() {
    currentScenarioIndex = 0;
    stats.production = 50;
    stats.sustainability = 50;
    feedbackContainer.classList.add("hidden");
    updateDashboard();
    loadScenario();
}

// --- ATUALIZAÇÃO DA INTERFACE (DOM) ---
function updateDashboard() {
    // Garante travas entre 0 e 100%
    stats.production = Math.max(0, Math.min(100, stats.production));
    stats.sustainability = Math.max(0, Math.min(100, stats.sustainability));

    // Atualiza barras visuais
    barProduction.style.width = `${stats.production}%`;
    barSustainability.style.width = `${stats.sustainability}%`;
    
    // Atualiza texto numérico
    txtProduction.textContent = `${stats.production}%`;
    txtSustainability.textContent = `${stats.sustainability}%`;
}

function loadScenario() {
    if (currentScenarioIndex >= scenarios.length) {
        endGame();
        return;
    }

    const currentScenario = scenarios[currentScenarioIndex];
    scenarioTitle.textContent = currentScenario.title;
    scenarioText.textContent = currentScenario.text;
    
    optAButton.textContent = currentScenario.options.A.text;
    optBButton.textContent = currentScenario.options.B.text;
}

// --- PROCESSAMENTO DA DECISÃO ---
function handleDecision(optionChosen) {
    const currentScenario = scenarios[currentScenarioIndex];
    const decision = currentScenario.options[optionChosen];
    
    // Computa modificadores nas variáveis
    stats.production += decision.prod;
    stats.sustainability += decision.sust;
    
    updateDashboard();
    
    // Exibe feedback contextual animado
    feedbackText.textContent = decision.feedback;
    feedbackContainer.classList.remove("hidden");
    
    // Trava botões temporariamente para o usuário ler o feedback
    optAButton.disabled = true;
    optBButton.disabled = true;

    setTimeout(() => {
        currentScenarioIndex++;
        optAButton.disabled = false;
        optBButton.disabled = false;
        feedbackContainer.classList.add("hidden");
        loadScenario();
    }, 4000); // 4 segundos para leitura do impacto
}

// Eventos de clique nas opções
optAButton.addEventListener("click", () => handleDecision("A"));
optBButton.addEventListener("click", () => handleDecision("B"));

// --- TELA DE RESULTADOS (CRITÉRIO DO TEMA DO AGRINHO) ---
function endGame() {
    gameSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    
    let diagnosisTitle = "";
    let diagnosisDesc = "";
    
    // Lógica de avaliação do balanço (Eixo do tema do concurso)
    const balanceDifference = Math.abs(stats.production - stats.sustainability);
    
    if (stats.production >= 60 && stats.sustainability >= 60 && balanceDifference <= 20) {
        diagnosisTitle = "🏆 Gestor de Elite: Equilíbrio Perfeito!";
        diagnosisDesc = `Parabéns, ${playerName}! Você provou que o 'Agro forte, futuro sustentável' é real. Sua fazenda produz muito mantendo o ecossistema protegido.`;
    } else if (stats.production > stats.sustainability) {
        diagnosisTitle = "🚜 Foco Excessivo em Produção";
        diagnosisDesc = `A fazenda faturou bem, ${playerName}, mas a agressão ao ecossistema cobrará o preço no futuro com solo infértil e falta de água.`;
    } else if (stats.sustainability > stats.production) {
        diagnosisTitle = "🌱 Reserva Ecológica, Baixa Eficiência";
        diagnosisDesc = `A natureza está impecável, ${playerName}, mas a propriedade não gerou alimentos e receita suficientes para se manter forte no mercado.`;
    } else {
        diagnosisTitle = "⚠️ Alerta de Falência Geral";
        diagnosisDesc = `Gestão crítica. Ambos os indicadores caíram para níveis perigosos. Reavalie suas estratégias.`;
    }

    resultContent.innerHTML = `
        <h3>${diagnosisTitle}</h3>
        <p>${diagnosisDesc}</p>
        <div style="margin-top: 1.5rem; text-align: left;">
            <p><strong>Pontuação Final:</strong></p>
            <ul>
                <li>Eficiência de Produção: ${stats.production}%</li>
                <li>Preservação Sustentável: ${stats.sustainability}%</li>
            </ul>
        </div>
    `;
}

// Rein