document.addEventListener("DOMContentLoaded", function() {

    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = 0;
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);
});

document.getElementById('card-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('card-number').value.trim();
    const result = document.getElementById('result');

    if (cardNumber === '') {
        result.textContent = 'Por favor, insira o número do cartão.';
        result.className = 'warning';
        return;
    }

    if (!/^\d+$/.test(cardNumber.replace(/\s+/g, '').replace(/-/g, ''))) {
        result.textContent = 'O número do cartão deve conter apenas dígitos.';
        result.className = 'error';
        return;
    }

    if (validateCardNumber(cardNumber)) {
        result.textContent = 'Cartão Válido!';
        result.className = 'success';
    } else {
        result.textContent = 'Cartão Inválido!';
        result.className = 'error';
    }
});

function validateCardNumber(number) {
    number = number.replace(/\s+/g, '').replace(/-/g, '');

    if (!/^\d+$/.test(number)) {
        return false;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return (sum % 10) === 0;
}


document.querySelectorAll('.sidebar-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: 'smooth'
        });
    });
});
