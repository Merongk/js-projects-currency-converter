document.addEventListener('DOMContentLoaded', () => {
    const rates = {
        USD: { CAD: 1.25, AUD: 1.30, CNY: 6.50 },
        CAD: { USD: 0.80, AUD: 1.04, CNY: 5.20 },
        AUD: { USD: 0.77, CAD: 0.96, CNY: 4.95 },
    };

    function displayRates() {
        let table = "<table><tr><th>From</th><th>To</th><th>Rate</th></tr>";
        for (let fromCurrency in rates) {
            for (let toCurrency in rates[fromCurrency]) {
                table += `<tr><td>${fromCurrency}</td><td>${toCurrency}</td><td>${rates[fromCurrency][toCurrency]}</td></tr>`;
            }
        }
        table += "</table>";
        document.getElementById("currentRates").innerHTML = table;
    }

    document.getElementById('add-rate-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
        const toCurrency = document.getElementById('toCurrency').value.toUpperCase();
        const rate = parseFloat(document.getElementById('rate').value);
        
        if (!rates[fromCurrency]) {
            rates[fromCurrency] = {};
        }

        rates[fromCurrency][toCurrency] = rate;
        
        console.log('Updated exchange rates:', rates);
        alert(`Added: 1 ${fromCurrency} = ${rate} ${toCurrency}`);
        displayRates();
        document.getElementById('add-rate-form').reset();
    });

    document.getElementById('convert-currency-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('convert-amount').value);
        const sourceCurrency = document.getElementById('sourceCurrency').value.toUpperCase();
        const destinationCurrency = document.getElementById('destinationCurrency').value.toUpperCase();
        
        if (isNaN(amount) || amount <= 0) {
            document.getElementById("result").innerText = "Please enter a valid amount.";
            return;
        }

        if (!rates[sourceCurrency] || !rates[sourceCurrency][destinationCurrency]) {
            document.getElementById("result").innerText = "Conversion rate not available.";
            return;
        }

        const rate = rates[sourceCurrency][destinationCurrency];
        const convertedAmount = amount * rate;
        const now = new Date();
        const date = now.toDateString();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        document.getElementById("result").innerText = `${amount} ${sourceCurrency} = ${convertedAmount.toFixed(4)} ${destinationCurrency}, ${date}, ${hours}:${minutes}`;
        document.getElementById('convert-currency-form').reset();
    });

    document.getElementById('update-rate-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const fromCurrency = document.getElementById('updateFromCurrency').value.toUpperCase();
        const toCurrency = document.getElementById('updateToCurrency').value.toUpperCase();
        const newRate = parseFloat(document.getElementById('newRate').value);

        if (!rates[fromCurrency] || !rates[fromCurrency][toCurrency]) {
            alert("The specified currency conversion does not exist.");
            return;
        }

        if (isNaN(newRate)) {
            alert("Please enter a valid number for the rate.");
            return;
        }

        rates[fromCurrency][toCurrency] = newRate;

        console.log('Updated exchange rates:', rates);
        alert(`Updated: 1 ${fromCurrency} = ${newRate} ${toCurrency}`);
        displayRates();
        document.getElementById('update-rate-form').reset();
    });

    displayRates();
});
