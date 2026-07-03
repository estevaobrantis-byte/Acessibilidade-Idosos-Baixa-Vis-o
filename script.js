let lendo = false;
let tamanhoPercentual = 100; // Define o tamanho inicial padrão da fonte (100%)

// 1. Função para Aumentar e Diminuir o texto dinamicamente (Botões A+ e A-)
function alterarFonte(acao) {
    const elementosTexto = document.querySelectorAll('.txt-ajustavel');
    
    if (acao === 'mais' && tamanhoPercentual < 140) {
        tamanhoPercentual += 10; // Aumenta de 10 em 10% até o limite de 140%
    } else if (acao === 'menos' && tamanhoPercentual > 90) {
        tamanhoPercentual -= 10; // Diminui até o limite de 90%
    }
    
    // Aplica o novo tamanho para todas as tags com a classe correspondente
    elementosTexto.forEach(elemento => {
        elemento.style.fontSize = `${tamanhoPercentual}%`;
    });
}

// 2. Função Auxiliar para resetar a variável quando a voz terminar sozinha
function finalizarLeitura() {
    lendo = false;
}

// 3. Função Oficial da Aula: Leitor de tela inteligente com Pausa, Retomada e Estabilidade
function lerEmVozAlta() {
    // RESOLUÇÃO DO DESAFIO: Cancela imediatamente qualquer áudio antigo travado no navegador.
    // Colocar este comando na primeira linha blinda o site contra cliques múltiplos rápidos!
    speechSynthesis.cancel();

    // Estrutura Condicional (If/Else): Se já estiver lendo, decide se pausa ou se retoma
    if (lendo === true) {
        if (speechSynthesis.paused === true) {
            speechSynthesis.resume(); // Continua a leitura de onde parou
        } else {
            speechSynthesis.pause(); // Pausa a leitura atual
        }
        return; // Interrompe o código aqui para não criar uma voz repetida por cima
    }

    // Captura de forma automática e limpa todo o texto escrito dentro da tag <main>
    let conteudo = document.querySelector("main");
    let textoCompleto = conteudo.innerText;

    // Configura e prepara a síntese de fala do navegador
    let fala = new SpeechSynthesisUtterance(textoCompleto);
    fala.lang = "pt-BR"; // Define o idioma oficial em português do Brasil
    fala.onend = finalizarLeitura; // Dispara a função de reset quando o áudio chega ao fim

    // Manda o computador executar a fala
    speechSynthesis.speak(fala);

    // Altera o estado da aplicação para controle
    lendo = true;
}
