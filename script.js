/**
 * Jogo de Decisão: O Gestor Sustentável
 * Lógica avançada para maior complexidade técnica e interatividade.
 */

// --- BANCO DE DADOS DOS CENÁRIOS RURAIS ---
const scenarios = [
    {
        title: "Uso da Água na Irrigação",
        text: "Uma forte estiagem está prevista para a região. Qual sistema de gerenciamento hídrico você vai implementar na propriedade?",
        options: {
            A: {
                text: "Irrigação por Pivô Central Tradicional. (Menor custo de instalação, alta produção, porém gera alta evaporação e desperdício de recursos).",
                prod: 20,
                sust: -25,
                feedback: "Impacto: A produção disparou a curto prazo, mas os lençóis freáticos locais sofreram queda crítica."
            },
            B: {
                text: "Gotejamento Subterrâneo Automatizado. (Alto investimento em tecnologia, mas direciona a água direto à raiz reduzindo perdas a quase zero).",
                prod: 8,
                sust: 25,
                feedback: "Impacto: Excelente escolha tecnológica! A eficiência hídrica protegeu sua fazenda e o meio ambiente do estresse climático."
            }
        }
    },
    {
        title: "Controle de Pragas e Vetores",
        text: "Uma infestação severa de lagartas ameaça dizimar a safra de grãos. Qual será sua postura operacional?",
        options: {
            A: {
                text: "Aplicação imediata e maciça de defensivos químicos sintéticos de amplo espectro.",
                prod: 25,
                sust: -30,
                feedback: "Impacto: A praga sumiu, mas os polinizadores e abelhas da região foram dizimados, quebrando a biodiversidade."
            },
            B: {
                text: "Uso de Defensivos Biológicos combinados com o Manejo Integrado de Pragas (MIP).",
                prod: 12,
                sust: 20,
                feedback: "Impacto: Fantástico. O ecossistema respondeu bem, combatendo os alvos biológicos sem contaminar o lençol freático."
            }
        }
    },
    {
        title: "Expansão de Matriz Energética",
        text: "Os galpões de beneficiamento precisam de mais energia elétrica para operar os maquinários. Qual fonte escolher?",
        options: {
            A: {
                text: "Instalar geradores robustos movidos a combustão de Óleo Diesel padrão.",
                prod: 20,
                sust: -15,
                feedback: "Impacto: Energia barata e rápida, contudo sua emissão de gases poluentes e pegada de carbono subiram consideravelmente."
            },
            B: {
                text: "Investir em uma mini-usina de Painéis Solares Fotovoltaicos integrados aos telhados.",
                prod: 10,
                sust: 25,
                feedback: "Impacto: Autossuficiência limpa! A fazenda agregou valor ecológico de longo prazo e reduziu custos futuros."
            }
        }
    }
];

// --- VARIÁVEIS DE ESTADO ---
let currentScenarioIndex = 0;
let stats = { production: 50, sustainability: 50 };
let playerName = "";

// --- SELETORES DO DOM DO HTML ---
const authSection = document.getElementById("auth-section");
const gameSection = document.getElementById("game-section");
const resultSection = document.getElementById("result-section");
const startForm = document.getElementById("start-form");
const usernameInput = document.getElementById("username");
const nameError = document.getElementById("name-error");
const welcomeText = document.getElementById("dinamic-welcome");

// Elementos das Barras
const barProduction = document.getElementById("bar-production");
const barSustainability = document.getElementById("bar-sustainability");
const txtProduction = document.getElementById("txt-production");
const txtSustainability = document.getElementById("txt-sustainability");

// Elementos de Cenário
const scenarioTitle = document.getElementById("scenario-title");
const scenarioText = document.getElementById("scenario-text");
const optAButton = document.getElementById("opt-A");
const optBButton = document.getElementById("opt-B");

// Feedbacks e Resultados
const feedbackContainer = document.getElementById("feedback-container");
const feedbackText = document.getElementById("feedback-text");
const resultContent = document.getElementById("result-content");
const btnRestart = document.getElementById("btn-restart");

// --- DIFERENCIAL 1: SAUDAÇÃO INTELIGENTE POR HORÁRIO DO SISTEMA ---
function setDynamicWelcome() {
    const currentHour = new Date().getHours();
    let greeting = "Olá";
    
    if (currentHour >= 5 && currentHour < 12) greeting = "Bom dia";
    else if (currentHour >= 12 && currentHour < 18) greeting = "Boa tarde";
    else greeting = "Boa noite";
    
    welcomeText.textContent = `¡${greeting}, Gestor(a)! Analise os dados com precisão para prosperar.`;
}

// Inicializa a saudação ao carregar a página
setDynamicWelcome();

// --- VALIDAÇÃO E TRANSIÇÃO DE TELAS ---
startForm.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const inputVal = usernameInput.value.trim();
    
    // Validação avançada via JS
    if (inputVal.length < 3) {
        nameError.style.display = "block";
        usernameInput.style.borderColor = "var(--error-color)";
        return;
    }
    
    nameError.style.display = "none";
    playerName = inputVal;
    
    // Animação de sumiço controlada por classe
    authSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    
    initGame();
});

// --- INICIALIZADOR DO ROUND ---
function initGame() {
    currentScenarioIndex = 0;
    stats.production = 50;
    stats.sustainability = 50;
    feedbackContainer.classList.add("hidden");
    updateDashboard();
    loadScenario();
}

// --- ATUALIZAÇÃO DO PAINEL (DOM) ---
function updateDashboard() {
    // Restringe os valores estritamente entre 0 e 100
    stats.production = Math.max(0, Math.min(100, stats.production));
    stats.sustainability = Math.max(0, Math.min(100, stats.sustainability));

    // Atualiza a largura das barras baseado nos dados manipulados
    barProduction.style.width = `${stats.production}%`;
    barSustainability.style.width = `${stats.sustainability}%`;
    
    // Atualiza os contadores em formato de texto
    txtProduction.textContent = `${stats.production}%`;
    txtSustainability.textContent = `${stats.sustainability}%`;
}

// --- CARREGAMENTO DE CENÁRIOS DINÂMICOS ---
function loadScenario() {
    if (currentScenarioIndex >= scenarios.length) {
        endGame();
        return;
    }

    const currentScenario = scenarios[currentScenarioIndex];
    
    // Injeta marcador de turno estruturado (Badge) para melhor usabilidade
    scenarioTitle.innerHTML = `<span class="turn-badge">Decisão ${currentScenarioIndex + 1} de ${scenarios.length}</span><br>${currentScenario.title}`;
    scenarioText.textContent = currentScenario.text;
    
    optAButton.textContent = currentScenario.options.A.text;
    optBButton.textContent = currentScenario.options.B.text;
}

// --- LOGICA DE PROCESSAMENTO DE DECISÕES ---
function handleDecision(optionChosen) {
    const currentScenario = scenarios[currentScenarioIndex];
    const decision = currentScenario.options[optionChosen];
    
    // Modifica as variáveis internas
    stats.production += decision.prod;
    stats.sustainability += decision.sust;
    
    // Atualiza a interface gráfica imediatamente
    updateDashboard();
    
    // Apresenta o bloco de feedback contextual
    feedbackText.textContent = decision.feedback;
    feedbackContainer.classList.remove("hidden");
    
    // Desabilita cliques repetidos durante a animação de leitura
    optAButton.disabled = true;
    optBButton.disabled = true;

    // Transição temporizada para leitura do impacto (3.5 segundos)
    setTimeout(() => {
        currentScenarioIndex++;
        optAButton.disabled = false;
        optBButton.disabled = false;
        feedbackContainer.classList.add("hidden");
        loadScenario();
    }, 3500);
}

// Escutadores de eventos nativos
optAButton.addEventListener("click", () => handleDecision("A"));
optBButton.addEventListener("click", () => handleDecision