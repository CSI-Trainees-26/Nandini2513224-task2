// date and time part
function gettodaysdate() {
    let today = new Date();
    let year= today.getFullYear();
    let month= today.getMonth() +1;
    let day= today.getDate();

    if (month <10) {
        month= "0"+month;
    }
    if (day <10) {
        day="0"+day;
    }

    return year + "-" + month + "-" + day;
}

function updateclock() {
    const now= new Date();
    const days= ["Monday", "Tueaday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    let dayname = days[now.getDay()];
    let date=now.getDate();
    let monthname= months[now.getMonth()];
    let year=now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    let dayElement = document.getElementById("day");
    let dateElement = document.getElementById("date");
    let clockElement = document.getElementById("clock");

    if (dayElement) {
        dayElement.textContent = dayname;
    }
    if (dateElement) {
        dateElement.textContent =
            date + " " + monthname + " " + year;
    }
    if (clockElement) {
        clockElement.textContent =
            hours + ":" + minutes + ":" + seconds;
    }

    let monthElement = document.getElementById("currentMonth");
    let dashboardMonth =
        document.getElementById("dashboardMonth");

    if (monthElement) {
        monthElement.textContent =
            monthname + " " + year;
    }
    if (dashboardMonth) {
        dashboardMonth.textContent =
            monthname + " " + year;
    }

}    

updateclock();
setInterval(updateclock, 1000);

// tasks part
let tasks= JSON.parse(localStorage.getItem("fitcheckTasks")) || [];

function savetasks() {
    localStorage.setItem("fitcheckTasks",JSON.stringify(tasks));
}
function displaytasks() {
    let pendingtasks=document.getElementById("pendingtasks");
    let completedtasks=document.getElementById("completedtasks");

    if (!pendingtasks || !completedtasks) {
        return;
    }

    pendingtasks.innerHTML="";
    completedtasks.innerHTML="";

    let pendingCount=0;
    let completedCount=0;

    for (let i=0; i<tasks.length;i++) {
        let task=task[i];
        let taskBox= document.createElement("div");
        taskBox.className="task-item";
        taskBox.setAttribute("draggable", "true");
        taskBox.setAttribute("data-index", i);
        if (task.completed) {
            taskBox.classList.add("completed");
        }

        let checkBox= document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked=task.completed;
        checkBox.addEventListener("change",function() {
            tasks[i].completed=checkBox.checked;
            savetasks();
            displaytasks();
        });

        let taskText=document.createElement("p");
        taskText.textContent=task.text;
        let editButton= document.createElement("button");
        editButton.textContent="✎";
        editButton.className="edit-button";
        editButton.addEventListener("click",function(){
            let newText= prompt("edit your task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                tasks[i].text=newText.trim();
                savetasks();
                displaytasks();
            }
        });

        let deletebutton=document.createElement("button");
        deletebutton.textContent="x";
        deletebutton.className="delete-button";
        deletebutton.addEventListener("click",function() {
            tasks.splice(i,1);
            savetasks();
            displaytasks();
        });

        taskBox.appendChild(checkBox);
        taskBox.appendChild(taskText);
        taskBox.appendChild(editButton);
        taskBox.appendChild(deleteButton);
        
        taskBox.addEventListener("dragstart",function() {
            textBox.classList.add("dragging");
            textBox.setAttribute("data-drag-index",i);
        });
        taskBox.addEventListener("dragend",function() {
            taskBox.classList.remove("dragging");
        });

        if(task.completed) {
            completedtasks.appendChild(taskBox);
            completedCount++;
        }
        else {
            pendingtasks.appendChild(taskBox);
            pendingCount++;
        }

        document.getElementById("pendingCount").textContent=pendingCount;
        document.getElementById("completedCount").textContent=completedCount;

        let addTaskButton = document.getElementById("addTaskButton");
        if (addTaskButton) {
            addTaskButton.addEventListener("click", function () {
                let taskInput = document.getElementById("taskInput");
                let taskText = taskInput.value.trim();
                if (taskText === "") {
                    alert("Please enter a task.");
                    return;
                }
                let newTask = {
                    text: taskText,
                    completed: false
                };

                tasks.push(newTask);
                savetasks();
                taskInput.value = "";
                displaytasks();
        });
        
        let pendingTaskArea =document.getElementById("pendingTasks");
        let completedTaskArea =document.getElementById("completedTasks");
        if (pendingTaskArea) {
            pendingTaskArea.addEventListener("dragover",function(event) {
                event.preventDefault();
            });
        pendingTaskArea.addEventListener("drop", function(event) {
            event.preventDefault();
            
            let index =event.target.closest(".task-item")?.getAttribute("data-drag-index");
            if (index !== null && index !== undefined) {
                tasks[index].completed = false;
                savetasks();
                displaytasks();
            }

        });

    }

    if (completedTaskArea) {
        completedTaskArea.addEventListener("dragover", function (event) {
            event.preventDefault();
        });
        completedTaskArea.addEventListener("drop", function (event) {
            event.preventDefault();
            let index =event.target.closest(".task-item")?.getAttribute("data-drag-index");
            if (index !== null && index !== undefined) {
                tasks[index].completed = true;
                savetasks();
                displaytasks();
            }
        });
    }
    displaytasks();
        }

    let pendingTaskArea =document.getElementById("pendingTasks");
    let completedTaskArea =document.getElementById("completedTasks");
    if (pendingTaskArea) {
        pendingTaskArea.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        pendingTaskArea.addEventListener("drop", function (event) {
            event.preventDefault();
            let index =event.target.closest(".task-item")?.getAttribute("data-drag-index");
            if (index !== null && index !== undefined) {
                tasks[index].completed = false;
                savetasks();
                displaytasks();
            }
        });
    }
    if (completedTaskArea) {
        completedTaskArea.addEventListener("dragover", function (event) {
            event.preventDefault();
        });
        completedTaskArea.addEventListener("drop", function (event) {
            event.preventDefault();
            let index =event.target.closest(".task-item")?.getAttribute("data-drag-index");
            if (index !== null && index !== undefined) {
                tasks[index].completed = true;
                savetasks();
                displaytasks();
            }
        });
    }
    displaytasks();
}
}

// habits part

let habits =JSON.parse(localStorage.getItem("fitcheckHabits")) || [];
function saveHabits() {
    localStorage.setItem("fitcheckHabits",JSON.stringify(habits));
}

function getNumberOfDays() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    return new Date(year, month + 1, 0).getDate();
}

function createHabitTable() {
    let header =document.getElementById("habitHeader");
    let body =document.getElementById("habitBody");

    if (!header || !body) {
        return;
    }

    header.innerHTML = "<th>Habit</th>";
    body.innerHTML = "";

    let numberOfDays = getNumberOfDays();

    for (let day = 1; day <= numberOfDays; day++) {
        let heading = document.createElement("th");
        heading.textContent = day;
        header.appendChild(heading);
    }

    for (let i = 0; i < habits.length; i++) {
        let habit = habits[i];
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let nameBox = document.createElement("div");
        nameBox.className = "habit-name";
        let nameText = document.createElement("span");
        nameText.textContent = habit.name;
        let deleteButton =
            document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", function () {
            habits.splice(i, 1);
            saveHabits();
            createHabitTable();
            showWeeklyHabitProgress();
        });

        nameBox.appendChild(nameText);
        nameBox.appendChild(deleteButton);
        nameCell.appendChild(nameBox);
        row.appendChild(nameCell);

        for (let day = 1; day <= numberOfDays; day++) {
            let cell = document.createElement("td");
            cell.className = "habit-box";
            cell.textContent = "";
            if (habit.days && habit.days[day]) {
                cell.classList.add("done");
                cell.textContent = "✓";
            }

            cell.addEventListener("click", function () {
                if (!habit.days) {
                    habit.days = {};
                }
                if (habit.days[day]) {
                    habit.days[day] = false;
                } 
                else {
                    habit.days[day] = true;
                }
                 saveHabits();
                createHabitTable();
                showWeeklyHabitProgress();
            });
            row.appendChild(cell);
        }
        body.appendChild(row);
    }
}

let addHabitButton =document.getElementById("addHabitButton");
if (addHabitButton) {
    addHabitButton.addEventListener("click", function () {
        let habitInput =
            document.getElementById("habitInput");
        let habitName =
            habitInput.value.trim();
        if (habitName === "") {
            alert("Please enter a habit.");
            return;
        }
        let newHabit = {
            name: habitName,
            days: {}
        };
        habits.push(newHabit);
        saveHabits();
        habitInput.value = "";
        createHabitTable();
        showWeeklyHabitProgress();
    });
}

function showWeeklyHabitProgress() {
    let progressArea =
        document.getElementById("weeklyHabitProgress");
    if (!progressArea) {
        return;
    }
    progressArea.innerHTML = "";
    let today = new Date();
    let currentDay = today.getDate();
    let startDay = currentDay - today.getDay();
    if (startDay < 1) {
        startDay = 1;
    }
    for (let i = 0; i < habits.length; i++) {
        let habit = habits[i];
        let completed = 0;
        let totalDays = 0;
        for (
            let day = startDay;
            day <= currentDay;
            day++
        ) {
            totalDays++;
            if (habit.days && habit.days[day]) {
                completed++;
            }
        }
        let percentage = 0;
        if (totalDays > 0) {
            percentage =
                Math.round((completed / totalDays) * 100);
        }
        let row =
            document.createElement("div");
        row.className = "weekly-habit-row";
        row.innerHTML = `
            <div class="weekly-habit-title">
                <span>${habit.name}</span>
                <span>${percentage}%</span>
            </div>
            <div class="weekly-bar">
                <div style="width: ${percentage}%"></div>
            </div>
        `;
        progressArea.appendChild(row);
    }
}
createHabitTable();
showWeeklyHabitProgress();

// water tracker part
