import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Pokemon, Type } from 'shared/types'
import pokemonAPI from 'shared/api/pokemonAPI'
import normalizePokemon from 'shared/helpers/normalizePokemon'
import { RootState } from 'store'

export type PokemonState = {
	loading: boolean;
  pokemonList: Pokemon[] | null;
  chosenPokemon: Pokemon | null;
  tagsList: Type[] | null;
  chosenTags: Pokemon[] | null;
  totalCount: number | null;
	page: number;
	limit: number;
}

const initialState: PokemonState = {
	loading: false,
	pokemonList: null,
	chosenPokemon: null,
	tagsList: null,
	chosenTags: null,
	totalCount: null,
	page: 1,
	limit: 20,
}

export const getPokemons = createAsyncThunk<{ data: Pokemon[], totalCount: number }, { type?: number[], searchText: string }>('pokemon/getPokemons',
	async function(params, thunkAPI) {
		const { pokemon: { limit = 20, page = 1 } } = thunkAPI.getState() as RootState
		const data = await pokemonAPI.getPokemonList(limit, (page - 1) * limit, params)
		const result = {
			data: data.data.data.pokemon_v2_pokemon.map(normalizePokemon),
			totalCount: data.data.data.pokemon_v2_pokemon_aggregate.nodes.length
		}
		return result
	})

export const getPokemonDetails = createAsyncThunk<Pokemon, { id: number }>('pokemon/getPokemonDetails',
	async function(params) {
		const data = await pokemonAPI.getPokemonDetails(params.id)
		return normalizePokemon(data.data.data.pokemon_v2_pokemon[0])
	})

export const getPokemonTypes = createAsyncThunk<Type[]>('pokemon/getPokemonTypes',
	async function() {
		const data = await pokemonAPI.getPokemonTypesList()
		return data.data.data.pokemon_v2_type.map(item => ({
			slot: item.id,
			name: item.name,
			id: item.id
		}))
	})

export const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		setChosenPokemon: (state: PokemonState, action: PayloadAction<Pokemon | null>) => {
			state.chosenPokemon = action.payload
		},
		setLimit: (state: PokemonState, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
		setPage: (state: PokemonState, action: PayloadAction<number>) => {
			state.page = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getPokemons.pending, function (state: PokemonState) {
			state.loading = true
		})
		builder.addCase(getPokemons.fulfilled, function (state: PokemonState, action) {
			state.loading = false
			state.pokemonList = action.payload.data
			state.totalCount = action.payload.totalCount
		})
		builder.addCase(getPokemons.rejected, function (state: PokemonState) {
			state.loading = false
			state.pokemonList = null
		})
		builder.addCase(getPokemonTypes.pending, function (state: PokemonState) {
			state.loading = true
		})
		builder.addCase(getPokemonTypes.fulfilled, function (state: PokemonState, action) {
			state.loading = false
			state.tagsList = action.payload
		})
		builder.addCase(getPokemonTypes.rejected, function (state: PokemonState) {
			state.loading = false
			state.tagsList = null
		})
		builder.addCase(getPokemonDetails.fulfilled, function (state: PokemonState, action) {
			state.chosenPokemon = action.payload
		})
		builder.addCase(getPokemonDetails.rejected, function (state: PokemonState) {
			state.chosenPokemon = null
		})
	},
})

export const { setChosenPokemon, setPage, setLimit } = pokemonSlice.actions

export default pokemonSlice.reducer