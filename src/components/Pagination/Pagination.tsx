import { ChangeEvent } from 'react'
import { Pagination as PaginationMaterial, Select, MenuItem, Box, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import classNames from 'classnames'
import styles from './Pagintaion.module.scss'

type Props = {
	page: number;
  totalPageCount: number;
  onChange: (event: ChangeEvent<unknown>, page: number) => void;
  className?: string;
	limit: number;
	onLimitChange: (event: SelectChangeEvent<number>) => void
}

function Pagination(props: Props) {
	const {
		totalPageCount,
		className,
		onChange,
		limit,
		onLimitChange,
		page
	} = props
	return (
		<Box className={classNames(styles.container, className)} >
			<FormControl>
				<InputLabel>Limit</InputLabel>
				<Select
					value={limit}
					label="Limit"
					onChange={onLimitChange}
				>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={20}>20</MenuItem>
					<MenuItem value={50}>50</MenuItem>

				</Select>
			</FormControl>

			<PaginationMaterial page={page} onChange={onChange} count={totalPageCount} shape="rounded" />
		</Box>
	)
}

export default Pagination