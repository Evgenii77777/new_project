import cn from 'classnames';

import { Path } from '@constants/path';

import styles from './wrapper.module.css';

export const Wrapper = ({ children, url }) => (
    <div className={styles.containerError}>
        <div className={cn(styles.boxError, { [styles.boxErrorTraining]: url === Path.CALENDAR })}>
            {children}
        </div>
    </div>
);
