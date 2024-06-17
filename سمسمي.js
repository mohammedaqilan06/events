import axios from 'axios';

const config = {
  name: "سمسمي",
  version: "1.1.0",
  description: "التكلم معا سمسمي",
  commandCategory: "الــــجـــروب",
  usage: "[text]/on/off",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "KONOW⁦(ﾉ≧∇≦)ﾉ ﾐ ┻━┻/XAVIATEAM,
  dependencies: ["axios"]
};

const langData = {
  en_US: {
    on: "Lisa is now on.",
    off: "Lisa is now off.",
    alreadyOn: "Lisa is already on.",
    alreadyOff: "Lisa is already off.",
    missingInput: "Please enter the content you want to chat with Lisa.",
    noResult: "Lisa doesn't understand what you're saying :(",
    error: "An error occurred, please try again later.",
  },
  vi_VN: {
    on: "Nino đã được bật",
    off: "Nino đã được tắt",
    alreadyOn: "Nino đã được bật",
    alreadyOff: "Nino đã được tắt",
    missingInput: "Vui lòng nhập nội dung cần trò chuyện với Nino",
    noResult: "Nino không hiểu bạn đang nói gì :(",
    error: "Có lỗi xảy ra, vui lòng thử lại sau",
  },
  ar_SY: {
    on: "سمسمي يعمل الان",
    off: "سمسمي متوقف الان",
    alreadyOn: "سمسمي قيد التشغيل بالفعل",
    alreadyOff: "سمسمي متوقفة بالفعل",
    missingInput: "الرجاء إدخال المحتوى الذي تريد الدردشة مع سمسمي",
    noResult: "سمسمي لا يفهم ما تقول :(",
    error: "لقد حدث خطأ، رجاء أعد المحاولة لاحقا",
  },
};

function onLoad() {
  if (!global.hasOwnProperty("sanju")) global.sanju = {};
}

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

async function onCall({ message, args, getLang, userPermissions }) {
  const input = args.join(" ");
  if (!input) return message.reply(getLang("missingInput"));

  if (input == "on" || input == "off") if (!userPermissions.some(e => e == 1 || e == 2)) return;
  if (input == "on") {
    if (global.sanju.hasOwnProperty(message.threadID))
      return message.reply(getLang("alreadyOn"));
    global.sanju[message.threadID] = true;

    return message.reply(getLang("on"));
  } else if (input == "off") {
    if (!global.sanju.hasOwnProperty(message.threadID))
      return message.reply(getLang("alreadyOff"));
    delete global.sanju[message.threadID];

    return message.reply(getLang("off"));
  }
  if (global.sanju.hasOwnProperty(message.threadID)) return;

  axios
    .get(
       `https://api.simsimi.net/v2?text=${encodeURIComponent(input)}&lc=ar`
    )
    .then((res) => {
      const { data } = res;
      const { status } = data;
      {
        return message.reply(data.success);
      }
    })
    .catch((err) => {
      return message.reply(getLang("error"));
    });
}

export default {
  config,
  onLoad,
  langData,
  onCall,
};


