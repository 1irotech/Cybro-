import { BaseCommand, Command, Message } from '../../Structures'

@Command('bots', {
    description: 'List all hitman47 bots',
    category: 'general',
    aliases: ['bots'],
    usage: 'bots',
    cooldown: 5,
    exp: 100
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const buffer = await this.client.utils.getBuffer('https://telegra.ph/file/b161409b1f126c2a0725a.mp4')
        let text = ''
        text += `➪ 😻𝔹𝐎𝕋𝐒😻\n\n`
        text += `➪ 🟦add your number\n\n`
        text += `➪ 🟦add your number\n\n`
        text += `➪ 🟦add your number\n\n`
        text += `➪ 🤖 *Bots 3*\n\n`
        text += `➪ ❚❚ ↻ 𝗵𝗶𝘁𝗺𝗮𝗻47 ©️ 2023`
        return void (await M.reply(buffer, 'video', true, undefined, text))
    }
}
