let running = false;
let topRunning = 0;
let done = true;
let containerWidth = document.getElementById("container").offsetWidth;
let container_ofHeight = parseInt(document.getElementById("sectionTop").style.height);
let containerHeight = container_ofHeight;
let color = 0;
let listSlidebox = [];
let stop;
let listLength = [Math.ceil(containerWidth / 2)];
let nowLength = Math.ceil(containerWidth / 2);
let listleft = [];
let homeScreen;
let finishScreen = document.getElementById("finish");
let boxstarterElement = document.getElementById("boxstarter");
let score = 0;

let modeGame = "home";

document.getElementById("boxstarter").style.width =
  Math.ceil(containerWidth / 2) + "px";

function main() {
  if (modeGame == "home") {
  } else if (modeGame == "play") {
    moveBox();
  } else if (modeGame == "finish") {
    resultScreen();
  }
}

function chengeMode() {

  if (modeGame == "home") {
    homeScreen = document.getElementById("home");
    document.getElementById("app").removeChild(document.getElementById("home"));
    document
      .getElementById("app")
      .removeChild(document.getElementById("finish"));
  } else {
    $("#scoreElementId").remove();
    
    document
      .getElementById("app")
      .removeChild(document.getElementById("finish"));

    document.getElementById("sectionTop").style.height = 0 + "px";
    $("#container").empty();
    document.getElementById("container").appendChild(boxstarterElement);
    score = 0;
  }

  modeGame = "play";

  moveBox();
}

function resultScreen() {
  document.getElementById("app").appendChild(finishScreen);
  let scoreElement = document.createElement("h1");
  scoreElement.id = "scoreElementId"
  scoreElement.innerText = score;
  document.getElementById("finishPage").appendChild(scoreElement);
  running = false;
  topRunning = 0;
  done = true;
  containerWidth = document.getElementById("container").offsetWidth;
  containerHeight = container_ofHeight
  color = 0;
  listSlidebox = [];
  stop;
  listLength = [Math.ceil(containerWidth / 2)];
  nowLength = Math.ceil(containerWidth / 2);
  listleft = [];
}

function moveBox() {
  let go = true;
  let boxSlide = document.createElement("div");
  boxSlide.className = "box";
  document.getElementById("container").appendChild(boxSlide);
  document.getElementById("sectionTop").style.height = containerHeight + "vh";
  if(score >= 5){
    containerHeight += 3;
  }
  let pos = 0;

  boxSlide.style.top = topRunning + "vh";
  topRunning -= 6;

  if (color == 360) {
    color = 0;
  }
  color += 5;
  boxSlide.style.backgroundColor = "hsl(" + color + ", 50%, 50%)";

  if (listSlidebox.length == 0) {
    boxSlide.style.width = Math.ceil(containerWidth / 2) + "px";
    listleft.push(parseInt($("#boxstarter").css("margin-left")));
    stop = false;
  } else {
    boxSlide.style.width = 0 + "px";
    stop = true;
  }

  let id = setInterval(function move() {
    if (stop) {
      let leftSlide = parseInt($("#" + listSlidebox[0]).css("left"));
      if (listleft[0] >= leftSlide) {
        let boxWidth =
          parseInt(document.getElementById(listSlidebox[0]).style.width) -
          (listleft[0] - leftSlide);

        document.getElementById(listSlidebox[0]).style.left =
          listleft[0] -
          leftSlide +
          parseInt($("#" + listSlidebox[0]).css("left")) +
          "px";

        document.getElementById(listSlidebox[0]).style.width = boxWidth + "px";
        document.getElementById(listSlidebox[1]).style.width = boxWidth + "px";
        listLength.unshift(boxWidth);
      } else {
        let boxWidth = listleft[0] + listLength[0] - leftSlide;

        document.getElementById(listSlidebox[0]).style.width = boxWidth + "px";
        document.getElementById(listSlidebox[1]).style.width = boxWidth + "px";

        listLength.unshift(boxWidth);
        listleft.unshift(leftSlide);
      }
      if (listLength[0] <= 0) {
        document
          .getElementById("container")
          .removeChild(document.getElementById(listSlidebox[0]));
        modeGame = "finish";
        main();
      }
      score += 1;
      stop = false;
      clearInterval(listSlidebox[0]);
      listSlidebox.shift();
    } else {
      if (pos == containerWidth - parseInt(boxSlide.style.width)) {
        go = false;
      } else if (pos == 0) {
        go = true;
      }
      if (go) {
        pos++;
        boxSlide.style.left = pos + "px";
      } else {
        pos--;
        boxSlide.style.left = pos + "px";
      }
    }
  });
  boxSlide.id = id;
  listSlidebox.push(boxSlide.id);
  listLength.push(parseInt(boxSlide.style.width));
}
