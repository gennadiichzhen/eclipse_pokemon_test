import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import pokemonReducer from 'store/pokemonSlice'

export const store = configureStore({
	reducer: {
		pokemon: pokemonReducer
	}
})

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type RootState = ReturnType<typeof store.getState>