import React from 'react'
import classNames from 'classnames'
import styles from './Loader.module.scss'

type Props = {
	className?: string;
}

function Loader(props: Props) {
	return (
		<div className={classNames(styles.ldsDualRing, props.className)} />
	)
}

export default Loader