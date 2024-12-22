const dialogues = [
  "やぁ...,
  "こんにちは？こんばんは？",
  "あいにく、script.jsにそのような処理は書いていません。",
  "できないことはないのでしょうが、めんどくさいので。"
];

let currentDialogueIndex = 0;

const dialogueBox = document.getElementById("dialogue-box");

function updateDialogue() {
  if (currentDialogueIndex < dialogues.length) {
    dialogueBox.textContent = dialogues[currentDialogueIndex];
    currentDialogueIndex++;
  } else {
    dialogueBox.textContent = "End Talking";
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
