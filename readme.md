![](https://velog.velcdn.com/images/ryanbae94/post/af6c2aaa-bf2f-4365-9fef-8ae02900c21c/image.png)

3행 2열에 'O' 가 마지막으로 찍혀서 'O'의 승리로 끝나는 것인데...
사진에서 보이는 것 처럼 'O' 마크가 찍히지 않고, 승리 alert이 발생한다.

마크를 찍는 코드를 보면,

```javascript
const marking = (e) => {
  const target = e.target;
  if (target.textContent !== "") {
    alert("다른 곳을 선택하세요");
    return;
  }
  target.textContent = player;
  player = player === "X" ? "O" : "X";
  checkWinner();
};
```

```javascript
const checkWinner = () => {
  // 행 검사
  for (let i = 0; i < trs.length; i++) {
    const tdsInRow = trs[i].querySelectorAll("td");
    const rowMarks = Array.from(tdsInRow).map((td) => td.textContent);
    const allMarksSame = rowMarks.every((mark) => mark === rowMarks[0]);
    if (allMarksSame && rowMarks[0] !== "") {
      const winningPlayer = player === "O" ? "X" : "O";
      alert(`${winningPlayer} 의 승리 => 가로방향`);
      resetGame();
      return;
    }
  }
  // 열 검사
  // 대각 검사
};
```

`target.textContent`를 현재 플레이어(X or O)의 마크로 찍어준 뒤, 승리자가 있는지 판별하는 함수 `CheckWinner()` 를 실행시키는 것이 내 목적이었다.
_**근데 대체 왜 순서대로 동작안함?**_

직감적으로 뭔가 "순서" 에 관한 문제가 발생했다고 느꼈고, 틱택토게임이 실행될 때의 CallStack을 한 번 그려보았다.
![](https://velog.velcdn.com/images/ryanbae94/post/c08c68e1-3bbb-4bdc-a65b-9082987d5747/image.png)

흠..근데 이 순서대로라면, `checkWinner()`가 실행되기 전에 `resetGame()`이 먼저 실행되므로, 승리 alert이 발생하기 전에 게임판에 있는 모든 마크가 지워져야 하는 것 아닌가..?

결론은, 이 문제가 아니었다.
`marking()` 함수 내부에 `checkWinner()` 함수가 있다. 즉, checkWinner() 함수가 실행되기 전 `target.textContent`에 할당된 값 자체는 바뀌었지만, 렌더링이 되기 전에 `checkWinner()` 함수가 실행되었고, `checkWinner()` 함수 내에 `resetGame()`이 있었기 때문에 얼럿이 발생하고, 바로 게임보드에 있는 값들이 초기화되어서 마지막 마크가 찍히는 것을 볼 수가 없었던 것이다.

그래서 어떻게 해결했냐면

```javascript
const marking = (e) => {
  const target = e.target;
  if (target.textContent !== "") {
    alert("다른 곳을 선택하세요");
    return;
  }
  target.textContent = player;
  player = player === "X" ? "O" : "X";

  setTimeout(checkWinner, 0);
};
```

비동기 함수인 `setTimeout`을 넣어서 해결했다.
