import * as express from "express"

const app = express()
app.use(express.json())

const livros: {id: string, titulo: string}[] = [
  {"id": "1", "titulo": "Neuromancer"},
  {"id": "2", "titulo": "Jogador número 1"}
]

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('curso de Node')
})

app.get('/livros', (req: express.Request, res: express.Response) => {
  res.status(200).json(livros)
})

app.get('/livros/:id', (req: express.Request, res: express.Response) => {
  const index = buscaLivro(req.params.id)
  res.json(livros[index])
})

app.post('/livros', (req: express.Request, res: express.Response) => {
  livros.push(req.body)
  res.status(201).send('Livro cadastrado com sucesso')
})

app.put('/livros/:id', (req: express.Request, res: express.Response) => {
  const index = buscaLivro(req.params.id)
  livros[index].titulo = req.body.titulo
  res.json(livros)
})

app.delete('/livros/:id', (req: express.Request, res: express.Response) => {
  const {id} = req.params
  const index = buscaLivro(id)
  livros.splice(index, 1)
  res.send(`Livro ${id} removido com sucesso`)
})

function buscaLivro(id: string) {return livros.findIndex((livro) => livro.id === id)}


export default app