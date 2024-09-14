const menuwindow = document.getElementById("menu");
const settingsbutton = document.getElementById("settings-button");
const neweventbutton = document.getElementById("add-new-event");
const eventcontainer = document.getElementById("events-container");
const inputText = document.getElementById("my-input");
var arrayOfDeleteButtons = new Array();
var script = document.createElement("script");

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 500;
let NumOfEvents = 0; 
let currentAngle = 0;
let spinning = false;
let spinSpeed = 0;
let anglePerEvent;

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    newElement();
  }
});
// Функція для малювання колеса
function drawWheel() {
  const colors = ["#FF6F61","#FFD700", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1"];
  if(NumOfEvents == 0){
    ctx.beginPath;
    ctx.arc(centerX, centerY, radius, 0, 2*Math.PI);
    ctx.fillStyle = colors[i % 6]
    ctx.fill();
  }
  else{
  const anglePerSector = (2 * Math.PI) / NumOfEvents;

  for (let i = 0; i < NumOfEvents; i++) {
    const startAngle = currentAngle + i * anglePerSector;
    const endAngle = startAngle + anglePerSector;

    // Вибираємо колір для сектору
    ctx.fillStyle = colors[i % 6]

    // Малюємо сектор
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    // Малюємо текст події
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + anglePerSector / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "28px Arial";
    ctx.fillText(`${elements[i]}`, radius - 50, 10);
    ctx.restore();
    }
  }
}

settingsbutton.addEventListener("click", function () {
  if (menuwindow.style.top == "0vh") {
    menuwindow.style.top = "-100vh";
    settingsbutton.style.filter = "none";
  } else {
    menuwindow.style.top = "0vh";
    settingsbutton.style.filter = "blur(1px) brightness(80%)";
  }
});

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// Create a new list item when clicking on the "Add" button
//#fff
//#fff
//#fff

var elements = [];

function newElement() {
  var inputValue = document.getElementById("my-input").value;
  if (inputValue !== "") {
    if (inputValue.length < 15) {
      if (NumOfEvents < 12) {
        NumOfEvents = NumOfEvents + 1;
        var li = document.createElement("li");
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        document.getElementById("myUL").appendChild(li);
        elements.push(inputValue);
        if (inputValue !== "") {
        }
        document.getElementById("my-input").value = "";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        drawWheel();
        for (i = 0; i < close.length; i++) {
          close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
            NumOfEvents = NumOfEvents - 1;
            a = div.innerText;
            a = a.slice(0, -1);
            elements = elements.filter((element) => element !== a);
            drawWheel();
            calculateResult();
          };
        }
      } else {
        {
          alert("Максимум 12 елементів одночасно!");
        }
      }
    } else {
      alert("Максимална довжина - 15 символів");
    }
  } else {
    alert("Щось потрібно написати!");
  }
}
// Функція для обертання колеса

function spinWheel() {
  if (!spinning) {
    currentAngle = 0;
    spinning = true;
    spinSpeed = Math.random()*10  // Випадкова швидкість
    animate();
  }
}

function animate() {
  if (spinSpeed > 0) {
    currentAngle += spinSpeed;
    spinSpeed *= 0.98; // Зменшуємо швидкість (сповільнення)
    if (spinSpeed < 0.01) {
      spinning = false;
      spinSpeed = 0;
      calculateResult();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWheel();
    requestAnimationFrame(animate);
  }
}

// Додаємо подію до кнопки
document.getElementById("spin-button").addEventListener("click", spinWheel);
drawWheel();