import axios, { AxiosResponse } from 'axios'
import { baseGRAPHQLURL } from 'shared/constants'

const client = axios.create({
	baseURL: baseGRAPHQLURL,
	headers: { 'Content-Type': 'application/json' },
})

export type PokeApiResponse<T> = AxiosResponse<{ data: T }>

export default client