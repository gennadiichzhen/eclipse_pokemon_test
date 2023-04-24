import { SyntheticEvent } from 'react'
import styles from './Controls.module.scss'
import { Paper, Input, MenuItem, Box } from '@mui/material'
import { OptionItem } from 'shared/types'
import classNames from 'classnames'

type Props = {
	tags: Record<string, OptionItem<boolean>>;
	onTagChange: (item: OptionItem<boolean>) => void;
	searchText: string;
	onSearchChange: (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Controls(props: Props) {
	const { tags, onTagChange, onSearchChange, searchText } = props
	return (
		<Paper className={styles.container}>
			<Input placeholder="Pokemon name..." onChange={onSearchChange} value={searchText}/>
			<Box className={styles.tags}>
				{Object.values(tags)?.map(tag => (
					<MenuItem className={classNames(styles.tags_item, {
						[styles[`colorType_${tag.label.toLowerCase()}`]]: tag.value
					})} key={tag.id} value={tag.id} onClick={() => onTagChange(tag)}>
						{tag.label}
					</MenuItem>
				))}
			</Box>
		</Paper>
	)
}

export default Controls