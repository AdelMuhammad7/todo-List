let theInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let deleteAll = document.getElementById("deleteAll");
let allTasks = document.getElementById("allTasks");
let completed = document.getElementById("completed");
let taskDetails = document.getElementById("taskDetails");
let counter = 0;
let data ;

// local storage
if (localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"))
    counter = data.length
    showTheTask()
    showBtnDeleteAll()
}else {
    data = []
}

// when you open the app focus directly in the input
window.onload = ()=> {
    theInput.focus()
}

// to add the task
function addTask() {
    // if the input empty
    if (theInput.value == "") {
        window.alert("please write your TODO");
    }else {
        // add task to Array >> data
        data[counter] = {
            id: counter,
            name: theInput.value,
            done: false
        };
        counter += 1
        showTheTask()
        showBtnDeleteAll()
    }
    // make input empty after add the task
    theInput.value = "";
    updateLocalStorage()
}

// creats tasks to display it 
function showTheTask () {
   // every time u delete all items shows then you will tasks from Array already saved
   taskList.innerHTML = "" ;
   allTasks.innerHTML = data.length

   let taskCompleted = 0;

    // show tasks from looping in Array >>> data
    for (let i=0 ; i < data.length ; i++) {
        let li = document.createElement("li")
        let div = document.createElement("div")
        let div2 = document.createElement("div")
        let text = document.createElement("span")
        let image = document.createElement("img")

        text.innerHTML = data[i].name

        image.setAttribute("src" , "./images/radio-button-unchecked.svg")
        div2.appendChild(image) 
        div2.appendChild(text) 

        div.innerHTML = 
        `<button onclick='toggle(${i})' >Toggle</button>` +
        `<button onclick='deleteTask(${i})'>Delete</button>`
        
        // make toggle line-throw
        text.style.textDecoration = data[i].done ? "line-through" : "none";
        
        li.appendChild(div2)
        li.appendChild(div)
        taskList.appendChild(li)
        
        if (data[i].done) {
            taskCompleted++;
            image.setAttribute("src" , "./images/checkbox-icon-256x256-lu3j3asn.png")
        }    
    }
    // show tasks completed
    completed.innerHTML = taskCompleted;
    updateLocalStorage()
}

// function to toggle task (complete OR not complete)
function toggle(i) {
    if (!data[i].done) {
      data[i].done = true;
    } else {
      data[i].done = false;
    }
    
    showTheTask();
}

// remove item when click delete
function deleteTask(i) {
    data.splice(i , 1)
    showTheTask()
    counter--
    showBtnDeleteAll()
}

// show button delete All if there are tasks
function showBtnDeleteAll (){
    if (data.length > 0) {
        deleteAll.style.display = "block"
        taskDetails.style.display = "flex"
        
        deleteAll.onclick = ()=> {
            data = []
            showTheTask()
            deleteAll.style.display = "none"
            taskDetails.style.display = "none"
            taskList.innerHTML = "No Tasks Yet"
        }
    }else {
        deleteAll.style.display = "none"
        taskList.innerHTML = "No Tasks Yet"
        taskDetails.style.display = "none"
    }
    updateLocalStorage()
}

showBtnDeleteAll()

// local storage
function updateLocalStorage() {
    localStorage.setItem("data", JSON.stringify(data));
}