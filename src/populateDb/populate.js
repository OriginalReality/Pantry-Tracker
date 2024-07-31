// src/utils/addSampleData.js
const { db } = require('../firebaseConfig');
const { doc, setDoc, collection } = require('firebase/firestore');

const addSampleData = async () => {
  const sampleData = {
    Apple: 1,
    Banana: 2,
    Orange: 3,
    Mango: 4,
    Grape: 10,
  };

  try {
    const docRef = doc(collection(db, 'pantry'), 'pantryItems');
    await setDoc(docRef, sampleData);
    console.log('Data written');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

addSampleData();
