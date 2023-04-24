import styles from './PokemonCard.module.scss'
import { Box, Card, Divider, Stack, Skeleton as SkeletonMaterial } from '@mui/material'
import { Pokemon } from 'shared/types'
import normalizeSpriteUrl from 'shared/helpers/normalizeSpriteUrl'
import TypesList from 'components/TypesList'

type Props = {
	pokemonData: Pokemon;
	onPokemonClick: (pokemon: Pokemon) => void;
	isLoading?: boolean;
}

function PokemonCard(props: Props) {
	const { pokemonData, onPokemonClick, isLoading } = props
	const imgSrc = normalizeSpriteUrl(pokemonData.sprites)
	const Skeleton = function() {
		return (
			<Stack spacing={1}>
				<SkeletonMaterial variant="text" sx={{ fontSize: '1rem' }} />
				<SkeletonMaterial variant="circular" width={40} height={40} />
				<SkeletonMaterial variant="rectangular" width={210} height={60} />
				<SkeletonMaterial variant="rounded" width={210} height={60} />
		  </Stack>	  
		)
	}

	if (isLoading) {
		return <Skeleton />
	}

	return (
		<Card className={styles.container} onClick={() => onPokemonClick(pokemonData)}>
			<Box className={styles.title} title={pokemonData.name}>{pokemonData.name}</Box>
			<Divider className={styles.divider}/>
			<img className={styles.image} src={imgSrc} alt={pokemonData.name}/>
			<Box className={styles.info_container}>
				<Divider className={styles.divider}/>
				<Box className={styles.info}>
					<Box className={styles.info_item}>
						<p>Types:</p>
						<TypesList types={pokemonData.types} />
					</Box>
					<Box className={styles.info_item}>
						<p>Weight:</p>
						<span>{pokemonData.weight}</span>
					</Box>
					<Box className={styles.info_item}>
						<p>Height:</p>
						<span>{pokemonData.height}</span>
					</Box>
				</Box>
			</Box>
		</Card>
	)
}

export default PokemonCard