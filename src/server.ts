import express from 'express'
import { addTodo, deleteTodo, getTodos } from './mongo'

const app = express()
const port = 8080

app.use(express.json())

app.get('/todos/all', async (req, res) => {
    res.json(await getTodos())
})

app.post('/todos/add', async (req, res) => {
    const data = req.body
    res.json(await addTodo(data))
})

app.delete('/todos/delete', async (req, res) => {
    const data = req.body
    res.json(await deleteTodo(data))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})