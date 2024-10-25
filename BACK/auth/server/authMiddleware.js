const jwt = require('jsonwebtoken');
const secretKey = 'senha';

function authMiddleware(req, res, next) {
    const token = req.cookies.TokenAuth;

    if (!token) {
        console.log('Token ausente.');
        return res.redirect('/node_api/login');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Token inválido ou expirado.');
            res.clearCookie('TokenAuth');
            return res.redirect('/node_api/login');
        }

        console.log('Token válido.');
        req.user = decoded; // Armazena os dados do token no `req` para uso futuro
        next(); // Continua para a próxima função de middleware ou rota
    });
}

module.exports = authMiddleware;
