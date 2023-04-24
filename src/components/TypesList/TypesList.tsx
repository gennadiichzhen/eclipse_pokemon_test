import React from 'react'
import classNames from 'classnames'
import styles from './TypesList.module.scss'
import { Type } from 'shared/types'

type Props = {
  types: Type[];
  className?: string;
}

function TypesList(props: Props) {
	const { types, className } = props
	return (
		<ul className={classNames(styles.typeList, className)}>
			{types.map(type => (<li className={classNames(styles.colorType, styles[`colorType_${type.name.toLowerCase()}`])} key={type.id}>{type.name}</li>))}
		</ul>
	)
}

export default TypesList