import { getAllNotes, createNote, findNote, deleteNote }  from './notes/index.js'
import { login }  from './users/index.js'
import cors from 'cors'
import express from 'express'
const app = express()
app.use(express.json())
app.use(cors())

app.get('/allnotes', async function (req, res) {
    var data = await getAllNotes()
    res.json({result: "Success", data: data})
})

app.post('/createnotes', async function (req, res) {
    var resdata = await createNote(req.body.noteText)
    res.json(resdata)
})

app.get('/findnotes', async function (req, res) {
    var resdata = await findNote(req.query.id)
    res.json(resdata)
})

app.post('/deletenotes', async function (req, res) {
    var resdata = await deleteNote(req.body.id)
    res.json(resdata)
})

app.post('/login', async function (req, res) {
    var data = await login(req.body.user,req.body.pass)
    res.json(data)
})

app.listen(3000)