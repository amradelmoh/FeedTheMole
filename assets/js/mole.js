let score = 0;
MAX_SCORE = 10;

// How long mole will be sad?
function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 1800) + 2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

function getKingStatus() {
  return Math.random() > 0.9;
}
// we gonna initialize the moles here with "sad" status
const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-0"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-1"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-2"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-3"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-4"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-5"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-6"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-7"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-8"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-9"),
  },
];
// feed the moles if it's IMG tag and hungry
function feed(event) {
  if (!event.target.classList.contains("hungry")) {
    return;
  }
  // to identify the mole we clicked on and update him
  const mole = moles[parseInt(event.target.dataset.index)];

  mole.status = "fed";
  mole.next = getSadInterval();
  if (mole.king) {
    score += 2;
    mole.node.children[0].src = "./assets/img/king-mole-fed.png";
  } else {
    score++;
    mole.node.children[0].src = "./assets/img/mole-fed.png";
  }
  mole.node.children[0].classList.remove("hungry");

  if (score >= MAX_SCORE) {
    win();
  }
  document.querySelector(".worm-container").style.width = `${
    (score / MAX_SCORE) * 100
  }%`;
}
// if we scored 10 we gonna hide the game and display happy mole
function win() {
  document.querySelector(".bg").classList.add("hide");
  document.querySelector(".win").classList.remove("hide");
}
// Go from one state to another
function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getSadInterval();
      mole.status = "leaving";
      if (mole.king) {
        mole.node.children[0].src = "./assets/img/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./assets/img/mole-leaving.png";
      }
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      if (mole.king) {
        // if king is true
        mole.node.children[0].src = "./assets/img/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./assets/img/mole-hungry.png";
      }
      break;
    case "hungry":
      mole.next = getSadInterval();
      mole.status = "sad";
      if (mole.king) {
        mole.node.children[0].src = "./assets/img/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./assets/img/mole-sad.png";
      }
      mole.node.children[0].classList.remove("hungry");
      break;
  }
}

// it's like an infinite loop but runs at a fixed rate(0.1 seconds)
// We will set time in the futue (runAgainAt) and we will have (now) time which we will be updated every milisecond. if the (now) is finally bigger than (runAgainAt) that means we passed 100 milisecond then we will run the code.
let runAgainAt = Date.now() + 100; //run again after 0.1 seconds

function nextFrame() {
  const now = Date.now(); // update now every time requestAnimationFrame runs
  if (runAgainAt <= now) {
    // check if we have passed 100 miliseconds
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        // check if we can update the status of the mole
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = now + 100; // update runAgainAt to be 100 miliseconds in the future
  }
  requestAnimationFrame(nextFrame); // animate another frame at the next repaint
}

document.querySelector(".bg").addEventListener("click", feed);
nextFrame();
