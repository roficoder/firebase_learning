import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZFLK53alqSt6_vck9MI55HCd1dFRp7L0",
  authDomain: "test-9add3.firebaseapp.com",
  databaseURL: "https://test-9add3-default-rtdb.firebaseio.com",
  projectId: "test-9add3",
  storageBucket: "test-9add3.appspot.com",
  messagingSenderId: "427239727034",
  appId: "1:427239727034:web:146e3ee2eb0d0d3f2d4783",
};

initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "tooltips");

// get collection data
getDocs(colRef).then((snapshot) => {
  let tooltips = [];
  snapshot.docs.forEach((tip)=>{
    tooltips.push({...tip.data(), id: tip.id})
  })
  console.log(tooltips);
}).catch(()=>{
  console.log('Error');
})
