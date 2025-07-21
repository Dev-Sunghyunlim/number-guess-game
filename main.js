//랜던 번호 지정
//유저가 번호를 입력 후 Go 버튼 클릭
//유저가 맞추면 맞췄습니다.
//랜던 번호 < 유저번호 Down
//랜던 번호 > 유저번호 Up
//reset 버튼 클릭 시 랜던 번호 재지정
//유저가 5번 시도하면 게임 오버 (버튼 disabled)
//유저 1~100 범위 밖이면 알려주고 기회 차감 없음.
//이미 입력한 번호는 알려주고 기회 차감 없음.

let correctNumber = 0;
let checkButton = document.getElementById("check-Button");
let resultArea = document.getElementById("result-Area");
let resetButton = document.getElementById("reset-Button");
let chances = 5;
let gameOver = false;
let chancesArea = document.getElementById("chances-Area");
let history = [];
let inputNum = document.getElementById("input-Number");

checkButton.addEventListener("click", checkNum);
resetButton.addEventListener("click", resetGame);
inputNum.addEventListener("focus", function () {
  inputNum.value = "";
});

function getRandomNumber() {
  correctNumber = Math.floor(Math.random() * 100 + 1);
  console.log("랜덤 번호: " + correctNumber);
}

function checkNum() {
  let inputNumValue = inputNum.value;
  if (inputNumValue === "") {
    resultArea.textContent = "숫자를 입력하고 GO 버튼을 눌러주세요.";
    return;
  }

  if (inputNumValue < 0 || inputNumValue > 100) {
    resultArea.textContent = "1~100 사이의 숫자를 입력하세요.";
    return;
  }

  if (history.includes(inputNumValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력하세요.";
    return;
  }

  chances--;
  chancesArea.textContent = `남은 기회 : ${chances} 회`;

  if (inputNumValue < correctNumber) {
    resultArea.textContent = "UP!!!";
  } else if (inputNumValue > correctNumber) {
    resultArea.textContent = "DOWN!!!";
  } else if (inputNumValue == correctNumber) {
    resultArea.textContent =
      "맞췄습니다! 게임을 다시 하시려면 Reset 버튼을 클릭하세요.";
    checkButton.disabled = true;
    return;
  }

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver) {
    checkButton.disabled = true;
    resultArea.textContent = `게임 오버! 정답은 ${correctNumber} 입니다.`;
  }
  history.push(inputNumValue);
}

function resetGame() {
  chances = 5;
  gameOver = false;
  checkButton.disabled = false;
  resultArea.textContent = "숫자를 입력하세요";
  chancesArea.textContent = "남은 기회 : 5 회";
  getRandomNumber();
  history = [];
  inputNum.value = "";
}

getRandomNumber();
