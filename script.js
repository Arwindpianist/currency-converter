const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');
const fromCurrencySelect = document.getElementById('from');
const toCurrencySelect = document.getElementById('to');
let currencyData;

// Fetch the currency rates on page load
document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://api.freecurrencyapi.com/v1/latest?apikey=wyRe7YbUPUqU0YxDzEUH7irIp3RZuVyScr3aSf6j';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            currencyData = data.data;
            const currencies = Object.keys(currencyData);

            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.text = currency;
                fromCurrencySelect.appendChild(option);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.text = currency;
                toCurrencySelect.appendChild(option2);
            });
        })
        .catch(error => {
            resultDiv.innerHTML = 'An error occurred while fetching the currency rates.';
            console.error(error);
        });
});

convertBtn.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    const fromRate = currencyData[from];
    const toRate = currencyData[to];

    if (fromRate && toRate) {
        const conversionRate = toRate / fromRate;
        const convertedAmount = (amount * conversionRate).toFixed(2);
        resultDiv.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
    } else {
        resultDiv.innerHTML = 'Invalid currency selected.';
    }
});
