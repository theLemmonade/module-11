const express = require('express');
const path = require('path');

module.exports = functions (apps) {
    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, ))
    })
};