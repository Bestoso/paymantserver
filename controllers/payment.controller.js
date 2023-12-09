const mercadopago = require('mercadopago');
const uuid = require('uuid'); // Importa la biblioteca uuid
const HOST = process.env.HOST || 'http://localhost:3000';

// Función para generar un código único
const generateUniqueCode = () => {
  return uuid.v4(); // Utiliza uuid para generar un UUID
};

const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN
    });

    const uniqueCode = generateUniqueCode(); // Genera un código único
    const result = await mercadopago.preferences.create({
        items: [
            {
                title: 'Coderhouse Data Science',
                unit_price: 100,
                quantity: 1,
                currency_id: 'ARS'
            }
        ],
        back_urls: {
            success: `${HOST}/`,
            failure: `${HOST}/`,
            pending: `${HOST}/`,
        },
        notification_url: `${HOST}/api/payment/webhook?source_news=webhooks`,
        external_reference: uniqueCode,
        statement_descriptor: 'CODERHOUSE'
    });

    console.log(result);

    res.send((result.body));
}

const receiveWebhook = async (req, res) => {
    try {
        const payment = req.query;

        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id']);
            console.log(data);
        }
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createOrder, receiveWebhook };
