'use client'
import "../../styles/globals.css";
import { Grid, Paper, Typography, Button } from '@mui/material';

const sampleData = {"Apple": 1, "Banana": 2, "Orange": 3, "Mango": 4, "Grape": 10};

export default function Home() {
  return (
    <main style={{marginTop: '10%'}}>
      <div style={{textAlign: 'center'}}>
        <h1>Pantry Tracker</h1>
        <h1>Search bar</h1>
      </div>
      <Grid container spacing={2} padding='5%'>
        {Object.entries(sampleData).map(([item, count], index) => (
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
