import React from 'react'
import styles from './Header.module.scss'
import Logo from 'assets/logo.png'
import { Container } from '@mui/material'

function Header() {
	return (
		<header className={styles.header}>
			<Container className={styles.container}>
				<img src={Logo} alt="logo" className={styles.logo}/>
				<h4 style={{ color: 'white' }}>
					Gotta catch them all!
				</h4>
			</Container>
		</header>
	)
}

export default Header