let day = new Date();
let weekDay = day.getDay();
let date = day.getDate();
let month = day.getMonth();
let year = day.getFullYear();

let Days = JSON.parse(localStorage.getItem("dayTodos"));
if (Days == null) {
  Days = [];
}

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

$("#dayCalender").html(
  "<span><strong style='font-size:24px;'>" +
    days[weekDay] +
    "</strong><span><b>, " +
    date +
    " " +
    months[month] +
    "</b></span></span>"
);

function removeItem() {
  var index = -1;
  for (var i = 0; i < Days.length; i++) {
    if (Days[i].text == $(this).prev().text()) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    Days.splice(index, 1);
  }
  localStorage.setItem("dayTodos", JSON.stringify(Days));
  location.reload();
}

function changeState() {
  var index = -1;
  for (var i = 0; i < Days.length; i++) {
    if (Days[i].text == $(this).next().text()) {
      index = i;
      break;
    }
  }
  if (Days[index].complete == false) {
    $(this).attr("src", "images/tick.png");
    $(this).next().css("text-decoration", "line-through");
    Days[index].complete = true;
  } else {
    $(this).attr("src", "images/checkbox.png");
    $(this).next().css("text-decoration", "none");
    Days[index].complete = false;
  }
  localStorage.setItem("dayTodos", JSON.stringify(Days));
}

function getCorrectState() {
  let done = $(".checkDay");
  let text = $(".todo");
  for (var i = 0; i < Days.length; i++) {
    if (Days[i].complete == false) {
      done[i].src = "images/checkbox.png";
      text[i].style.textDecoration = "none";
    } else {
      done[i].src = "images/tick.png";
      text[i].style.textDecoration = "line-through";
    }
  }
}

function addItems() {
  for (var i = 0; i < Days.length; i++) {
    let htmlComponent =
      "<div style='padding:10px'><img class='checkDay' src='images/checkbox.png' alt='check' style='height:25px;width:25px;float:left;margin-right:15px;'><span class='todo'>" +
      Days[i].text +
      "</span><img src='images/bin.png' alt='delete' class='bin' style='height:25px;width:25px;float:right'></div>";
    $("#daySpace:first").append(htmlComponent);
    $("#dayTodo").val("");
  }
}

function addToStorage() {
  let TODO = {
    id: Date.now(),
    complete: false,
    text: $("#dayTodo").val(),
    finished: false,
  };
  Days.push(TODO);
  localStorage.setItem("dayTodos", JSON.stringify(Days));
  $("#daySpace").html("");
  addItems();
  getCorrectState();
}

$("#addTodoDay").click(function () {
  if ($("#dayTodo").val()) {
    addToStorage();
  }
});

$("#dayTodo").on("keypress", function (event) {
  if (event.which == 13) {
    if ($("#dayTodo").val()) {
      addToStorage();
    }
  }
});

$(document).ready(function () {
  addItems();
  getCorrectState();
});

$(document).on("click", ".checkDay", changeState);

$(document).on("click", ".bin", removeItem);
