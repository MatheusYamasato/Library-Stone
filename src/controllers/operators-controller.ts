const OperatorsModel = require('../models/operators-model')
const OperatorsDAO = require('../DAO/operators-dao')

export function operatorsController(app, pool) {
    const DAO = new OperatorsDAO(pool)
    app.get('/operators', (req, res) => {
        DAO.getOperators()
            .then(operators => res.status(200).send(operators.rows))
            .catch(err => res.status(404).send(err))
    })

    app.get('/operators/:id', (req, res) => {
        const { id } = req.params
        DAO.getOperatorById(id)
            .then(operator => res.status(200).send(operator.rows))
            .catch(err => res.status(404).send(err))
    })

    app.put('/operators/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const body = req.body
        DAO.modifyOperator(id, body)
            .then(operator => res.status(200).send(operator))
            .catch(err => res.status(404).send(err))
    })

    app.post('/operators', (req, res) => {
        const body = req.body
        const operator = new OperatorsModel(0, body.name, body.email, body.password, body.type)
        DAO.insertOperator(operator)
            .then(operator => res.status(201).send(operator))
            .catch(err => res.status(404).send(err))
    })

    app.delete('/operators/:id', (req, res) => {
        const id = req.params.id
        DAO.deleteOperator(id)
            .then(operator => res.status(200).send(operator))
            .catch(err => res.status(404).send(err))
    })

    app.post('/operators/login', (req, res) => {
        const body = req.body
        DAO.verifyLogin(body)
            .then(sucess => res.status(200).send(sucess))
            .catch(err => res.status(404).send(err))
    })
}
