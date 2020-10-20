const taskName = document.getElementById("taskName");
const taskPriorioty = document.getElementById("taskPriority");
const submitButton = document.getElementById("submitBTN");
const taskListUl = document.getElementById("taskList");

submitButton.addEventListener("click", () => {
  taskListUl.innerHTML = "";
  let task = taskName.value;
  let priority = taskPriorioty.value;

  fetch("http://localhost:3000/todolist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: task,
      priority: priority,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success == true) {
        displayTask();
      }
    });
});

//Display pending task

function displayTask() {
  taskListUl.innerHTML = "";
  fetch("http://localhost:3000/todolist")
    .then((response) => response.json())
    .then((tasks) => {
      console.log(tasks);
      let taskdetail = tasks.todoList.map((task) => {
        return `<li class="taskDetail">${task.task} - Priority: ${task.priority}
                <button class="closeBtn" onclick="deleteTask('${task.task}')">&times</button>
                </li>
        `;
      });
      taskListUl.insertAdjacentHTML("beforeend", taskdetail.join(" "));
    });
}
displayTask();

function deleteTask(name) {
  let url = `http://localhost:3000/todolist/${name}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success == true) {
        displayTask();
      }
    });
}
