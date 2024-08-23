import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Overlay } from '@components/overlay';
import { deleteType } from '@redux/actions/post-user';
import { changePassword, forgotPassword, postReg } from '@redux/thunk/async/post-user';
import { dataMode } from './data-mode';
import { Path } from '@constants/path';
import { emailSelector, typeSelector, userSelector } from '@constants/selector';
import { FetchError } from '@components/fetch-error';

import styles from './result-page.module.css';

export const ResultPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const type = useSelector(typeSelector);
    const user = useSelector(userSelector);
    const email = useSelector(emailSelector);

    const DATA_RESULT = dataMode.filter((el) => el.type === location.pathname);

    const onHandleNavigation = () => {
        if (
            location.pathname === Path.ERROR_LOGIN ||
            location.pathname === Path.SUCCESS ||
            location.pathname === Path.SUCCES_CHANGE_PASS ||
            location.pathname === Path.ERRR0R_CHEK_EMAIL_NO_EXIST
        ) {
            navigate(Path.AUTH);
            dispatch(deleteType(''));
        } else if (location.pathname === Path.ERROR_USER_EXIST) {
            navigate(Path.REGISTRATION);
            dispatch(deleteType(''));
        } else if (location.pathname === Path.ERROR) {
            navigate(Path.REGISTRATION);
            dispatch(postReg(user));
            dispatch(deleteType(''));
        } else if (location.pathname === Path.ERROR_CHANGE_PASS) {
            dispatch(changePassword(user));
            dispatch(deleteType(''));
        } else if (location.pathname === Path.ERROR_CHECK_EMAIL) {
            navigate(Path.AUTH);
            dispatch(deleteType(''));
            dispatch(forgotPassword(email));
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('JWT') && !sessionStorage.getItem('JWTSession') && !type) {
            navigate(Path.AUTH);
        }
    }, [navigate, type]);

    return (
        <section className={styles.box}>
            <Overlay />
            <div className={styles.wrapper}>
                {DATA_RESULT?.map((el) => (
                    <FetchError
                        title={el.title}
                        text={el.text}
                        id={el.id}
                        textBtn={el.textBtn}
                        func={onHandleNavigation}
                    />
                ))}
            </div>
        </section>
    );
};
