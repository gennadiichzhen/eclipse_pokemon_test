import { ReactElement } from 'react'
import { Box, Button, Modal } from '@mui/material'
import classNames from 'classnames'
import styles from './Popup.module.scss'

type Props = {
  isOpen: boolean;
  onModalClose: VoidFunction;
  children?: ReactElement;
  className?: string;
}

function Popup(props: Props) {
	const { children, onModalClose, className, isOpen } = props
	return (
		<Modal open={isOpen} onClose={onModalClose} className={classNames(styles.container, className)}>
			<Box className={styles.wrapper}>
				<Button onClick={onModalClose} variant="outlined" className={styles.button__close}>
        X
				</Button>
	  		{children}
			</Box>
		</Modal>
	)
}

export default Popup