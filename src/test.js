const { db } = require('./firebaseConfig');
const { doc, getDoc, collection } = require('firebase/firestore');

async function test() {
const docRef = doc(collection(db, 'pantry'), 'pantryItems'); // Reference to your document
const docSnap = await getDoc(docRef);
console.log(docSnap)
}
//const citiesRef = collection(db, "cities");
test()