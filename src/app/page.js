import Image from "next/image";
import "../../styles/globals.css";
import { Grid, Paper, Typography } from '@mui/material';

const sampleData = {"Apple": 1, "Banana": 2, "Orange": 3, "Mango": 4, "Grape": 10};

export default function Home() {
  return (
    <main style={{marginTop:'10%'}}>
      <h1 style={{textAlign:'center', padding:'2%'}}>Pantry Tracker</h1>
      <Grid container spacing={2} padding={'5%'}>
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
      </Grid>
    </main>
  );
}
