import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Path } from '@constants/path';

import styles from './tab-link.module.css';

export const TabLink = () => (
    <ul className={styles.list}>
        <li className={styles.item}>
            <NavLink
                className={({ isActive }) =>
                    cn(styles.link, {
                        [styles.activeLink]: isActive,
                    })
                }
                to={Path.AUTH}
                end
            >
                Вход
            </NavLink>
        </li>
        <li className={styles.item}>
            <NavLink
                className={({ isActive }) =>
                    cn(styles.link, {
                        [styles.activeLink]: isActive,
                    })
                }
                to={Path.REGISTRATION}
                end
            >
                Регистрация
            </NavLink>
        </li>
    </ul>
);
