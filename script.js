const dialogues = [
  "やぁ...,
  "こんにちは？こんばんは？",
  "あいにく、script.jsにそのような処理は書いていません。",
  "できないことはないのでしょうが、めんどくさいので。"
];

let currentDialogueIndex = 0;
const dialogueBox = document.getElementById("dialogue-box");
const instructions = document.getElementById("instructions");

// 会話を進める関数
function updateDialogue() {
  // 初回操作で説明を隠す
  if (instructions.style.display !== "none") {
    instructions.style.display = "none";
  }
  
  // 会話の表示
  if (currentDialogueIndex < dialogues.length) {
    dialogueBox.textContent = dialogues[currentDialogueIndex];
    currentDialogueIndex++;
  } else {
    dialogueBox.textContent = "会話が終了しました。";
  }
}

// マウスクリックで進める
dialogueBox.addEventListener("click", updateDialogue);

// スペースキーで進める
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    updateDialogue();
  }
});

// 初期状態の設定
dialogueBox.textContent = "Click Or Space";
