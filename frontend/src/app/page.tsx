'use client';


import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, Typography, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Snackbar,
  CircularProgress,
  SnackbarCloseReason
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Alert from '@mui/material/Alert';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', publishYear: '' });
  const [editBook, setEditBook] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(''); // <-- Add this

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);


    const handleDelete = async (id: any) => {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setSuccess('Book deleted successfully!');
        setError('');
        setSnackbarOpen(true);
        fetchBooks();
      } catch (err) {
        setError('Failed to delete book.');
        setSuccess('');
        setSnackbarOpen(true);
      }
   };

  const handleEdit = async () => {
      if (!newTitle.trim()) {
        setError('Title is required.');
        setSuccess('');
        setSnackbarOpen(true);
        return;
      }
      try {
        await axios.put(`http://localhost:5000/api/books/${editBook?._id}`, { title: newTitle });
        setEditBook(null);
        setNewTitle('');
        setSuccess('Book updated successfully!');
        setError('');
        setSnackbarOpen(true);
        fetchBooks();
      } catch (err) {
        setError('Failed to update book.');
        setSuccess('');
        setSnackbarOpen(true);
      }
   };

  const handleAdd = async () => {
      if (!form.title.trim() || !form.author.trim()) {
        setError('Title and Author are required.');
        setSuccess('');
        setSnackbarOpen(true);
        return;
      }
      try {
        await axios.post('http://localhost:5000/api/books', form);
        setForm({ title: '', author: '', publishYear: '' });
        setAddDialogOpen(false);
        setSuccess('Book added successfully!');
        setError('');
        setSnackbarOpen(true);
        fetchBooks();
      } catch (err) {
        setError('Failed to add book.');
        setSuccess('');
        setSnackbarOpen(true);
      }
   };


    const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
 
  return (
    <div style={{ padding: 24 }}>

      {loading ? (
        <Stack alignItems="center" mt={4} mb={4}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
      <Stack spacing={2} direction={'row'} alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4" gutterBottom>Book Management APP</Typography>
        <Button  variant="contained" onClick={() => setAddDialogOpen(true)} sx={{ mb: 4 }}>
          Add Book
        </Button>
      </Stack>

      <TableContainer  sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Year</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book?._id}>
                <TableCell>{book?.title}</TableCell>
                <TableCell>{book?.author}</TableCell>
                <TableCell>{book?.publishYear || 'N/A'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => {
                    setEditBook(book);
                    setNewTitle(book?.title);
                  }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(book._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle >Add Book</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              value={form.title}
              fullWidth
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              label="Author"
              value={form.author}
              fullWidth
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <TextField
              label="Year"
              type="number"
              value={form.publishYear}
              fullWidth
              onChange={(e) => setForm({ ...form, publishYear: Number(e.target.value) })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={!!editBook} onClose={() => setEditBook(null)}>
        <DialogTitle>Edit Title</DialogTitle>
        <DialogContent>
          <TextField
            label="New Title"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditBook(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {error ? (
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {success}
          </Alert>
        )}
      </Snackbar>
      </>
      )}
    </div>
  );
}