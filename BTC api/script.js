document.addEventListener("DOMContentLoaded", function() {
    const btcRateElement = document.getElementById('btcRate');
    const increasedRateElement = document.getElementById('increasedRate');

    const percentageIncrease = 10; // Set the percentage increase here

    // Função para buscar a cotação do BTC na API da CoinGecko
    async function fetchBTCRate() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
            if (!response.ok) {
                throw new Error('A resposta da rede não foi bem-sucedida ' + response.statusText);
            }
            const data = await response.json();
            const btcRate = data.bitcoin.usd;
            const increasedRate = btcRate * (1 + percentageIncrease / 100);

            btcRateElement.textContent = `$${btcRate.toFixed(2)}`;
            increasedRateElement.textContent = `$${increasedRate.toFixed(2)}`;
            btcRateElement.classList.remove('loading', 'error');
            increasedRateElement.classList.remove('loading', 'error');
        } catch (error) {
            console.error('Erro ao buscar a cotação do BTC:', error);
            btcRateElement.textContent = 'Erro ao carregar a cotação';
            increasedRateElement.textContent = 'Erro ao carregar a cotação';
            btcRateElement.classList.add('error');
            increasedRateElement.classList.add('error');
        }
    }

    // Chamar a função fetchBTCRate() inicialmente
    fetchBTCRate();

    // Atualizar a cotação a cada 30 segundos
    setInterval(fetchBTCRate, 30000); // 30 segundos (30000 milissegundos)
});
