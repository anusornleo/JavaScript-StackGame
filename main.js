let running = false;
let topRunning = 0;
let done = true;
let containerWidth = document.getElementById("container").offsetWidth;
let containerHeight = 50;
let color = 0;
let listSlidebox = [];
let stop;
let listLength = [Math.ceil(containerWidth / 2)];
let nowLength = Math.ceil(containerWidth / 2);
let listleft = [];

let modeGame = "home";

document.getElementById("boxstarter").style.width =
  Math.ceil(containerWidth / 2) + "px";

function myFunction() {
  if (modeGame == "home") {
    console.log("go start");
    modeGame = "play";
    moveBox();
  } else {
  }
}

function moveBox() {
  let redbox = new Object();
  let go = true;
  let boxSlide = document.createElement("div");
  boxSlide.className = "box";
  document.getElementById("container").appendChild(boxSlide);
  document.getElementById("sectionTop").style.height = containerHeight + "vh";
  containerHeight += 3;
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

        console.log("boxWidth = " + boxWidth);

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
        console.log("boxWidth = " + boxWidth);
        document.getElementById(listSlidebox[0]).style.width = boxWidth + "px";
        document.getElementById(listSlidebox[1]).style.width = boxWidth + "px";

        listLength.unshift(boxWidth);
        listleft.unshift(leftSlide);
      }
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
      //   pos++;
      //   boxSlide.style.left = pos + "px";
    }
  });
  boxSlide.id = id;
  listSlidebox.push(boxSlide.id);
  listLength.push(parseInt(boxSlide.style.width));

  //   let box = document.getElementById("boxslide");
  //   let pos = 0;
  //   let id = setInterval(frame, 10);
  //   let containerWidth = document.getElementById("container").offsetWidth;
  //   let boxSlideWidth = document.getElementById("boxslide").offsetWidth;
  //   let go = true;
  //   console.log(running + " " + id);

  //   function frame() {
  //     if (running == true) {
  //       console.log("stop" + " " + id);
  //       clearInterval(id);
  //     } else {
  //       if (
  //         pos ==
  //         containerWidth -
  //           boxSlideWidth -
  //           parseInt($("#boxslide").css("margin-left"))
  //       ) {
  //         go = false;
  //       } else if (pos == 0) {
  //         go = true;
  //       }
  //       if (go) {
  //         pos++;
  //         box.style.left = pos + "px";
  //       } else {
  //         pos--;
  //         box.style.left = pos + "px";
  //       }
  //     }
  //   }
}
