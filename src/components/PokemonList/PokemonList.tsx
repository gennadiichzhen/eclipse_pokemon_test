import { ReactNode } from 'react'
import styles from './PokemonList.module.scss'
import { Box } from '@mui/material'

type Props = {
	children?: ReactNode[]
}

function PokemonList({ children }: Props) {
	return (
		<Box className={styles.container}>
			{children}
		</Box>

	)
}

export default PokemonList