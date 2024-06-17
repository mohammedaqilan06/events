module.exports.config = {
	name: "تلويد",
	version: "1.0.0",
	hasPermssion: 2,
  credits: "Mohammed Ps",
	description: " ",
  commandCategory: "المطور",
	usages: "[]",
	cooldowns: 300
};
module.exports.run = async function({ api, event, args,Threads, Users }) {
    const permission = ["100067409235113"]
    if (!permission.includes(event.senderID)) return api.sendMessage("ماعدك صلاحية حب", event.threadID, event.messageID);
delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("Reload config", event.threadID, event.messageID);    
}
