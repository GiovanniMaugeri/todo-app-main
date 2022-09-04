const input = document.getElementById("input-todo");
const todos = document.getElementById("todos");
const spanitemsLeft = document.getElementById("items-left");

const AllButton = document.getElementsByClassName("All");
const ActiveButton = document.getElementsByClassName("Active");
const CompletedButton = document.getElementsByClassName("Completed");

const clearCompletedButton = document.getElementById("clear-completed");

const sun = document.getElementById("sun")
const moon = document.getElementById("moon")

var itemLeft = 0;
var newText = "";

let source;

fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    Object.entries(json).forEach((elem) => {
      createNewListItem(elem);
    });
  });

function createNewListItem(listItemData) {
  if (!listItemData[1].completed) {
    itemLeft++;
    updateLeft();
  }
  var newLI = document.createElement("li");
  var newI = document.createElement("i");
  var newImg = document.createElement("img");
  // LI
  newLI.classList.add("todo");
  newLI.dataset.completed = listItemData[1].completed;
  newLI.textContent = listItemData[1].text;
  //I
  newI.classList.add("ball");
  newI.innerHTML = '<img src="./images/icon-check.svg" alt="" />';
  newLI.draggable = true;
  newI.addEventListener("click", () => {
    if (newLI.dataset.completed === "false") {
      itemLeft--;
      newLI.dataset.completed = true;
    } else {
      itemLeft++;
      newLI.dataset.completed = false;
    }
    updateLeft();
  });

  // Drag
  newLI.addEventListener("dragstart", (e) => {
    source = e.target;
    console.log(source);
  });

  newLI.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  newLI.addEventListener("drop", (e) => {
    e.target.parentNode.insertBefore(source,e.target.nextSibling);
  });

  // IMG
  newImg.classList.add("self-center", "sm:hidden", "cursor-pointer");
  newImg.src = "./images/icon-cross.svg";
  newImg.addEventListener("click", () => {
    if (newLI.dataset.completed === "false") {
      itemLeft--;
      updateLeft();
    }
    todos.removeChild(newLI);
  });
  newLI.appendChild(newI);
  newLI.appendChild(newImg);

  todos.appendChild(newLI);
}

input.addEventListener("input", () => {
  newText = input.value;
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && newText !== "") {
    createNewListItem([0, { text: newText, completed: false }]);
    input.value = ""
    newText= ""
  }
});

function updateLeft() {
  spanitemsLeft.textContent = itemLeft + " items left";
}

Object.entries(AllButton).forEach((elem) => {
  elem[1].addEventListener("click", (e) => {
    todos.dataset.filter = "All";
    resetAllNav()
    elem[1].classList.add("active")
  });
  
});
Object.entries(ActiveButton).forEach((elem) => {
  elem[1].addEventListener("click", (e) => {
    todos.dataset.filter = "Active";
    resetAllNav()
    elem[1].classList.add("active")
  });   
});
Object.entries(CompletedButton).forEach((elem) => {
  elem[1].addEventListener("click", (e) => {
    todos.dataset.filter = "Completed";
    resetAllNav()
    elem[1].classList.add("active")
  });
});

clearCompletedButton.addEventListener("click", () => {
  [...todos.children].forEach((elem, index) => {
    if (elem.dataset.completed === "true") {
      elem.parentNode.removeChild(elem);
    }
  });
});

function resetAllNav(){
    [...AllButton].forEach(e => e.classList.remove("active"));
    [...ActiveButton].forEach(e => e.classList.remove("active"));
    [...CompletedButton].forEach(e => e.classList.remove("active"))
}


sun.addEventListener("click", () =>{
  console.log(document);
  document.documentElement.classList.remove("dark")
})
moon.addEventListener("click", () =>{
  console.log("click");
  document.documentElement.classList.add("dark")
})