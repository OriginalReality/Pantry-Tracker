'use client'
import "../../../styles/globals.css";
import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button, Skeleton, 
         Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { firebaseConfig } from "@/firebaseConfig";
import { doc, getDoc, collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

export default function Home() {
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); 
  const [item, setItem] = useState('');
  const [count, setCount] = useState('');

  const handleClickOpen = () => {
    setOpen(true); 
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAddEntry = () => {
    if (item && count) {
      setItem('');
      setCount('');
      handleClose();
    } else {
      alert('Please fill in both fields');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const docRef = doc(collection(db, 'pantry'), 'pantryItems');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPantryItems(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main style={{ marginTop: '10%' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Pantry Tracker</h1>
          <h1>Search bar</h1>
        </div>
        <Grid container spacing={2} padding='5%'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={3} key={index}>
              <Paper>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={40} />
              </Paper>
            </Grid>
          ))}
          <Grid item xs={3}>
            <Skeleton variant="rectangular" height={50} />
          </Grid>
        </Grid>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ marginTop: '10%' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Pantry Tracker</h1>
          <h1>Search bar</h1>
        </div>
        <Typography color="error" align="center">
          Error: {error}
        </Typography>
      </main>
    );
  }


  return (
    <main style={{marginTop: '10%'}}>
      <div style={{textAlign: 'center'}}>
        <h1>Pantry Tracker</h1>
        <h1>Search bar</h1>
      </div>
      <Grid container spacing={2} padding='5%'>
        {Object.entries(pantryItems).map(([item, count], index) => (
          <Grid item xs={3} key={index}>
            <Paper>
              <Typography variant="h6" component="div" align="center">
                {item}
              </Typography>
              <Typography variant="body1" component="div" align="center">
                {count}
              </Typography>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Entry
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="item"
            label="Item"
            type="text"
            fullWidth
            variant="standard"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <TextField
            margin="dense"
            id="count"
            label="Count"
            type="number"
            fullWidth
            variant="standard"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEntry}>Add</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
