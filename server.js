const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Массив для хранения пользователей (в реальном приложении используйте базу данных)
let users = [];

// Обработка POST-запроса на регистрацию
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Проверка на существование пользователя
    const existingUser  = users.find(user => user.email === email);
    if (existingUser ) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует.' });
    }

    // Добавление нового пользователя
    users.push({ name, email, password });
    res.status(201).json({ message: 'Регистрация успешна!' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});