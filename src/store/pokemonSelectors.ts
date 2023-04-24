import { RootState } from 'store'
import { Pokemon, Type } from 'shared/types'

export function pokemonsListSelector(state: RootState): Pokemon[] | null {
	return state.pokemon.pokemonList
}

export function isPokemonsLoadingSelector(state: RootState) {
	return state.pokemon.loading
}

export function chosenPokemonSelector(state: RootState) {
	return state.pokemon.chosenPokemon
}

export function pokemonTagsListSelector(state: RootState): Type[] | null {
	return state.pokemon.tagsList
}

export function pokemonsLoading(state: RootState) {
	return state.pokemon.loading
}

export function pagesCountSelector(state: RootState): number {
	return Math.ceil(state.pokemon.totalCount / state.pokemon.limit)
}

export function chosenPageSelector(state: RootState): number {
	return state.pokemon.page
}

export function pagesLimitSelector(state: RootState): number {
	return state.pokemon.limit
}
