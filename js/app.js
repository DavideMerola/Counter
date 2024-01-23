const container = document.querySelector(".container");
let div_counters = document.querySelector("#div_counters");

const div_buttons = document.querySelector(".div_buttons");
const reset = document.querySelector("#reset");

const winIMG = document.querySelector(".win");
const loseIMG = document.querySelector(".lose");

function createCounter(id, text, container, nameClass) {
  const counter = document.createElement("div");
  counter.textContent = text;
  counter.id = id;
  counter.classList.add(nameClass);
  container.append(counter);
}

createCounter("first", 0, div_counters, "counter");
createCounter("middle", 0, div_counters, "counter");
createCounter("last", 0, div_counters, "counter");
createCounter("minus", "-", div_buttons, "button_style");
createCounter("plus", "+", div_buttons, "button_style");

const counters = { first: 0, middle: 0, last: 0 };

// Counter Select
let target_id;
div_counters.addEventListener("click", (e) => {
  let target = e.target;

  // Remove 'selector' class
  document.querySelectorAll(".counter").forEach((counter) => {
    counter.classList.remove("selector");
  });

  // Add or remove the 'selector' class to/from the clicked element.
  if (target.classList.contains("counter")) {
    target.classList.toggle("selector");
    target_id = target.id;
  }
});

// Random Number
let random = [];
for (i = 0; i < 3; i++) {
  let rand = Math.floor(Math.random() * 9 + 1);
  random.push(rand);
}

// CHEAT :)
console.log("Soluzione:", random);

// Listener container
container.addEventListener("click", (e) => {
  let target = e.target;

  //Check if the element has the 'button_style' class
  if (target.classList.contains("button_style")) {
    if (div_counters) {
      //Find the selected counter element.
      let selectedCounter = div_counters.querySelector(`#${target_id}`);
      if (selectedCounter) {
        //Manage different types of buttons based on their ID.
        switch (target.id) {
          case "plus":
            updateCounter("plus");
            break;
          case "minus":
            updateCounter("minus");
            break;
          case "check":
            checkFunction();
            break;
        }

        selectedCounter.innerText = counters[target_id];
      }
    }
  }
});

//Counter Update
function updateCounter(action) {
  counters[target_id] = updateCounterValue(action, counters[target_id], 9);
}

function updateCounterValue(action, count, max) {
  if (action === "plus" && count < max) {
    return ++count;
  } else if (action === "minus" && count > 0) {
    return --count;
  }
  return count;
}

// RESET BUTTON
reset.addEventListener("click", () => {
  location.reload();
});

// Check number
function checkFunction() {
  if (
    counters.first === random[0] &&
    counters.middle === random[1] &&
    counters.last === random[2]
  ) {
    win();
  } else {
    lose();
  }
}

// Win
function win() {
  hearts.classList.remove("red-anim");
  hearts.classList.add("green");
  hearts.innerText = "You Win";
  winIMG.classList.add("show");
  reset.innerHTML = "Play";
  reset.classList.add("show");
  playAudio("win");
  stop();
}

// Lose
function lose() {
  life--;
  if (life >= 1) {
    shake();
    lifeCounter();
    playAudio("lose_life");
  } else {
    playAudio("lose");
    stop();
    shake();
    hearts.innerText = "You Lose";
    loseIMG.classList.add("show");
    reset.classList.add("show");
  }
}

// Win/Lose System
let life = 3;

// Toogle Shake
function shake() {
  container.classList.toggle("shake");
}

//Shake Animation
container.addEventListener("animationend", shake);

// Disable Buttons
function stop() {
  container.style.pointerEvents = "none";
  div_counters.classList.remove("selector");
}

// Heart System
let hearts = document.createElement("p");
hearts.classList.add("red-anim");
hearts.innerText += "♡♡♡";

function lifeCounter() {
  hearts.innerText = "";
  let heart = "♡";
  for (let i = 0; i < life; i++) {
    hearts.innerText += heart;
  }
}

// Shuffle
let shuffled_numbers = random.slice();
shuffle(shuffled_numbers);

// Mix Numbers
let mix_order = document.querySelector("#mix_order");
mix_order.innerText = shuffled_numbers;
mix_order.append(hearts);

// Shuffle Method
function shuffle(array) {
  let index = array.length,
    rdmIndex;

  while (index != 0) {
    rdmIndex = Math.floor(Math.random() * index);
    index--;

    [array[index], array[rdmIndex]] = [array[rdmIndex], array[index]];
  }
  return array;
}

// Audio
function playAudio(eventType) {
  let audioPath;
  switch (eventType) {
    case "win":
      audioPath = "assets/audio/win.wav";
      break;
    case "lose":
      audioPath = "assets/audio/lose_life.mp3";
      break;
    case "lose_life":
      audioPath = "assets/audio/lose.wav";
      break;
    default:
      return;
  }

  let audio = new Audio(audioPath);
  if (audio.canPlayType) {
    audio.play();
  }
}
