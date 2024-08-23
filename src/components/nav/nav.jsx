import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { dataItems } from './data-items';
import { Path } from '@constants/path';
import { getTraining } from '@redux/thunk/async/training';

import styles from './nav.module.css';

export const Nav = ({ collapsed }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onNavigateUrl = (url) => {
        dispatch(getTraining());
        navigate(url);
    };

    const onLogOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate(Path.AUTH);
    };

    return (
        <>
            {dataItems.map((el) => (
                <li
                    key={el.label}
                    className={cn(!collapsed ? styles.item : styles.itemMini, {
                        [styles.activeItem]: el.path === location.pathname,
                    })}
                >
                    <button
                        className={styles.navBtn}
                        onClick={el.label === 'Выход' ? onLogOut : () => onNavigateUrl(el.path)}
                    >
                        <img src={el.icon} alt={el.label} className={styles.icon} />
                        {!collapsed && <span className={styles.tag}>{el.label}</span>}
                    </button>
                </li>
            ))}
        </>
    );
};
