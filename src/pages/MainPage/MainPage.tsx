import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './MainPage.module.scss'
import { Container, SelectChangeEvent } from '@mui/material'
import Header from 'components/Header'
import PokemonList from 'components/PokemonList'
import Controls from 'components/Controls'
import Loader from 'components/Loader'
import Pagination from 'components/Pagination'
import { getPokemonDetails, getPokemons, getPokemonTypes, setChosenPokemon, setLimit, setPage } from 'store/pokemonSlice'
import { AppThunkDispatch } from 'store'
import {
	chosenPageSelector,
	isPokemonsLoadingSelector,
	pagesCountSelector,
	pokemonsListSelector,
	pokemonTagsListSelector,
	chosenPokemonSelector,
	pagesLimitSelector
} from 'store/pokemonSelectors'
import PokemonCard from 'components/PokemonCard'
import { OptionItem, Pokemon } from 'shared/types'
import classNames from 'classnames'
import PokemonDetails from 'components/PokemonDetails'
import Popup from 'components/Popup'

function MainPage(): JSX.Element {
	const dispatch = useDispatch<AppThunkDispatch>()
	const [modalOpen, setModalOpen] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [chosenTags, setChosenTags] = useState<Record<string, OptionItem<boolean>>>({})
	const pokemonList = useSelector(pokemonsListSelector)
	const chosenPokemon = useSelector(chosenPokemonSelector)
	const isPokemonsLoading = useSelector(isPokemonsLoadingSelector)
	const tagsList = useSelector(pokemonTagsListSelector)
	const limit = useSelector(pagesLimitSelector)
	const totalPageCount = useSelector(pagesCountSelector)
	const page = useSelector(chosenPageSelector)

	const onPaginationChange = useCallback((event: ChangeEvent<unknown>, newPage: number) => {
		dispatch(setPage(newPage))
	}, [dispatch])

	const onTagChange = useCallback((tag: OptionItem<boolean>) => {
		setChosenTags(prevState => ({
			...prevState,
			[tag.id]: {
				...tag,
				value: !prevState[tag.id]?.value
			}
		}))
		dispatch(setPage(1))
	}, [])

	const onSearchChange = useCallback((event: SyntheticEvent<HTMLInputElement>) => {
		setSearchText(event.currentTarget.value)
		dispatch(setPage(1))
	}, [dispatch])

	const handlePokemonClick = useCallback((pokemon: Pokemon) => {
		setModalOpen(true)
		dispatch(getPokemonDetails({ id: pokemon.id }))
	}, [dispatch])

	const onModalClose = useCallback(() => {
		setModalOpen(false)
		dispatch(setChosenPokemon(null))
	}, [dispatch])

	const onLimitChange = useCallback((event: SelectChangeEvent<number>): void => {
		dispatch(setLimit(Number(event.target.value)))
		dispatch(setPage(1))
	}, [dispatch])

	useEffect(() => {
		const filteredTags = Object.values(chosenTags).filter(item => item.value)
		dispatch(getPokemons({ searchText, type: filteredTags.map(item => item.id) }))
	}, [chosenTags, searchText, page, limit])

	useEffect(() => {
		if (!tagsList) {
			dispatch(getPokemonTypes())
		} else {
			setChosenTags(prevState => {
				const result: Record<string, OptionItem<boolean>> = {}
				for (const item of tagsList) {
					result[item.id] = {
						id: item.id,
						value: prevState[item.id]?.value || false,
						label: item.name
					}
				}

				return {
					...prevState,
					...result
				}
			})
		}
	}, [tagsList])

	return (
		<>
			<Header />
			<Container className={styles.container}>
				<Controls tags={chosenTags} onTagChange={onTagChange} searchText={searchText} onSearchChange={onSearchChange}/>
				<Loader className={classNames(styles.loader, { [styles.loader__visible]: isPokemonsLoading })}/>
				<PokemonList>
					{pokemonList?.map(pokemon => (
						<PokemonCard
							key={pokemon.id}
							pokemonData={pokemon}
							onPokemonClick={handlePokemonClick}
							isLoading={isPokemonsLoading}
						/>
					))}
				</PokemonList>
				<Popup isOpen={modalOpen} onModalClose={onModalClose} className={styles.modal}>
					<>{chosenPokemon && <PokemonDetails key={chosenPokemon.id} pokemonData={chosenPokemon} />}</>
				</Popup>
				<Pagination page={page} totalPageCount={totalPageCount} onChange={onPaginationChange} limit={limit} onLimitChange={onLimitChange}/>
			</Container>
		</>

	)
}

export default MainPage