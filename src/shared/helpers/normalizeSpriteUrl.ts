import { spritesBaseURL } from 'shared/constants'
import { Sprites } from 'shared/types'

const defaultImgSrc = 'https://www.nicepng.com/png/full/312-3126315_pokemon-pokmon-pokeball-pokball-pokemon-go-pokem-pokeball.png'
const spriteRegex = new RegExp('(?<=\\/media\\/sprites\\/)', 'i')

function normalizeSpriteUrl(sprites: Sprites) {
	const sprite = sprites.front_default || sprites.back_default || ''
	const [, imgSrc] = sprite.split(spriteRegex)
	return imgSrc ? `${spritesBaseURL}/${imgSrc}` : defaultImgSrc
}

export function normalizeSpriteUrlList(sprites: Sprites): Sprites {
	const result: Partial<Sprites> = {}
	let key: keyof typeof sprites
	for (key in sprites) {
		const sprite = sprites[key]
		if (typeof sprite === 'string') {
			const [, imgSrc] = sprite.split(spriteRegex)
			result[key] = imgSrc ? `${spritesBaseURL}/${imgSrc}` : defaultImgSrc				
		}
	}
	return result as Sprites
}

export default normalizeSpriteUrl