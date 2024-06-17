module.exports.config = {
	name: "اقتباسات",
	version: "1.1.2",
	hasPermssion: 0,
	credits: "Mohammed Ps",
	description: "شوتشوف",
	commandCategory: "خدمات",
	usages: "ا",
	cooldowns: 1,
};
module.exports.handleEvent = function ({ api, event }) {
	const { commands } = global.client;
	
	if (!event.body) return;

	const { threadID, messageID, body } = event;

	if (body.indexOf("askme") != 0) return;

	const splitBody = body.slice(body.indexOf("askme")).trim().split(/\s+/);


	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());

	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	return api.sendMessage(`⚔️ ${command.config.name} ⚔️\n${command.config.description}\n\n❯ Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯ Thuộc nhóm: ${command.config.commandCategory}\n❯ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯ Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n\n» Module code by ${command.config.credits} «`, threadID, messageID);
};

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
const { commands } = global.client;
const { threadID, messageID } = event;
const command = commands.get((args[0] || "").toLowerCase());
const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
if (!command) {
const command = commands.values();
var tl = [ 
       "هذا الزمن رأينا كلاب تزئر واسود اصبحت تنبح...
       فلا خافوا من الكلب لان صوته معروف ولا خافوا من الاسد لان صوته مألوف🖤🥀",
      " الجمال يلفت الأنظار لكن الطيبه تلفت القلوب🖤🥀",
      "لا تحقرون صغيره إن الجبال من حصى🖤🥀",
      "لاتمد عينك في يد غيرك🖤🥀",
      "بعض الاعتذارات يجب ان ارفض🖤🥀",
      "هل كانت كل الطرق تؤدي اليك ام انني انا من كنت اجعلعا كذلك🖤🥀",
      "ويُرهقني أنّي مليء بما لا أستطيع قوله🖤🥀",
      "أكان علي ان اغرس انيابي في قلبك لتشعر بي؟🖤🥀",
      "افضل أعداء معروفين على ان يكون لدي اصدقاء ملهوفين...🖤🥀",
      "قلوبنا مليئة بأشياء لم تكتب وإن كتبت لن ترسل وإن ارسلت لن تصل وإن وصلت لن تفهم🖤🥀",
      "لا دين لمن لا عهد له🖤🥀",
      "عامل الناس باخلاقك وليس باخلاقهم🖤🥀",
      "من ترك أمره لله اعطاه كل ما يتمناه🖤🥀",
      "إنعدام الرغبة للاشياء الذي ادمنتها انتصار🖤🥀",
      "ينتهي بنا الامر الي اعتياد الاشياء التي ضايقتنا🖤🥀",
      "لا تجعلني اتعود على دفء شمسك ان كانت في نيتك الغروب🖤🥀",
      "لا تعرف عني الا ما قد سمحت لك بمعرفته",
      "ان كان من حولك ثعابين فكن النسر الذي يجعلهم طعاماً له“,
      " العقل السليم ف البعد عن الحريم🖤🥀",
      "انا لست لاحد ولا احد لي انا فقط اساعد من يحتاج مساعدة وارحل🖤🥀",
      "البدايات للكل ، والثبات للصادقين🖤🥀",
      " الافراط في التسامح ق. يجعل الناس تستخف بك وهذا ما يعجبني ولا احد يعرف لما يعجبني🖤🥀",
      
      ];
var tle = tl[Math.floor(Math.random() * tl.length)];
var lon = ` ${tle}`;
return api.sendMessage(lon, event.threadID, event.messageID);
}
const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
return api.sendMessage(`⚔️ ${command.config.name} ⚔️\n${command.config.description}\n\n❯ Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯ Thuộc nhóm: ${command.config.commandCategory}\n❯ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯ Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n\n» Module code by ${command.config.credits} «`, threadID, messageID);
};