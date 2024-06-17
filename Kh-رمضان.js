module.exports.config = {
	name: "رمضان",
	version: "1.0.0",
	hasPermssion: 0,
  credits: "Mohammed Ps",
	description: "موعد قدوم شهر رمضان الكريم",
  commandCategory: "خدمات",
	cooldowns: 5
}

module.exports.run = function ({ event, api }) {
    const t = Date.parse("March 23, 2024 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    return api.sendMessage(`「 الوقت المتبقي لشهر رمضان 」\n» ${days} يوم و ${hours} ساعة و ${minutes} دقيقة , ${seconds} ثانية «`, event.threadID, event.messageID);
} 