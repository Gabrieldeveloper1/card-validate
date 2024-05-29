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
    // Remove todos os espaços e traços
    number = number.replace(/\s+/g, '').replace(/-/g, '');

    // Verifica se o número contém apenas dígitos
    if (!/^\d+$/.test(number)) {
        return false;
    }

    // Implementação do Algoritmo de Luhn
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

// Navegação suave
document.querySelectorAll('.navbar-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});
