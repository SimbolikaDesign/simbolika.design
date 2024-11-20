const express = require('express');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago'); // Importa la biblioteca

const app = express();
const PORT = 3000;


// Config de Access Token directamente en el objeto mercadopago
mercadopago.accessToken = 'APP_USR-851629657633151-112002-bf5103980148e4f9a62c4cd42215436c-2109266914'; // mi token

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para crear preferencias de pago
app.post('/create_preference', (req, res) => {
  const preference = {
    items: req.body.items,
    back_urls: {
      success: "https://www.tusitioweb.com/success",
      failure: "https://www.tusitioweb.com/failure",
      pending: "https://www.tusitioweb.com/pending",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      res.json({ id: response.body.id });
    })
    .catch((error) => {
      console.error("Error al crear la preferencia:", error);
      res.status(500).send("Error al crear la preferencia");
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
