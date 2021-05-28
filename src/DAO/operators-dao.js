module.exports = class OperatorsDAO {
    
    constructor(pool) {
        this.pool = pool
    }
    
    getOperators() {
        return new Promise((res, rej) => {
            this.pool.query('SELECT  id, name, email, type FROM operators ORDER BY id ASC ',
            (err, operators) => {
                if(err) rej(err) 
                else res(operators) 
            })
        } 
    )}

    getOperatorById(id) {
        return new Promise((res, rej) => {
            this.pool.query('SELECT * FROM operators WHERE id = $1',
            [id],
            (err, operator) => {
                if(err) rej(err)
                else res(operator)
            })
        })
    }

    insertOperator(operator) {
        return new Promise((res, rej) => {
            this.pool.query('INSERT INTO operators (name, email, password, type) VALUES ($1, $2, $3, $4)'
            , [operator.name, operator.email, operator.password, operator.type]
            , (err) => {
                if(err) rej('Falha ao inserir o operador')
                else res('Operador inserido com sucesso')
            })
        })
    }

    modifyOperator(id, body) {
        return new Promise((res, rej) => {
            this.pool.query('UPDATE operators SET name = $1, email = $2, password = $3, type = $4 WHERE id = $5'
            , [body.name, body.email, body.password, body.type, id]
            , (err) => {
                if(err) rej('Falha ao alterar o operador')
                else res('Operador alterado com sucesso')
            })
        })
    }

    deleteOperator(operator) {
        return new Promise((res, rej) => {
            this.pool.query('DELETE * FROM operators WHERE id = $1'
            , [operator]
            , (err) => {
                if(err) rej('Falha ao deletar o operador')
                else res('Operador deletado com sucesso')
            })
        })
    }

    // verifyLogin(body) {
    //     return new Promise((res,rej) => {
    //         this.pool.query('SELECT (password) from operators WHERE email = $1'
    //         , [body.email]
    //         , (err, results) => {
    //             console.log(results.rows[0].password);
    //             if(err) rej(err)
    //             if(results.rows[0].password == body.password) {
    //                 res('Login realizado')
    //             } else {
    //                 rej('Credenciais incorretas')
    //             }
    //         })
    //     })
    // }
}