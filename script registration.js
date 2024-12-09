document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !email || !password) {
        document.getElementById('message').innerText = 'Пожалуйста, заполните все поля.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('message').innerText = result.message;
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('message').innerText = 'Ошибка при отправке данных.';
    }
});