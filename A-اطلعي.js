module.exports.config = {
    name: "اطلعي",
    version: "1.0.0",
    hasPermssion: 2,
  credits: "Mohammed Ps",
    description: "البوت يخرج من المجموعه",
  commandCategory: "المطور",
    usages: "اطلعي [ايدي الكروب]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
    const permission = ["100067409235113"]
    if (!permission.includes(event.senderID)) return api.sendMessage("ماعدك صلاحية حب", event.threadID, event.messageID);
        if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
                                                                                              }
