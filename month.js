let Months = JSON.parse(localStorage.getItem("monthTodos"));
if (Months == null) {
  Months = [];
}

$("#monthCalender").html(
  "<span><strong style='font-size:24px;'>" +
    months[month] +
    "</strong><span><b>, " +
    year +
    " " +
    "</b></span></span>"
);

function mremoveItem() {
  var index = -1;
  for (var i = 0; i < Months.length; i++) {
    if (Months[i].text == $(this).prev().text()) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    Months.splice(index, 1);
  }
  localStorage.setItem("monthTodos", JSON.stringify(Months));
  location.reload();
}

function mchangeState() {
  var index = -1;
  for (var i = 0; i < Months.length; i++) {
    if (Months[i].text == $(this).next().text()) {
      index = i;
      break;
    }
  }
  if (Months[index].complete == false) {
    $(this).attr("src", "images/tick.png");
    $(this).next().css("text-decoration", "line-through");
    Months[index].complete = true;
  } else {
    $(this).attr("src", "images/checkbox.png");
    $(this).next().css("text-decoration", "none");
    Months[index].complete = false;
  }
  localStorage.setItem("monthTodos", JSON.stringify(Months));
}

function mgetCorrectState() {
  let done = $(".checkMonth");
  let text = $(".mtodo");
  for (var i = 0; i < Months.length; i++) {
    if (Months[i].complete == false) {
      done[i].src = "images/checkbox.png";
      text[i].style.textDecoration = "none";
    } else {
      done[i].src = "images/tick.png";
      text[i].style.textDecoration = "line-through";
    }
  }
}

function maddItems() {
  for (var i = 0; i < Months.length; i++) {
    let htmlComponent =
      "<div style='padding:10px'><img class='checkMonth' src='images/checkbox.png' alt='check' style='height:25px;width:25px;float:left;margin-right:15px;'><span class='mtodo'>" +
      Months[i].text +
      "</span><img src='images/bin.png' alt='delete' class='mbin' style='height:25px;width:25px;float:right'></div>";
    $("#monthSpace:first").append(htmlComponent);
    $("#monthTodo").val("");
  }
}

function maddToStorage() {
  let mTODO = {
    id: Date.now(),
    complete: false,
    text: $("#monthTodo").val(),
    finished: false,
  };
  Months.push(mTODO);
  localStorage.setItem("monthTodos", JSON.stringify(Months));
  $("#monthSpace").html("");
  maddItems();
  mgetCorrectState();
}

$("#addTodoMonth").click(function () {
  if ($("#monthTodo").val()) {
    maddToStorage();
  }
});

$("#monthTodo").on("keypress", function (event) {
  if (event.which == 13) {
    if ($("#monthTodo").val()) {
      maddToStorage();
    }
  }
});

$(document).ready(function () {
  maddItems();
  mgetCorrectState();
});

$(document).on("click", ".checkMonth", mchangeState);

$(document).on("click", ".mbin", mremoveItem);
