getItemsFromLocal();
let editing = null;
function handleAddTask() {
  let callingInputEle = document.getElementById("addtask");
  let callingInput = callingInputEle.value;
  let arrayTask = JSON.parse(localStorage.getItem("values"));
  if (callingInput === "") {
    alert("Please enter a valid input");
    return;
  }
  if (arrayTask === null) {
    arrayTask = [];
  }
  if (editing !== null) {
    arrayTask.splice(editing, 1, {
      text: callingInput,
      checked: arrayTask[editing].checked,
    });
    editing = null;
  } else {
    arrayTask.push({
      text: callingInput,
      checked: true,
    });
  }
  localStorage.setItem("values", JSON.stringify(arrayTask));
  getItemsFromLocal();
  callingInputEle.value = "";
}
function getItemsFromLocal() {
  let todoOuterEle = document.getElementById("todoOuter");
  let stringItems = localStorage.getItem("values");
  let parsedItems = JSON.parse(stringItems);
  if (parsedItems === null || parsedItems.length === 0) {
    todoOuterEle.innerHTML = "";
    return;
  }
  let html = "";
  parsedItems.forEach((task, index) => {
    html += `
      <div class="radioButton ${task.checked ? "active" : ""}">
        <div class="input">
          <input type="checkbox" 
            ${task.checked ? "checked" : ""} 
            onchange="toggleCheck(${index})" />
          
          <p class="${task.checked ? "" : "line"}">
            ${task.text}
          </p>
        </div>

        <div class="buttons">
         <button class="firstButton" onClick="editedTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button> <button class="secondButton" onClick="deletedTask(${index})"><i class="ri-delete-bin-6-fill"></i></button>
        </div>
      </div>`;
  });
  todoOuterEle.innerHTML = html;
}

function editedTask(i) {
  let stringItems = JSON.parse(localStorage.getItem("values"));
  let callingInput = document.getElementById("addtask");
  callingInput.value = stringItems[i].text;
  editing = i;
}

function deletedTask(i) {
  let arrayTask = JSON.parse(localStorage.getItem("values"));
  arrayTask.splice(i, 1);
  localStorage.setItem("values", JSON.stringify(arrayTask));
  getItemsFromLocal();
}

function toggleCheck(i) {
  let arrayTask = JSON.parse(localStorage.getItem("values"));
  arrayTask[i].checked = !arrayTask[i].checked;
  localStorage.setItem("values", JSON.stringify(arrayTask));
  getItemsFromLocal();
}
