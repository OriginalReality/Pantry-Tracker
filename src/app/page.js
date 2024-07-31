'use client'
import "../../styles/globals.css";
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { firebaseConfig } from "@/firebaseConfig";
import { doc, getDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

export default function Home() {
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(collection(db, 'pantry'), 'pantryItems'); // Reference to your document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPantryItems(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    fetchData();
  }, []);


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
          <Button variant="contained" color="primary" onClick={() => alert('clicked')}>
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </main>
  );
}
