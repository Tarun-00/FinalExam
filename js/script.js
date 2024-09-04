/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
  const colors = [
    "#F0E68C",
    "#FFDAB9",
    "#FFE4B5",
    "#D8BFD8",
    "#B0E0E6",
    "#AFEEEE",
    "#E0FFFF",
    "#98FB98",
    "#FFDEAD",
    "#F5DEB3",
  ];
  let index = 0;

  const changeBackgroundColor = () => {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length;
  };

  setInterval(changeBackgroundColor, 2000);
});

let enterButton = document.getElementById("enter");
let askUserButton = document.getElementById("askUser");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");

function inputLength() {
  return input.value.trim().length;
}

function listLength() {
  return item.length;
}

function createListElement(taskText) {
  if (taskText) {
    input.value = taskText; // Set the taskText for "Ask User" functionality
  }
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  ul.appendChild(li);
  input.value = "";

  li.addEventListener("click", function () {
    li.classList.toggle("done");
  });

  let dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("X"));
  li.appendChild(dBtn);

  dBtn.addEventListener("click", function () {
    li.remove();
  });
}

function isDuplicateTask(taskText) {
  let tasks = Array.from(document.getElementsByTagName("li")).map((li) =>
    li.textContent.slice(0, -1)
  );
  return tasks.includes(taskText);
}

function addListAfterClick() {
  if (inputLength() > 0 && !isDuplicateTask(input.value.trim())) {
    createListElement();
  } else if (isDuplicateTask(input.value.trim())) {
    alert("This task already exists. Please enter a new task.");
  }
}

function addListAfterKeypress(event) {
  if (
    inputLength() > 0 &&
    event.which === 13 &&
    !isDuplicateTask(input.value.trim())
  ) {
    createListElement();
  } else if (isDuplicateTask(input.value.trim())) {
    alert("This task already exists. Please enter a new task.");
  }
}

function askUserForTasks() {
  let task;
  while (true) {
    task = prompt("Enter a new task:");
    if (task === null || task.trim() === "") {
      break;
    } else if (!isDuplicateTask(task.trim())) {
      createListElement(task.trim());
    } else {
      alert("This task already exists. Please enter a new task.");
    }
  }
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
askUserButton.addEventListener("click", askUserForTasks);
