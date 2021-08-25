const express = require('express')
const path = require('path')
const {v4: uuidv4} = require('uuid')
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname))

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
})
//get notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
})
app.get('/api/notes', (req, res) => {
    let dataBase = fs.readFileSync(path.resolve(__dirname, './Develop/db/db.json'));
    let parsedData = JSON.parse(dataBase);
    res.json(parsedData)
});
app.post('/api/notes', (req, res) => {
    let note = req.body
    note.id = uuidv4();
    let dataBase = fs.readFileSync(path.resolve(__dirname, './Develop/db/db.json'));
    let parsedData = JSON.parse(dataBase);
    parsedData.push(note)
    fs.writeFileSync(path.resolve(__dirname, './Develop/db/db.json'), JSON.stringify(parsedData))
    console.log(parsedData)
});

app.delete('/api/notes/:id', (req, res)=> {
    let dataBase = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Develop/db/db.json')), 'utf8');
    for (let i = 0; i < dataBase.length; i++) {
        let id = dataBase[i].id 
    } 
})
app.listen(PORT, () => {
    console.log(`api server on port ${PORT}`)
})