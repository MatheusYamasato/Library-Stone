import { Application } from 'express'
import aplicacao from '../src/config/instances/express'

const servidor = async () => {
  const app: Application = await aplicacao.criar()

  const server = app.listen(3000, () => {
    console.log(`✔ API's disponibilizadas em http://localhost:${3000}`)
  })

  process.on('SIGTERM', () => {
    console.log(`Encerrando o servidor com PID ${process.pid}`)
    server.close(() => {
      console.log('Servidor encerrado.')
    })
  })

  return app
}

module.exports = servidor()