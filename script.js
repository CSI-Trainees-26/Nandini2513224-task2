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
// TASKS PART

let tasks = JSON.parse(localStorage.getItem("fitcheckTasks")) || [];


// SAVE TASKS
function savetasks() {
    localStorage.setItem("fitcheckTasks", JSON.stringify(tasks));
}


// DISPLAY TASKS
function displaytasks() {

    let pendingtasks = document.getElementById("pendingTasks");
    let completedtasks = document.getElementById("completedTasks");
    if (!pendingtasks || !completedtasks) {
        return;
    }
    pendingtasks.innerHTML = "";
    completedtasks.innerHTML = "";
    let pendingCount = 0;
    let completedCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let taskBox = document.createElement("div");
        taskBox.className = "task-item";
        taskBox.setAttribute("draggable", "true");
        taskBox.setAttribute("data-drag-index", i);

        if (task.completed) {
            taskBox.classList.add("completed");
        }
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.completed;
        checkBox.addEventListener("change", function () {
            tasks[i].completed = checkBox.checked;
            savetasks();
            displaytasks();
        });
        let taskText = document.createElement("p");
        taskText.textContent = task.text;
        let editButton = document.createElement("button");
        editButton.textContent = "✎";
        editButton.className = "edit-button";
        editButton.addEventListener("click", function () {
            let newText = prompt("Edit your task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                tasks[i].text = newText.trim();
                savetasks();
                displaytasks();
            }
        });

        let deletebutton = document.createElement("button");
        deletebutton.textContent = "x";
        deletebutton.className = "delete-button";
        deletebutton.addEventListener("click", function () {
            tasks.splice(i, 1);
            savetasks();
            displaytasks();
        });
        taskBox.appendChild(checkBox);
        taskBox.appendChild(taskText);
        taskBox.appendChild(editButton);
        taskBox.appendChild(deletebutton);
        taskBox.addEventListener("dragstart", function () {
            taskBox.classList.add("dragging");
            taskBox.setAttribute("data-drag-index", i);
        });

        taskBox.addEventListener("dragend", function () {
            taskBox.classList.remove("dragging");
        });
        if (task.completed) {
            completedtasks.appendChild(taskBox);
            completedCount++;
        }
        else {
            pendingtasks.appendChild(taskBox);
            pendingCount++;
        }
    }
    document.getElementById("pendingCount").textContent = pendingCount;
    document.getElementById("completedCount").textContent = completedCount;
}

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
}
let pendingTaskArea = document.getElementById("pendingTasks");
let completedTaskArea = document.getElementById("completedTasks");

if (pendingTaskArea) {
    pendingTaskArea.addEventListener("dragover", function (event) {
        event.preventDefault();
    });
    pendingTaskArea.addEventListener("drop", function (event) {
        event.preventDefault();
        let index = event.target.closest(".task-item")?.getAttribute("data-drag-index");
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
        let index = event.target.closest(".task-item")?.getAttribute("data-drag-index");
        if (index !== null && index !== undefined) {
            tasks[index].completed = true;
            savetasks();
            displaytasks();
        }
    });
}


// DISPLAY TASKS WHEN PAGE LOADS
displaytasks();

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


// quotes page

let currentQuote = {
    text: "",
    author: ""
};

async function getQuote() {
    let quoteText =
        document.getElementById("quoteText");
    let quoteAuthor =
        document.getElementById("quoteAuthor");
    let dashboardQuote =
        document.getElementById("dashboardQuote");
    let dashboardAuthor =
        document.getElementById("dashboardAuthor");

    try {
        let response =await fetch("https://dummyjson.com/quotes/random");
        let data =await response.json();

        currentQuote.text =data.quote;
        currentQuote.author =data.author;
        if (quoteText) {
            quoteText.textContent ='"' + data.quote + '"';
        }
        if (quoteAuthor) {
            quoteAuthor.textContent ="- " + data.author;
        }
        if (dashboardQuote) {
            dashboardQuote.textContent ='"' + data.quote + '"';
        }
        if (dashboardAuthor) {
            dashboardAuthor.textContent ="- " + data.author;
        }
    }
    catch (error) {
        if (quoteText) {
            quoteText.textContent =
                "Unable to load a quote right now.";
        }
        if (dashboardQuote) {
            dashboardQuote.textContent ="Unable to load a quote right now.";
        }
    }
}

function saveQuote() {
    if (currentQuote.text === "") {
        return;
    }

    let savedQuotes =JSON.parse(localStorage.getItem("fitcheckSavedQuotes")) || [];
    let alreadySaved = false;
    for (let i = 0; i < savedQuotes.length; i++) {
        if (savedQuotes[i].text === currentQuote.text) {
            alreadySaved = true;
        }
    }
    if (!alreadySaved) {
        savedQuotes.push({
            text: currentQuote.text,
            author: currentQuote.author
        });
        localStorage.setItem("fitcheckSavedQuotes",JSON.stringify(savedQuotes)
        );
    }
    displaySavedQuotes();
}

function displaySavedQuotes() {
    let savedArea =
        document.getElementById("savedQuotes");
    if (!savedArea) {
        return;
    }
    savedArea.innerHTML = "";
    let savedQuotes =JSON.parse(localStorage.getItem("fitcheckSavedQuotes")) || [];
    if (savedQuotes.length === 0) {
        savedArea.innerHTML =
            "<p>No saved quotes yet.</p>";
        return;
    }
    for (let i = 0; i < savedQuotes.length; i++) {
        let quoteBox =
            document.createElement("div");
        quoteBox.className =
            "saved-quote";
        quoteBox.innerHTML = `
            <p>"${savedQuotes[i].text}"</p>

            <p>- ${savedQuotes[i].author}</p>

            <button onclick="deleteQuote(${i})">
                Remove
            </button>
        `;
        savedArea.appendChild(quoteBox);
    }
}
function deleteQuote(index) {
    let savedQuotes=JSON.parse(localStorage.getItem("fitcheckSavedQuotes")) || [];
    savedQuotes.splice(index, 1);
    localStorage.setItem("fitcheckSavedQuotes",JSON.stringify(savedQuotes)
    );
    displaySavedQuotes();
}

let quoteButton =document.getElementById("quoteButton");

let newQuoteButton =document.getElementById("newQuoteButton");

if (quoteButton) {
    quoteButton.addEventListener("click",getQuote);
}

if (newQuoteButton) {
    newQuoteButton.addEventListener(
        "click",
        getQuote
    );
}

let saveQuoteButton =document.getElementById("saveQuoteButton");
let saveDashboardQuote =document.getElementById("saveDashboardQuote");
if (saveQuoteButton) {
    saveQuoteButton.addEventListener("click",saveQuote);
}

if (saveDashboardQuote) {
    saveDashboardQuote.addEventListener("click",saveQuote);
}
getQuote();
displaySavedQuotes();

// timer part

let timerSeconds = 25 * 60;
let timerInterval = null;
let timerRunning = false;

function showTimer() {
    let display =document.getElementById("timerDisplay");
    if (!display) {
        return;
    }
    let minutes =Math.floor(timerSeconds / 60);
    let seconds =timerSeconds % 60;

    display.textContent =String(minutes).padStart(2, "0") +":" +String(seconds).padStart(2, "0");
}

function startTimer() {
    if (timerRunning) {
        return;
    }

    let message =document.getElementById("timerMessage");
    timerRunning = true;
    if (message) {
        message.textContent ="Focus mode is active.";
    }

    timerInterval =setInterval(function () {
            if (timerSeconds > 0) {
                timerSeconds--;
                showTimer();
            } 
            else {
                clearInterval(timerInterval);
                timerRunning = false;
                timerFinished();
            }
        }, 1000);
}
function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    let message =document.getElementById("timerMessage");
    if (message) {
        message.textContent ="Timer paused.";
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 0;
    showTimer();
    let message =document.getElementById("timerMessage");
    if (message) {
        message.textContent ="Timer stopped.";
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    let input =document.getElementById("timerMinutes");
    let minutes = 25;
    if (input && Number(input.value) > 0) {
        minutes =Number(input.value);
    }
    timerSeconds =minutes * 60;
    showTimer();
    let message =document.getElementById("timerMessage");
    if (message) {
        message.textContent ="Ready to focus?";
    }
}

function timerFinished() {
    let message =document.getElementById("timerMessage");
    if (message) {
        message.textContent ="Time is over! Great work.";
    }
    playAlarm();
}

function playAlarm() {
    let audioContext =
        new (window.AudioContext ||window.webkitAudioContext)();

    let oscillator =audioContext.createOscillator();
    let gain =audioContext.createGain();
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.frequency.value = 700;
    oscillator.type = "sine";
    oscillator.start();
    gain.gain.setValueAtTime(0.5,audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01,audioContext.currentTime + 1);
    oscillator.stop(audioContext.currentTime + 1);
}

let startTimerButton =document.getElementById("startTimer");
if (startTimerButton) {
    startTimerButton.addEventListener("click",function () {
            let input =
                document.getElementById("timerMinutes");
            if (!timerRunning &&timerSeconds === 25 * 60 && input && Number(input.value) > 0) {
                timerSeconds = Number(input.value) * 60;
            }
            startTimer();
        }
    );
}
let pauseTimerButton =document.getElementById("pauseTimer");
if (pauseTimerButton) {
    pauseTimerButton.addEventListener("click",pauseTimer);
}

let stopTimerButton =document.getElementById("stopTimer");

if (stopTimerButton) {
    stopTimerButton.addEventListener("click",stopTimer);
}

let resetTimerButton =document.getElementById("resetTimer");

if (resetTimerButton) {
    resetTimerButton.addEventListener("click",resetTimer);
}
showTimer();


// overall dashboard pe display

function updateDashboard() {

// tasks
    let taskProgress =
        document.getElementById("taskProgress");
    let taskBar =document.getElementById("taskBar");
    if (taskProgress) {
        let totalTasks =tasks.length;
        let completedTasks = 0;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].completed) {
                completedTasks++;
            }
        }
        taskProgress.textContent =completedTasks + " / " + totalTasks;
        let taskPercentage = 0;
        if (totalTasks > 0) {
            taskPercentage =Math.round((completedTasks / totalTasks) * 100);
        }
        if (taskBar) {
            taskBar.style.width =taskPercentage + "%";
        }
    }

// water
    let dashboardWater =document.getElementById("dashboardWater");
    let dashboardWaterGoal =document.getElementById("dashboardWaterGoal");
    let waterBar = document.getElementById("waterBar");
    if (dashboardWater) {
        let amount =getTodayWater();
        dashboardWater.textContent = amount + " ml";
        dashboardWaterGoal.textContent ="Goal: " + waterGoal + " ml";
        let waterPercentage = Math.round((amount / waterGoal) * 100);
        if (waterPercentage > 100) {
            waterPercentage = 100;
        }
        if (waterBar) {
            waterBar.style.width =waterPercentage + "%";
        }
    }
// habits
    let dashboardHabits =
        document.getElementById("dashboardHabits");
    let habitBar =document.getElementById("habitBar");

    if (dashboardHabits) {
        let today =new Date().getDate();
        let completed = 0;
        for (let i = 0; i < habits.length; i++) {
            if (habits[i].days && habits[i].days[today]) {
                completed++;
            }
        }

        let percentage = 0;
        if (habits.length > 0) {
            percentage =Math.round((completed / habits.length) * 100);
        }
        dashboardHabits.textContent =percentage + "%";
        if (habitBar) {
            habitBar.style.width =percentage + "%";
        }
    }

// sleep
    let dashboardSleep =document.getElementById("dashboardSleep");
    let sleepBar =document.getElementById("sleepBar");

    if (dashboardSleep) {
        let today =getTodayKey();
        let todaySleep = null;
        for (let i = 0; i < sleepRecords.length; i++) {
            if (sleepRecords[i].date === today) {
                todaySleep =sleepRecords[i];
            }
        }
        if (todaySleep) {
            let hours =todaySleep.duration /(1000 * 60 * 60);
            dashboardSleep.textContent =hours.toFixed(1) + " h";
            let percentage =Math.round((hours / sleepGoal) * 100);
            if (percentage > 100) {
                percentage = 100;
            }
            if (sleepBar) {
                sleepBar.style.width =percentage + "%";
            }
        } 
        else {
            dashboardSleep.textContent ="No record";
        }
    }
}

updateDashboard();