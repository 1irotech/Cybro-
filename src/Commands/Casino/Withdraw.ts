import { BaseCommand, Command, Message } from '../../Structures'

@Command('withdraw', {
    description: '',
    usage: '',
    cooldown: 15,
    exp: 5,
    category: 'casino'
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        if (M.numbers.length < 1) return void M.reply('amount?')
        const { bank } = await this.client.DB.getUser(M.sender.jid)
        const buffer = await this.client.utils.getBuffer('https://telegra.ph/file/25d2ae72ba6ffa5b4a163.mp4')
        if (bank - M.numbers[0] < 0) return void M.reply(`check ur bank`)
        await this.client.DB.setGold(M.sender.jid, -M.numbers[0], 'bank')
        await this.client.DB.setGold(M.sender.jid, M.numbers[0])
        const text = `*🟩*You withdrew ${M.numbers[0]}*gold to ur wallet`
        return void (await M.reply(buffer, 'video', true, undefined, text))
    }
}
