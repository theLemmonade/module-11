const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

const api = require('./routes/apiRoutes')
const html = require('./routes/htmlRoutes')

app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`)
});