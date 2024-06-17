module.exports.config = {
	name: "رابط",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mohammed Ps",
	description: "احصل على رابط للصورة التي ترد عليها ",
	commandCategory: "خدمات",
	usages: "رابط",
	cooldowns: 5,
};

import uploadImage from '../modules/events/upload.js'
let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw `${lenguajeGB['smsAvisoMG']()}\nالرد على الصورة لتحويلها إلى رابط`
let media = await q.download()
let isTele = /image\/(png|jpe?g|gif).test(mime)
let link = await (isTele ? uploadImage : uploadFile)(media)
m.reply(`*تم ${link}*`)
}
handler.help = ['tourl <reply image>']
handler.tags = ['sticker']
handler.command = /^(upload|tul|tourl|رابط|toenlace)$/i
export default handler
