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
let waterGoal =Number(localStorage.getItem("fitcheckWaterGoal")) || 2500;

function getWaterData() {
    return JSON.parse(localStorage.getItem("fitcheckWaterData")) || {};
}
function saveWaterData(data) {
    localStorage.setItem("fitcheckWaterData",JSON.stringify(data));
}

function getTodayWater() {
    let data = getWaterData();
    let today = getTodayKey();
    if (!data[today]) {
        data[today] = 0;
    }
    return data[today];
}

function updateWaterDisplay() {
    let waterAmount =
        document.getElementById("waterAmount");
    let waterGoalDisplay =
        document.getElementById("waterGoalDisplay");
    let waterProgress =
        document.getElementById("waterProgress");
    let waterPercentage =
        document.getElementById("waterPercentage");
    if (!waterAmount) {
        return;
    }
    let amount = getTodayWater();
    waterAmount.textContent = amount;
    waterGoalDisplay.textContent = waterGoal;
    let percentage =
        Math.round((amount / waterGoal) * 100);
    if (percentage > 100) {
        percentage = 100;
    }
    waterProgress.style.width =
        percentage + "%";
    waterPercentage.textContent =
        percentage + "%";
}

let waterButtons=document.querySelectorAll("[data-water]");
waterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        let change =Number(button.getAttribute("data-water"));
        let data = getWaterData();
        let today = getTodayKey();
        if (!data[today]) {
            data[today] = 0;
        }
        data[today] = data[today] + change;
        if (data[today] < 0) {
            data[today] = 0;
        }
        saveWaterData(data);
        updateWaterDisplay();
        createWaterCharts();
    });
});

let saveWaterGoal=document.getElementById("saveWaterGoal");
if (saveWaterGoal) {
    saveWaterGoal.addEventListener("click", function () {
        let input =
            document.getElementById("waterGoalInput");
        let newGoal =
            Number(input.value);
        if (newGoal <= 0) {
            alert("Please enter a valid goal.");
            return;
        }
        waterGoal = newGoal;
        localStorage.setItem(
            "fitcheckWaterGoal",
            waterGoal
        );
        input.value = "";
        updateWaterDisplay();
    });
}

function createWaterCharts() {
    let weeklyChart =
        document.getElementById("weeklyWaterChart");
    let monthlyChart =
        document.getElementById("monthlyWaterChart");
    if (!weeklyChart || !monthlyChart) {
        return;
    }
    weeklyChart.innerHTML = "";
    monthlyChart.innerHTML = "";
    let data = getWaterData();
    let today = new Date();
    for (let i = 6; i >= 0; i--) {
        let date = new Date();
        date.setDate(today.getDate() - i);
        let key =date.getFullYear() + "+" +String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
        let amount = data[key] || 0;
        let column =document.createElement("div");
        column.className = "chart-column";
        let bar =document.createElement("div");
        bar.className = "chart-bar";
        let height =(amount / waterGoal) * 100;
        if (height > 100) {
            height = 100;
        }

        bar.style.height = height + "%";
        let label =document.createElement("p");
        label.textContent = date.getDate();
        column.appendChild(bar);
        column.appendChild(label);
        weeklyChart.appendChild(column);
    }

    for (let i = 29; i >= 0; i--) {
        let date = new Date();
        date.setDate(today.getDate() - i);
        let key =date.getFullYear() +"-" +String(date.getMonth() + 1).padStart(2, "0") +"-" +String(date.getDate()).padStart(2, "0");
        let amount = data[key] || 0;
        let column =document.createElement("div");
        column.className = "chart-column";
        let bar =document.createElement("div");
        bar.className = "chart-bar";

        let height =(amount / waterGoal) * 100;

        if (height > 100) {
            height = 100;
        }

        bar.style.height = height + "%";

        let label =document.createElement("p");
        label.textContent = date.getDate();

        column.appendChild(bar);
        column.appendChild(label);
        monthlyChart.appendChild(column);
    }
}
updateWaterDisplay();
createWaterCharts();


// sleep tracker part

let sleepGoal =Number(localStorage.getItem("fitcheckSleepGoal")) || 8;
let sleepRecords =JSON.parse(localStorage.getItem("fitcheckSleepRecords")) || [];
let activeSleep =localStorage.getItem("fitcheckActiveSleep");
let sleepInterval;
function saveSleepRecords() {
    localStorage.setItem("fitcheckSleepRecords",JSON.stringify(sleepRecords));
}
function formatSleepTime(milliseconds) {
    let totalSeconds =
        Math.floor(milliseconds / 1000);
    let hours =
        Math.floor(totalSeconds / 3600);
    let minutes =
        Math.floor((totalSeconds % 3600) / 60);
    let seconds =
        totalSeconds % 60;
    return (String(hours).padStart(2, "0") +":" +String(minutes).padStart(2, "0") +":" +String(seconds).padStart(2, "0"));
}
function updateSleepTimer() {
    let liveTimer =document.getElementById("sleepLiveTimer");
    if (!liveTimer) {
        return;
    }
    if (!activeSleep) {
        liveTimer.textContent = "00:00:00";
        return;
    }
    let startTime =Number(activeSleep);
    let currentTime =Date.now();
    let difference =currentTime - startTime;
    liveTimer.textContent =formatSleepTime(difference);
}
function startSleep() {
    if (activeSleep) {
        alert("Sleep tracking is already running.");
        return;
    }
    activeSleep = Date.now().toString();
    localStorage.setItem(
        "fitcheckActiveSleep",
        activeSleep
    );
    updateSleepStatus();
}
function stopSleep() {
    if (!activeSleep) {
        alert("Sleep tracking has not been started.");
        return;
    }
    let startTime =
        Number(activeSleep);
    let endTime =
        Date.now();
    let duration =
        endTime - startTime;
    let today =
        getTodayKey();
    let sleepRecord = {
        date: today,
        start: startTime,
        end: endTime,
        duration: duration
    };
    sleepRecords.push(sleepRecord);
    saveSleepRecords();
    activeSleep = null;
    localStorage.removeItem("fitcheckActiveSleep");
    updateSleepStatus();
    displaySleepRecords();
    createSleepChart();
}

function updateSleepStatus() {
    let status =document.getElementById("sleepStatus");
    let startText =document.getElementById("sleepStartTime");
    if (!status) {
        return;
    }

    if (activeSleep) {
        status.textContent ="Sleep tracking is active";
        startText.textContent ="Sleep started at " +new Date(Number(activeSleep)).toLocaleTimeString();
    } 
    else {
        status.textContent =
            "Ready to sleep?";
        startText.textContent =
            "No active sleep session.";
    }
}
let startSleepButton =
    document.getElementById("startSleep");
if (startSleepButton) {
    startSleepButton.addEventListener("click",startSleep);
}
let stopSleepButton =
    document.getElementById("stopSleep");

if (stopSleepButton) {
    stopSleepButton.addEventListener("click",stopSleep);
}
let saveSleepGoal =document.getElementById("saveSleepGoal");
if (saveSleepGoal) {
    saveSleepGoal.addEventListener("click", function () {
        let input =document.getElementById("sleepGoalInput");
        let newGoal =Number(input.value);
        if (newGoal <= 0 || newGoal > 24) {
            alert("Please enter a value between 1 and 24.");
            return;
        }
        sleepGoal = newGoal;
        localStorage.setItem("fitcheckSleepGoal",sleepGoal);
        updateSleepGoalDisplay();
    });
}

function updateSleepGoalDisplay() {
    let goalDisplay =document.getElementById("sleepGoalDisplay");
    if (goalDisplay) {
        goalDisplay.textContent = sleepGoal;
    }
}

function displaySleepRecords() {
    let recordsArea =
        document.getElementById("sleepRecords");
    if (!recordsArea) {
        return;
    }
    recordsArea.innerHTML = "";
    if (sleepRecords.length === 0) {
        recordsArea.innerHTML =
            "<p>No sleep records yet.</p>";
        return;
    }
    for (let i = sleepRecords.length - 1;i >= 0;i--) {
        let record = sleepRecords[i];
        let recordBox =
            document.createElement("div");
        recordBox.className =
            "sleep-record";
        let durationText =
            formatSleepTime(record.duration);
        let hours =
            record.duration / (1000 * 60 * 60);
        let resultClass = "";
        if (hours >= sleepGoal) {
            resultClass = "good-sleep";
        } 
        else {
            resultClass = "short-sleep";
        }
        recordBox.innerHTML = `
            <span>${record.date}</span>
            <span class="${resultClass}">
                ${durationText}
            </span>
        `;
        recordsArea.appendChild(recordBox);
    }
}
function createSleepChart() {
    let chart =document.getElementById("sleepChart");
    if (!chart) {
        return;
    }
    chart.innerHTML = "";
    let today = new Date();
    for (let i = 6; i >= 0; i--) {
        let date = new Date();
        date.setDate(today.getDate() - i);

        let key =date.getFullYear() +"-" +String(date.getMonth() + 1).padStart(2, "0") +"-" +String(date.getDate()).padStart(2, "0");
        let record = null;

        for (let j = 0; j < sleepRecords.length; j++) {
            if (sleepRecords[j].date === key) {
                record = sleepRecords[j];
            }
        }
        let hours = 0;
        if (record) {
            hours =record.duration /(1000 * 60 * 60);
        }

        let column =
            document.createElement("div");
        column.className =
            "sleep-column";
        let bar =
            document.createElement("div");
        bar.className =
            "sleep-bar";
        let height =
            (hours / 12) * 100;
        if (height > 100) {
            height = 100;
        }
        bar.style.height =
            height + "%";
        let label =
            document.createElement("p");
        label.textContent =
            date.getDate();
        column.appendChild(bar);
        column.appendChild(label);
        chart.appendChild(column);
    }
}
updateSleepGoalDisplay();
updateSleepStatus();
displaySleepRecords();
createSleepChart();
if (activeSleep) {
    updateSleepTimer();
    sleepInterval =setInterval(updateSleepTimer, 1000);
}



