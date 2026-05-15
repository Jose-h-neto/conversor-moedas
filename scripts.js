// Cotação de moedas:
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

// Selecionando os elementos do formulário:
const forms = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount pra receber somente números:
amount.addEventListener("input", () => {

    const hasCharactersRegex = /\D+/g; // Expressão regular para encontrar caracteres não numéricos
    amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Capturando o evento de submit do formulário:
forms.onsubmit = (event) => {
    event.preventDefault(); // Prevenindo o comportamento padrão do formulário

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "U$");
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€");
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, "£");
            break;
    }
}

function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a contação da conversão:
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

        let total = amount * price; // Calculando o valor total da conversão

        if (isNaN(total)) {
            return alert("Por favor, insira um valor válido para a conversão.");
        }

        total = formatCurrencyBRL(total).replace("R$", ""); // Formatando o valor total para o formato de moeda brasileira e removendo o símbolo "R$" para exibir somente o valor numérico.

        result.textContent = `${total} Reais` // Exibindo o resultado total.

        // Aplica a classe que exibe o footer e mostra o resultado da conversão:
        footer.classList.add("show-result");
    } catch (error) {

        // Remove a classe que exibe o footer e mostra uma mensagem de erro:
        footer.classList.remove("show-result");

        console.log(error);
        alert("Ocorreu um erro ao converter a moeda. Por favor, tente novamente.");
    }
}

// Formata o valor para o formato de moeda brasileira (BRL):
function formatCurrencyBRL(value) {
    // Converte o valor para um número para utilizar o método toLocaleString, que formata o número de acordo com as convenções locais, neste caso, "pt-BR" para português do Brasil, e define o estilo como "currency" e a moeda como "BRL":
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}