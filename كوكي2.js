const https = require('https');

module.exports.config = {
    name: "كوكي2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Mohammed Ps",
    description: "استخدام GPT للرد على الأسئلة",
    commandCategory: "الــتــرفــيــه والــالــعــاب",
    usages: "[سؤال]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const inputText = args.join(' ');
    let { threadID, messageID } = event;
    let tid = threadID,
        mid = messageID;

    if (inputText !== "") {
        const encodedInput = encodeURIComponent(inputText);
        const url = `https://dev-the-dark-lord0.pantheonsite.io/wp-admin/js/Apis/Wormgpt.php?message=z`;

        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                api.sendMessage(data, tid, mid);
            });
        }).on('error', (error) => {
            console.error(`حدث خطأ: ${error.message}`);
            api.sendMessage("حدث خطأ أثناء الاتصال بالخادم", tid, mid);
        });
    } else {
        api.sendMessage("انت البوت تفضل اسال", tid, mid);
    }
};
