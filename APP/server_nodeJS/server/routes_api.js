const express = require('express')
const knex = require('./database.js')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secretKey = 'senha'
const { detectLabels } = require('./rekognition')
const multer = require('multer')
const upload = multer()



router.get('/node_api/getToken', async (req, res) => {
    const cookie = req.cookies.TokenAuth
    if (cookie) {
        const info = jwt.verify(cookie,secretKey)
        const usuario = await knex('usuarios').where({ id: info.id }).first()
        res.send(usuario)
    } else {
        console.log('Nenhum cookie encontrado')
        res.send('Nenhum cookie encontrado')
    }
})


//Ver quais animais já foram e quais não foram analisados pelo usuário
router.get('/node_api/getZoodexInfo', async (req, res) => {
    const cookie = req.cookies.TokenAuth
    if (cookie) {
        const info = jwt.verify(cookie,secretKey)
        const lista_analises = await knex('historico').where('usuario_id', info.id)
//        const historico = await knex('animais').whereIn('id', lista_analises)


        const listaAnimalIds = lista_analises.map(analise => analise.animal_id)
        const animaisAnalisados = await knex('animais').whereIn('id', listaAnimalIds)
        const animaisNaoAnalisados = await knex('animais').whereNotIn('id', listaAnimalIds)
        
        res.json({
            analisados: animaisAnalisados,
            naoAnalisados: animaisNaoAnalisados
        })
        
    } else {
        console.log('Nenhum cookie encontrado')
        res.send('Nenhum cookie encontrado')
    }
})


async function verificaHistorico(id_u,id_a) {
    const verificaExiste = await knex('historico').where({animal_id:id_a, usuario_id: id_u})
    if(verificaExiste.length === 0){
        await knex('historico').insert({'animal_id':id_a,'usuario_id': id_u})
        console.log('Histórico atualizado')
    }else{
        console.log('Animal já analisado')
    }
    
}


//Detectar animal presente na foto e salvar/verificar histórico do usuário
router.post('/node_api/detect', upload.single('file'), async (req, res) => {
    try {
        const imageBytes = req.file.buffer // Lê o arquivo enviado
        const labels = await detectLabels(imageBytes) // Chama o serviço Rekognition
        const nomesAnimais = await knex('animais').select('nome_eng')
        const lista_animais = nomesAnimais.map(item => item.nome_eng)
        const cookie = req.cookies.TokenAuth
        const info = jwt.verify(cookie,secretKey)

        for (const i of labels) {
            if (lista_animais.includes(i.Name) && i.Confidence > 89) {
                const result = await knex('animais').where({ nome_eng: i.Name }).first()
                await verificaHistorico(info.id,result.id)
                if (result) {
                    return res.json({
                        nome: result.nome,
                        descricao: result.descricao,
                        confidence: i.Confidence
                    })
                }
            }
        }
        res.status(404).json({ error: 'Animal não identificado ou confiança baixa.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao processar a imagem.' })
    }
})



module.exports = router