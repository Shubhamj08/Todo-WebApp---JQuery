let Years = JSON.parse(localStorage.getItem("yearTodos"));
if (Years == null) {
  Years = [];
}

$("#yearCalender").html(
  "<span><strong style='font-size:24px;'>" + year + "</b></span></span>"
);

function yremoveItem() {
  var index = -1;
  for (var i = 0; i < Years.length; i++) {
    if (Years[i].text == $(this).prev().text()) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    Years.splice(index, 1);
  }
  localStorage.setItem("yearTodos", JSON.stringify(Years));
  location.reload();
}

function ychangeState() {
  var index = -1;
  for (var i = 0; i < Years.length; i++) {
    if (Years[i].text == $(this).next().text()) {
      index = i;
      break;
    }
  }
  if (Years[index].complete == false) {
    $(this).attr("src", "images/tick.png");
    $(this).next().css("text-decoration", "line-through");
    Years[index].complete = true;
  } else {
    $(this).attr("src", "images/checkbox.png");
    $(this).next().css("text-decoration", "none");
    Years[index].complete = false;
  }
  localStorage.setItem("yearTodos", JSON.stringify(Years));
}

function ygetCorrectState() {
  let done = $(".checkYear");
  let text = $(".ytodo");
  for (var i = 0; i < Years.length; i++) {
    if (Years[i].complete == false) {
      done[i].src = "images/checkbox.png";
      text[i].style.textDecoration = "none";
    } else {
      done[i].src = "images/tick.png";
      text[i].style.textDecoration = "line-through";
    }
  }
}

function yaddItems() {
  for (var i = 0; i < Years.length; i++) {
    let htmlComponent =
      "<div style='padding:10px'><img class='checkYear' src='images/checkbox.png' alt='check' style='height:25px;width:25px;float:left;margin-right:15px;'><span class='ytodo'>" +
      Years[i].text +
      "</span><img src='images/bin.png' alt='delete' class='ybin' style='height:25px;width:25px;float:right'></div>";
    $("#yearSpace:first").append(htmlComponent);
    $("#yearTodo").val("");
  }
}

function yaddToStorage() {
  let yTODO = {
    id: Date.now(),
    complete: false,
    text: $("#yearTodo").val(),
    finished: false,
  };
  Years.push(yTODO);
  localStorage.setItem("yearTodos", JSON.stringify(Years));
  $("#yearSpace").html("");
  yaddItems();
  ygetCorrectState();
}

$("#addTodoYear").click(function () {
  if ($("#yearTodo").val()) {
    yaddToStorage();
  }
});

$("#yearTodo").on("keypress", function (event) {
  if (event.which == 13) {
    if ($("#yearTodo").val()) {
      yaddToStorage();
    }
  }
});

$(document).ready(function () {
  yaddItems();
  ygetCorrectState();
});

$(document).on("click", ".checkYear", ychangeState);

$(document).on("click", ".ybin", yremoveItem);
