const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let Livros = [];

app.get('/Livros', (req, res) => {
    res.json(Livros);
});

app.get('/Livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = Livros.find(v => v.id == id);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

app.post('/Livros', (req, res) => {
    const { id, autor, nome, ano } = req.body;
    const livro = { id, autor, nome, ano };
    Livros.push(livro);
    res.status(201).json({ message: 'Livro cadastrado com sucesso.' });
});

app.put('/Livros/:id', (req, res) => {
    const { id } = req.params;
    const { autor, nome, ano } = req.body;
    const livro = Livros.find(v => v.id == id);
    if (livro) {
        livro.autor = autor || livro.autor;
        livro.nome = nome || livro.nome;
        livro.ano = ano || livro.ano;
        res.json({ message: 'Informações do Livro atualizadas com sucesso.' });
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

app.delete('/Livros/:id', (req, res) => {
    const { id } = req.params;
    const livroIndex = Livros.findIndex(v => v.id == id);
    if (livroIndex !== -1) {
        Livros.splice(livroIndex, 1);
        res.json({ message: 'Livro excluído com sucesso.' });
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});



