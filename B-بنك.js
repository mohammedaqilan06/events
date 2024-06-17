module.exports.config = {
        name: "بنك",
        version: "0.0.1",
        hasPermssion: 0,
        credits: "Mohammed PS",
        description: "سحب/ايداع/عرض/تسجيل",
       commandCategory: "الــبــنـــك",
        usages: "سحب/ايداع/عرض/تسجيل",
        cooldowns: 0,
dependencies: {
         "fs-extra": "",
      "request": "",
      "axios": ""
  }, 
envConfig: {
      APIKEY: "chinhdz"
}  
};
module.exports.onLoad = async () => {
	const { existsSync, writeFileSync, mkdirSync } = require("fs-extra")
	const { join } = require("path")
	const axios = require("axios");
	const dir = __dirname + `/banking`;
	if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const pathData = join(__dirname + '/banking/banking.json');
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
	return;
}
module.exports.run = async function({ api, event, args, models, Users, Threads, Currencies, permssion }) {
  const { threadID, messageID, senderID } = event;
  const axios = require("axios")
    /*var APIKEY = global.configModule[this.config.name].APIKEY
    const checkKey = (await axios.get(`https://myhurts.net/adminkeys?key=chinhdz`)).data
    if(checkKey.status !== true) return api.sendMessage('⚠APIKEY CỦA BẠN ĐÃ HẾT HẠN, VUI LÒNG LIÊN HỆ chinhle ĐỂ MUA KEY\n⚡️FB: https://www.facebook.com/chinhle3601/', threadID, messageID);*/
  const { readFileSync, writeFileSync } = require("fs-extra")
  const { join } = require("path")
  const pathData = join(__dirname + '/banking/banking.json');
  const user = require('./banking/banking.json');
  const timeIM = 60*60
  const laisuat = 0.05
  const moneyInput = parseInt(args[1])
  if(args[0] == 'تسجيل' || args[0] == 'register') {
    if (!user.find(i => i.senderID == senderID)) {
      var add = { senderID: senderID,  money: 0 }
      user.push(add);
      writeFileSync(pathData, JSON.stringify(user, null, 2));
      return api.sendMessage(`[ بنك كوكي ] » لقد قمت بالتسجيل بنجاح \n قم بإيداع 200 دولار على الأقل لجني الأرباح 💰`, threadID, messageID)
    }
  else return api.sendMessage(`[ بنك كوكي ] » لديك بالفعل حساب على نظام البنك 🏦`, threadID, messageID)
  }
  if(args[0] == 'check' || args[0] == 'عرض') {
  if (!user.find(i => i.senderID == senderID)) return api.sendMessage('[ بنك كوكي ] » انت مو مسجل بالبنك سجل وتعال 🏦', threadID, messageID)
    else { 
      var userData = user.find(i => i.senderID == senderID);
      return api.sendMessage(`[ بنك كوكي ] » المبلغ الذي تودع به بنك كوكي هو: ${userData.money}$\n\n💷 الفائده: +${laisuat}% كل ${timeIM/60} دقيقة`, threadID, messageID)
    }
  } 
  if(args[0] == 'ايداع' || args[0] == 'send') {
  if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 50) return api.sendMessage("[ بنك كوكي ] »يجب أن يكون مبلغ الإيداع رقمًا واحدًا وأكبر من 50 دولارًا 💰", threadID, messageID);
  if (!user.find(i => i.senderID == senderID)) {
    return api.sendMessage('[ بنك كوكي ] »  اكتب (بنك تسجيل) حتى تسجل بالبنك وتعرض فلوسك + نسبة الفئدة 💰', threadID, messageID)
  }
  else { 
      let balance = (await Currencies.getData(senderID)).money;
      if(balance < moneyInput) return api.sendMessage(`[ بنك كوكي ] » رصيدك غير كاف ${moneyInput} للإيداع في بنك كوكي 💰 `, threadID, messageID)
      var userData = user.find(i => i.senderID == senderID);
      var money = userData.money;
      userData.money = parseInt(money) + parseInt(moneyInput)
      writeFileSync(pathData, JSON.stringify(user, null, 2));
      await Currencies.decreaseMoney(senderID, parseInt(moneyInput));
      return api.sendMessage(`[ بنك كوكي ] » لقد قمت بأيداع  ${moneyInput}$ في بنك كوكي\n\n💷 الفائده: +${laisuat}% في ${timeIM/60} دقيقة`, threadID, messageID)
    }
  }
  if(args[0] == 'rút' || args[0] == 'سحب') { 
    if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 50) return api.sendMessage("[ بنك كوكي ] » لازم تكتب رقم واكثر من 50 دولار . ", threadID, messageID);
    if (!user.find(i => i.senderID == senderID)) {
      return api.sendMessage('[ بنك كوكي ] »  اكتب (بنك تسجيل) حتى تسجل بالبنك وتعرض فلوسك + نسبة الفئدة 💰', threadID, messageID)
    }
  else {  
    var userData = user.find(i => i.senderID == senderID); 
    var money = userData.money;
    if(parseInt(money) < parseInt(moneyInput)) return api.sendMessage('[ بنك كوكي ] » رصيدك لا يكفي لإجراء هذه الصفقة!', threadID, messageID)
      else {
        await await Currencies.increaseMoney(senderID, parseInt(moneyInput));
        userData.money = parseInt(money) - parseInt(moneyInput)
        writeFileSync(pathData, JSON.stringify(user, null, 2));
        return api.sendMessage(`[ بنك كوكي ] »تم سحب  ${parseInt(moneyInput)}$ بنجاح \n الرصيد المتبقي هو ${userData.money}$`, threadID, messageID)
      }
    }
  }
  else return api.sendMessage(`=====🏦 بنك كوكي 🏦=====\n\n[بنك تسجيل] - سجل لإيداع الأموال في بنك كوكي💹\n[بنك عرض] - عرض المبلغ في بنك كوكي💳\n[بنك ايداع] - الإيداع في بنك كوكي💷\n[بنك سحب] - سحب الأموال من بنك كوكي\n\n💲 معدل الفائدة الحالي : +${laisuat}% في ${timeIM/60} هذه اللحظه`, threadID, messageID)
      }
