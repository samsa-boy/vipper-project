const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключение к базе данных
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Регистрация пользователя
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Хеширование пароля
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Вставка данных в таблицу users
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).send('Ошибка при регистрации');
        }

        // Отправка письма на почту
        const transporter = nodemailer.createTransport({
            service: 'gmail', // или другой почтовый сервис
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Регистрация на сайте',
            text: 'Добро пожаловать на наш сайт!'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send('Ошибка при отправке письма');
            }
            res.status(200).send('Регистрация прошла успешно!');
        });
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});