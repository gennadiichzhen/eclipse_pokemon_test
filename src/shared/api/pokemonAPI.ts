import client from 'shared/api'
import { PokemonDetailsResponse, PokemonResponse, PokemonTypeResponse } from 'shared/types'
import { PokeApiResponse } from 'shared/api/axios'

const getPokemonListQuery = function (limit: number, offset: number) {
	return `query getPokemonList {
      pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}) {
        order
        name
        pokemon_species_id
        id
        height
        weight
        pokemon_v2_pokemontypes {
          id
          slot
          type_id
          pokemon_v2_type {
            name
            move_damage_class_id
            generation_id
            id
          }
        }
				pokemon_v2_pokemonsprites {
					sprites
				}
      }
			pokemon_v2_pokemon_aggregate {
				nodes {
					id
				}
			}
    }
`
}

const getPokemonListFilteredByTypeQuery =
	function (limit: number, offset: number, query: { searchText: string, type?: number[]}) {
		let typesFilter = ''
		if (query.type?.length) {
			typesFilter = `,pokemon_v2_pokemontypes: {pokemon_v2_type: {id: {_in: [${query.type}]}}}`
		}
		return `query getPokemonList {
      pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}, where: {name: {_regex: "${query.searchText}"}${typesFilter}}) {
        order
        name
        pokemon_species_id
        id
        height
        weight
        pokemon_v2_pokemontypes {
          id
          slot
          type_id
          pokemon_v2_type {
            name
            move_damage_class_id
            generation_id
            id
          }
        }
				pokemon_v2_pokemonsprites {
					sprites
				}
      }
			pokemon_v2_pokemon_aggregate {
				nodes {
					id
				}
			}
    }
`
	}

const getPokemonDetailsQuery = function (id: number) {
	return `query getPokemonDetails {
      pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
        order
        name
        pokemon_species_id
        id
        height
        weight
        pokemon_v2_pokemontypes {
          id
          slot
          type_id
          pokemon_v2_type {
            name
            move_damage_class_id
            generation_id
            id
          }
        }
				pokemon_v2_pokemonsprites {
					sprites
				}
				pokemon_v2_pokemonstats {
					base_stat
					effort
					id
					stat_id
					pokemon_v2_stat {
						name
						move_damage_class_id
						is_battle_only
						id
						game_index
					}
				}

      }
    }
`
}

const getPokemonList = function (limit: number, offset: number, params: { type?: number[], searchText: string }):
	Promise<PokeApiResponse<PokemonResponse>> {
	if (typeof params.type === 'object' || params.searchText.trim()) {
		return client.post<{ data: PokemonResponse }>('', {
			operationName: 'getPokemonList',
			variables: null,
			query: getPokemonListFilteredByTypeQuery(limit, offset, params)
		})
	}
	return client.post<{ data: PokemonResponse }>('', {
		operationName: 'getPokemonList',
		variables: null,
		query: getPokemonListQuery(limit, offset)
	})
}

const getPokemonDetails = function (id: number): Promise<PokeApiResponse<PokemonDetailsResponse>> {
	return client.post<{ data: PokemonDetailsResponse }>('', {
		operationName: 'getPokemonDetails',
		variables: null,
		query: getPokemonDetailsQuery(id)
	})
}

const getPokemonTypesList = function (): Promise<PokeApiResponse<PokemonTypeResponse>> {
	return client.post('', {
		operationName: 'getPokemonTypesList',
		variables: null,
		query: `
			query getPokemonTypesList {
				pokemon_v2_type {
					name
					generation_id
					id
					move_damage_class_id
				}
			}
		`
	})
}

const getPokemonGenerationsList = function () {
	return client.post('', {
		operationName: 'getPokemonGenerationsList',
		variables: null,
		query: `
			query getPokemonGenerationsList {
				pokemon_v2_generation {
					id
					name
				}
			}
		`
	})
}

const pokemonAPI = {
	getPokemonList,
	getPokemonTypesList,
	getPokemonGenerationsList,
	getPokemonDetails,
}

export default pokemonAPI