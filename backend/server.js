const express = require("express");
const mongoose = require('mongoose');
const Book = require('./models/Book');
const app = express();
const PORT =  5000; 
const cors = require('cors');
app.use(cors()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.json());

const mongoDBURL = 'mongodb://127.0.0.1:27017/mydatabase'; 
app.use(express.json()); 


mongoose.connect(mongoDBURL, {

})
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.error("Connection Error:", err));


 app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/books', async (req, res) => {

  const { title, author, publishYear } = req.body;
  try {
    const newBook = new Book({ title, author, publishYear });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/books/:id', async (req, res) => {
  const { title } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title }, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
   
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

