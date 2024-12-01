document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();
        document.getElementById('message').innerText = result.message;
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('message').innerText = 'Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.';
    }
});