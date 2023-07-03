import { Sticker } from 'wa-sticker-formatter'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('gamble', {
    description: 'economy for a bot',
    usage: 'gamble',
    category: 'casino',
    cooldown: 30,
    exp: 20,
    casino: true
})
export default class command extends BaseCommand {
    override execute = async (M: Message, { args }: IArgs): Promise<void> => {
        const directions = ['left', 'right'] as TGamblingDirections[]
        if (M.numbers.length < 1 || args.length < 1)
            return void M.reply(`Invalid usage! Example: *${this.client.config.prefix}gamble right 500*`)
        const amount = M.numbers[0]
        const { wallet } = await this.client.DB.getUser(M.sender.jid)
        const buffer = await this.client.utils.getBuffer('https://telegra.ph/file/19bd93d5747d85f1db373.mp4')
        if (wallet - amount < 300) return void M.reply(`Check your wallet`)
        if (amount > 10000) return void M.reply(`🟥 *You can't gamble more than 10000 dollars.*`)
        const direction = args[1]
        const result = directions[Math.floor(Math.random() * directions.length)]
        await this.client.DB.setGold(M.sender.jid, result === direction ? amount : -amount)
        const sticker = await new Sticker(this.client.assets.get(result) as Buffer, {
            pack: '𝔻𝕂☠︎︎𝕙𝕚𝕥𝕞𝕒𝕟',
            author: `𝔻𝕜`,
            quality: 90,
            type: 'full'
        }).build()
        await M.reply(sticker, 'sticker')
        const text =
            result === direction ? `Congratulations 🎉 You won 🪙${amount} 📉` : `Hahahaha You lost 🪙${amount} 📈`
        return void (await M.reply(buffer, 'video', true, undefined, text))
    }
}

type TGamblingDirections = 'left' | 'right'
