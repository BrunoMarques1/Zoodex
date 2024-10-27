const express = require('express')
const router = express.Router()
const path = require('path')
const authMiddleware = require('./authMiddleware.js')


router.get('/cadastro', (req, res) => res.sendFile(path.join(__dirname, '../public/cadastro.html')))
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../public/login.html')))
router.get('/', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../private/index.html'));
})

module.exports = router