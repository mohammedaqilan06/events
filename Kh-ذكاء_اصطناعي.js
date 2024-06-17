const axios = require('axios');

module.exports.config = {
  name: "ذكاء",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Mohammed Ps",
  usePrefix: true,
  description: "شات جي بي تي بالبوت",
  commandCategory: "خدمات",
  cooldowns: 2,
};

const API_SERVER_URL = 'https://sensui-useless-apis.codersensui.repl.co/api/tools/ai?question=hi';

module.exports.run = async ({ api, event, args }) => {
  try {
    const question = args.join(' ');

    if (!question) {
      return api.sendMessage("من فضلك ضيف اي سؤال", event.threadID);
    }

    const response = await axios.get(`${API_SERVER_URL}?question=${encodeURIComponent(question)}`);

    if (response.data.error) {
      return api.sendMessage("أُووبس! واجه الذكاء الاصطناعي خطأً. الرجاء معاودة المحاولة في وقت لاحق.", event.threadID);
    }

    const answer = response.data.answer;

    if (answer) {
      api.sendMessage(` ${answer}`, event.threadID);
    } else {
      api.sendMessage("هناك خطأ ما يرجى المحاولة مرة أخرى...", event.threadID);
    }
  } catch (error) {
    console.error('حدث خطأ أثناء جلب الرد:', error);
    api.sendMessage("حدث خطأ أثناء جلب الرد", event.threadID);
  }
};