const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>Firestore Workshop</h1>`;

const buttonCreateData = document.getElementById("createdata");
buttonCreateData.onclick = createData;

const buttonUpdateData = document.getElementById("updatedata");
buttonUpdateData.onclick = updateData;

const buttonDeleteData = document.getElementById("deletedata");
buttonDeleteData.onclick = deleteData;

const buttonGetAllUsers = document.getElementById("getallusers");
buttonGetAllUsers.onclick = getAll;

const buttonGetUserById = document.getElementById("getuserbyid");
buttonGetUserById.onclick = getByIdUser;

const buttonGetUserByAge = document.getElementById("getuserbyage");
buttonGetUserByAge.onclick = getByAgeAndOrder;

const buttonGetCourseJanuary = document.getElementById("getcoursejanuary");
buttonGetCourseJanuary.onclick = getCourseAndroidJanuary;

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>Firestore Workshop</h1>`;

var firebaseConfig = {
  apiKey: "AAAAA",
  authDomain: "tiendageek-d09be.firebaseapp.com",
  databaseURL: "https://tiendageek-d09be.firebaseio.com",
  projectId: "tiendageek-d09be",
  storageBucket: "tiendageek-d09be.appspot.com",
  messagingSenderId: "650878348908",
  appId: "1:650878348908:web:379f38739cc842938c7249",
  measurementId: "G-L03GFTLFCH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

function createData() {
  db.collection("users").add({
    name: "Pedro",
    lastname: "Torres",
    email: "pedro@gmail.com"
  });

  db.collection("users").add({
    name: "Ana",
    lastname: "Mayorga",
    email: "Ana@gmail.com"
  });

  db.collection("users")
    .doc("14638228")
    .set({
      name: "Ana",
      lastname: "Mayorga",
      email: "Ana@gmail.com"
    });

  db.collection("users")
    .doc("1111111")
    .set({
      name: "Ana",
      lastname: "Mayorga",
      email: "Ana@gmail.com"
    });

  db.collection("courses")
    .doc("android")
    .set({
      name: "Android",
      description: "Android",
      price: 150
    });

  db.collection("courses")
    .doc("android")
    .collection("season")
    .doc("january")
    .set({
      name: "season 1",
      description: "season1",
      users: ["14638228", "1111111"]
    });

  console.log("create data");
}

function updateData() {
  db.collection("users")
    .doc("1111111")
    .update({
      name: "Ana Maria"
    });

  db.collection("users")
    .doc("1111111")
    .set(
      {
        age: 25
      },
      { merge: true }
    );

  console.log("Update Data");
}

function deleteData() {
  db.collection("users")
    .doc("14638228")
    .delete();

  console.log("delete data");
}

async function getAll() {
  const allUsers = await db
    .collection("users")
    .orderBy("name", "desc")
    .get();

  allUsers.forEach(user => {
    console.log(`ID => ${user.id}`);
    console.log(user.data());
  });
}

async function getByIdUser() {
  const user = await db
    .collection("users")
    .doc("191nwXbFRr4YCz0BnQC6")
    .get();

  console.log(user.data());
}

async function getByAgeAndOrder() {
  console.log("User By Age");

  const users = await db
    .collection("users")
    .where("genero", "==", "M")
    .where("age", "==", 26)
    .get()

  users.forEach(user => {
    console.log(`ID => ${user.id}`);
    console.log(user.data());
  });
}

async function getCourseAndroidJanuary() {
  console.log("Get Course Android January");

  const courses = await db
    .collectionGroup("season")
    .get();

  courses.forEach(user => {
    console.log(`ID => ${user.id}`);
    console.log(user.data().users);
  });
}
