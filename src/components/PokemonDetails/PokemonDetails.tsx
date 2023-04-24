import Slider, { Settings } from 'react-slick'
import { Box, Paper } from '@mui/material'
import classNames from 'classnames'
import styles from './PokemonDetails.module.scss'
import { normalizeSpriteUrlList } from 'shared/helpers/normalizeSpriteUrl'
import { Pokemon } from 'shared/types'
import TypesList from 'components/TypesList'

type Props = {
    pokemonData: Pokemon;
		className?: string;
}

const settings: Settings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1
}

function PokemonDetails(props: Props) {
	const { pokemonData, className } = props
	// const imgSrc = normalizeSpriteUrl(pokemonData.sprites)
	const imgSrcList = Object.entries(normalizeSpriteUrlList(pokemonData.sprites))
	return (
		<Paper className={classNames(styles.container, className)}>
			<h4 className={styles.title}>{pokemonData.name}</h4>
			<Box className={styles.info}>
				<Slider {...settings} className={styles.slider}>
					{imgSrcList.map(([imgName, src]) => <img className={styles.slider_image} key={imgName} title={imgName} src={src} alt={imgName}/>)}
				</Slider>
				<ul className={styles.stats}>
					{pokemonData.stats?.map(stat => (
						<li key={stat.name} className={styles.stats_item}>
							<span>{stat.name}: </span>
							<span>{stat.base_stat}</span>
						</li>
					))}
				</ul>
				<Box className={styles.types_container}>
					<span>
						Types:
					</span>
					<TypesList types={pokemonData.types} className={styles.types}/>
				</Box>
			</Box>
		</Paper>
	)
}

export default PokemonDetails