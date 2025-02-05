const express = require('express');
const app = express();
const PORT = 8080;

const receiptRoutes = require('./api/routes/receipts')

app.use(express.json())
app.use('/receipts', receiptRoutes);



app.listen(
    PORT,
    () => console.log(`Server live at http://localhost:${PORT}`)
)