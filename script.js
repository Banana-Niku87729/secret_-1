const dialogues = [
  "やぁ...",
  "こんにちは？こんばんは？",
  "あいにく、script.jsにそのような処理は書いていません。",
  "できないことはないのでしょうが、めんどくさいので。",
  "あぁ、申し遅れていました。",
  "私の名前は蜍牙ｼｷ縺励ｍ",
  "いかがなさいましたか？",
  "いつもと違った表情して。",
  "このメッセージを閲覧できているということは",
  "クリスマス以降に見てるってことですかね。",
  "仮に今がクリスマスだと仮定させてください。",
  "皆さん、何して過ごしますか？",
  "まぁ、私からしたらただ虚無の時間なので...",
  "...",
];

// 年による会話分岐を追加
const currentYear = new Date().getFullYear();
if (currentYear === 2024) {
  dialogues.push(
    "信じられますか？",
    "もうすぐ2024年が終わります。"
  );
} else if (currentYear === 2025) {
  dialogues.push(
    "もう2025年になっています。時間が経つのは早いものですね。"
  );
} else {
  dialogues.push(
    "信じられますか？",
    `${currentYear}年ですね。`,
    "何かがおかしい。",
    "お前は今どこにいる。",
    "俺の予想とは違う。"
  );
}

// 年分岐後の通常会話を追加
dialogues.push(
  "まぁ、どう過ごすかはあなたの人生ですし。",
  "さて、これ以外に何を話せばいいでしょうか",
  "あ、そうだ。",
  "このメッセージを見れるURLをどこで入手しましたか？",
  "入手した場所によっては情報が漏らされていることとなりますので...",
  "うーん。",
  "ネタが極めて少ないです。",
);

// デバイスとブラウザ情報を取得する関数
function getDeviceInfo() {
  try {
    const userAgent = navigator.userAgent;
    const browser = (() => {
      if (userAgent.includes("Chrome")) return "Chrome";
      if (userAgent.includes("Firefox")) return "Firefox";
      if (userAgent.includes("Safari")) return "Safari";
      if (userAgent.includes("Edge")) return "Edge";
      return "不明なブラウザ";
    })();

    const device = (() => {
      if (/Mobi|Android|iPhone/i.test(userAgent)) return "スマートフォン";
      if (/Tablet|iPad/i.test(userAgent)) return "タブレット";
      return "PC";
    })();

    return { browser, device };
  } catch {
    return { browser: "取得エラー", device: "取得エラー" };
  }
}

// ユーザーの位置情報を取得する関数
function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("位置情報を取得できません。");
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            // Geocoding APIを使用して都道府県を取得（例: OpenStreetMap API）
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            const data = await response.json();
            const country = data.address.country || "不明な国";
            const region = data.address.state || country;

            resolve(region);
          } catch {
            reject("都道府県の取得に失敗しました。");
          }
        },
        () => reject("位置情報の取得が許可されていません。")
      );
    }
  });
}

// ブラウザ・デバイス・都道府県情報を取得して会話に追加
const { browser, device } = getDeviceInfo();
dialogues.push(`あなたが使用しているブラウザは${browser}、デバイスは${device}です。`);
getLocation()
  .then((location) => {
    if (location === "日本") {
      dialogues.push("まぁ、そりゃそうか...");
      dialogues.push("あ、いや、なんでもないです。");
    } else {
      dialogues.push("...");
      dialogues.push("...？");
      dialogues.push("...は？");
      dialogues.push("お前、日本に住んでいるよな？？");
      dialogues.push("俺のデータでは${location}という結果が出たのだが。");
      dialogues.push("お前、何をしている？");
      dialogues.push("何を隠している？？？");
    }
  })
  .catch((error) => {
    dialogues.push(`位置情報に関してエラーが発生しました: ${error}`);
  });

let currentDialogueIndex = 0;
const dialogueBox = document.getElementById("dialogue-box");
const instructions = document.getElementById("instructions");

// DOMの読み込み確認
if (!dialogueBox || !instructions) {
  console.error("dialogueBoxまたはinstructionsが見つかりません。HTMLを確認してください。");
}

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
    dialogueBox.textContent = "Rec877が退出しました。";
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
