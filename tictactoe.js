let player = "X";

const trs = document.querySelectorAll("tr");
const tds = document.querySelectorAll("td");

const marking = (e) => {
  const target = e.target;
  if (target.textContent !== "") {
    alert("다른 곳을 선택하세요");
    return;
  }
  target.textContent = player;
  checkWinner();
  player = player === "X" ? "O" : "X";
};

const checkWinner = () => {
  // 행 검사
  for (let i = 0; i < trs.length; i++) {
    const tdsInRow = trs[i].querySelectorAll("td");
    const rowMarks = Array.from(tdsInRow).map((td) => td.textContent);
    const allMarksSame = rowMarks.every((mark) => mark === rowMarks[0]);
    if (allMarksSame && rowMarks[0] !== "") {
      alert(`${player} 의 승리 => 가로방향`);
      resetGame();
      return;
    }
  }

  // 열 검사
  for (let i = 0; i < 3; i++) {
    const columnMarks = [
      trs[0].querySelectorAll("td")[i].textContent,
      trs[1].querySelectorAll("td")[i].textContent,
      trs[2].querySelectorAll("td")[i].textContent,
    ];
    const allMarksSame = columnMarks.every((mark) => mark === columnMarks[0]);
    if (allMarksSame && columnMarks[0] !== "") {
      alert(`${player} 의 승리 => 세로방향`);
      resetGame();
      return;
    }
  }

  // 대각선(좌) 검사
  const leftDiagonalMarks = [
    trs[0].querySelectorAll("td")[0].textContent,
    trs[1].querySelectorAll("td")[1].textContent,
    trs[2].querySelectorAll("td")[2].textContent,
  ];
  const leftDiagonalMarksSame = leftDiagonalMarks.every(
    (mark) => mark === leftDiagonalMarks[0]
  );
  if (leftDiagonalMarksSame && leftDiagonalMarks[0] !== "") {
    alert(`${player} 의 승리 => 좌 대각선방향`);
    resetGame();
    return;
  }

  // 대각선(우) 검사
  const rightDiagonalMarks = [
    trs[0].querySelectorAll("td")[2].textContent,
    trs[1].querySelectorAll("td")[1].textContent,
    trs[2].querySelectorAll("td")[0].textContent,
  ];
  const rightDiagonalMarksSame = rightDiagonalMarks.every(
    (mark) => mark === rightDiagonalMarks[0]
  );
  if (rightDiagonalMarksSame && rightDiagonalMarks[0] !== "") {
    alert(`${player} 의 승리 => 우 대각성방향`);
    resetGame();
    return;
  }

  // 무승부 검사
  const tdsMark = [...tds];
  if (tdsMark.every((mark) => mark.textContent !== "")) {
    alert("무승부요");
    resetGame();
    return;
  }
};

const resetGame = () => {
  tds.forEach((td) => {
    td.textContent = "";
  });
  player = "X";
};

tds.forEach((td) => {
  td.addEventListener("click", marking);
});

document.querySelector(".reset-btn").addEventListener("click", resetGame);
