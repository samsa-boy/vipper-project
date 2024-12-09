const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    secure: false, // true для 465, false для других портов
    auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS,
    },
});

// Обработчик регистрации
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Здесь должна быть логика для сохранения пользователя в базе данных
    // Например:
    const newUser  = await User.create({ name, email, password });

    // Отправка электронного письма
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS_FROM,
        to: email,
        subject: 'Добро пожаловать!',
        text: `Здравствуйте, ${name}! Спасибо за регистрацию.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'Регистрация успешна! Проверьте вашу почту для подтверждения.' });
    } catch (error) {
        console.error('Ошибка при отправке письма:', error);
        res.status(500).json({ message: 'Ошибка при регистрации. Попробуйте еще раз.' });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});