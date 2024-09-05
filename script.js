let taskList = [];
let passWord = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"; ///random ID
let passWordID = "";
let passsWordIndex = 0;
let IdValue = "";
let savedHrs = 0;
let alloHrs = 0;
///handel Add new Task
const handelOnSubmit = (e) => {
  const newForm = new FormData(e);
  const entryList = newForm.get("task");
  const hour = parseInt(newForm.get("hr"));
  const object = { entryList, hour, type: "entry", id: generateID() };
  taskList.push(object);
  displayElmList();
  displayHrs();
};
///Calculate all the total hours
function calculateHrs() {
  const totalHrs = taskList.reduce((acc, item) => acc + item.hour, 0);
  return totalHrs;
}
function displayHrs() {
  const totalHrsElm = document.getElementById("ttlHrs");

  totalHrsElm.innerText = calculateHrs();
}
////Generate random ID
function generateID() {
  for (let i = 0; i < 6; i++) {
    passsWordIndex = Math.floor(Math.random() * passWord.length);
    passWordID += passWord[passsWordIndex];
  }
  return passWordID;
}
////Delete data from good list and bad list
const handleOnDelete = (i) => {
  IdValue = taskList.filter((item) => item.id !== i);
  taskList = IdValue;
  displayElmList();
  displayBadElm();
};
///Switch data from good to bad or bad to good
const handleOnSwitch = (e) => {
  console.log(e);
  IdValue = taskList.filter((item) => item.id == e);
  if (IdValue[0].type == "entry") {
    IdValue[0].type = "bad";
  } else {
    IdValue[0].type = "entry";
  }
  displayBadElm();
  displayElmList();
};
////Display all the Elements(Good)
const displayElmList = () => {
  let str = "";
  const taskListElm = document.getElementById("task1");

  const entryList = taskList.filter((item) => item.type === "entry");

  entryList.map((item, i) => {
    str += `<tr class="" style="border: 2px solid red">
                    <td>${1 + i}</td>
                    <td>${item.entryList}</td>
                    <td>${item.hour}</td>
                    <td class="text-end">
                      <button onClick="handleOnDelete('${
                        item.id
                      }')" class="btn btn-danger">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                      <button onClick="handleOnSwitch('${
                        item.id
                      }','bad')" class="btn btn-success">
                        <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>`;
  });
  taskListElm.innerHTML = str;
};
////Display all the Elements(Bad)
const displayBadElm = () => {
  let str = "";
  const badListElm = document.getElementById("badList");
  const badList = taskList.filter((item) => item.type === "bad");

  badList.map((item, i) => {
    console.log(item);
    str += `
                      <tr class="" style="border: 2px solid red">
                    <td>${item.entryList}</td>
                      <td>${item.hour}</td>
                    <td class="text-end">
                      <button onClick="handleOnDelete('${item.id}')" class="btn btn-danger">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                      <button onClick="handleOnSwitch('${item.id}','bad')" class="btn btn-success">
                        <i class="fa-solid fa-arrow-left"></i>
                      </button>
                    </td>
                  </tr>`;
  });
  badListElm.innerHTML = str;
};
