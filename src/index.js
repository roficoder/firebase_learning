import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

getData();
// get collection data
function getData() {
  getDocs(colRef)
    .then((snapshot) => {
      let tooltips = [];
      snapshot.docs.forEach((tip) => {
        tooltips.push({ ...tip.data(), id: tip.id });
      });
      console.log(tooltips);
      tableContainer.appendChild(createTable(tooltips));
    })
    .catch(() => {
      console.log("Error");
    });
}

function submitData() {
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const link = document.getElementById("link");

  console.log(name, description, link);
}

const tableContainer = document.getElementById("tableContainer");

function createTable(data) {
  const table = document.createElement("table");
  table.classList.add('table', 'table-striped');
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");

  const th = `
  <th>Title</th>
  <th>Description</th>
  <th>Link</th>
  <th>Action</th>
  `;
  headerRow.innerHTML = th;

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table rows
  data.forEach((item) => {
    const row = document.createElement("tr");
    let html = `
    <td>${item.title}</td>
    <td>${item.description}</td>
    <td class="link-cell"><a href="${item.link}">Link</a></td>
    <td><button type="button" class="btn btn-danger"><span class="material-symbols-outlined">delete</span></button><button type="button" class="btn btn-primary"><span class="material-symbols-outlined">edit</span></button></td>
    `;

    row.innerHTML = html
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  return table;
}

const addForm = document.getElementById("addForm");
addForm
  .addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
      title: addForm.name.value,
      description: addForm.description.value,
      link: addForm.link.value,
    });
  })
  .then(() => {
    addForm.reset();
    window.location.replace("http://127.0.0.1:5500/dist/index.html");
    getData();
  })
  .catch(() => {
    console.log("Error");
  });
