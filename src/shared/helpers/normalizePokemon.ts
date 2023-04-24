import { Pokemon, PokemonFetched } from 'shared/types'

function normalizePokemon(pokemon: PokemonFetched): Pokemon {
	return {
		name: pokemon.name,
		id: pokemon.id,
		height: pokemon.height,
		order: pokemon.order,
		weight: pokemon.weight,
		stats: pokemon.pokemon_v2_pokemonstats?.map(item => ({
			base_stat: item.base_stat,
			effort: item.effort,
			name: item.pokemon_v2_stat.name
		})),
		types: pokemon.pokemon_v2_pokemontypes.map(item => ({
			slot: item.slot,
			name: item.pokemon_v2_type.name,
			id: item.id,
		})),
		sprites: JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites)
	}
}

export default normalizePokemon