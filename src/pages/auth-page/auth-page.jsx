import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import 'antd/dist/antd.css';
import cn from 'classnames';

import { Overlay } from '@components/overlay';
import { postLogin, postReg } from '@redux/thunk/async/post-user';
import { addUser, deleteType } from '@redux/actions/post-user';
import { AuthForm } from '@components/form/auth-form';
import { RegForm } from '@components/form/reg-form';
import { TYPE } from '@constants/type';
import { Path } from '@constants/path';
import { TabLink } from '@components/tab-link';
import {
    isErrorSelector,
    messageSelector,
    statusSelector,
    typeSelector,
} from '@constants/selector';
import { history } from '@redux/configure-store';
import { baseURL } from '@redux/api/api';

import Logo from './assets/logo.png';
import styles from './auth-page.module.css';

export const AuthPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [emailValid, setEmailValid] = useState(false);
    const isError = useSelector(isErrorSelector);
    const status = useSelector(statusSelector);
    const type = useSelector(typeSelector);
    const message = useSelector(messageSelector);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isError && type === TYPE.LOGIN) {
            navigate(Path.ERROR_LOGIN);
        } else if (type === TYPE.LOGIN && !isError) {
            navigate(Path.MAIN);
            dispatch(deleteType(''));
        } else if (!isError && type === TYPE.REGISTRATION) {
            navigate(Path.SUCCESS);
        } else if (status === 409 && type === TYPE.REGISTRATION) {
            navigate(Path.ERROR_USER_EXIST);
        } else if (status !== 409 && type === TYPE.REGISTRATION && isError) {
            navigate(Path.ERROR);
        } else if (type === TYPE.FORGOT && !isError) {
            navigate(Path.CONFIRM_EMAIL);
            dispatch(deleteType(''));
        } else if (type === TYPE.FORGOT && message === 'Email не найден' && isError) {
            navigate(Path.ERRR0R_CHEK_EMAIL_NO_EXIST);
        } else if (type === TYPE.FORGOT && isError && message !== 'Email не найден') {
            navigate(Path.ERROR_CHECK_EMAIL);
        } else if (type === TYPE.CONFIRM && !isError) {
            navigate(Path.CHANGE_PASS);
            dispatch(deleteType(''));
        } else if (type === TYPE.CHANGE && isError) {
            navigate(Path.ERROR_CHANGE_PASS);
        } else if (type === TYPE.CHANGE && !isError) {
            navigate(Path.SUCCES_CHANGE_PASS);
        }
    }, [dispatch, isError, message, navigate, status, type]);

    const onFinish = (values) => {
        location.pathname === Path.AUTH
            ? dispatch(postLogin(values)).then(() => {
                  if (localStorage.getItem('JWT') || sessionStorage.getItem('JWTSession')) {
                      navigate(Path.MAIN);
                  }
              }) && dispatch(addUser(values))
            : dispatch(
                  postReg({
                      email: values.email,
                      password: values.password,
                  }),
              ) &&
              dispatch(
                  addUser({
                      email: values.email,
                      password: values.password,
                  }),
              );
    };

    const validateMessages = {
        required: '${label}',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
    };

    const signInGoogleHandler = () => {
        window.location.href = `${baseURL}/auth/google`;
        localStorage.setItem('JWT', history.location.state.from.search.split('=')[1]);
    };

    return (
        <section className={styles.wrapper}>
            <Overlay />
            <div
                className={cn(styles.container, {
                    [styles.containerPass]:
                        location.pathname === Path.CHANGE_PASS ||
                        location.pathname === Path.CONFIRM_EMAIL,
                    [styles.containerReg]: location.pathname === Path.REGISTRATION,
                })}
            >
                {(location.pathname === Path.AUTH || location.pathname === Path.REGISTRATION) && (
                    <>
                        <img className={styles.logo} src={Logo} alt='logo' />
                        <TabLink />
                        <Form
                            className={styles.form}
                            validateMessages={validateMessages}
                            initialValues={{ remember: false }}
                            onFinish={onFinish}
                            form={form}
                            onFieldsChange={() =>
                                setEmailValid(
                                    form.isFieldTouched('email') &&
                                        form.getFieldError('email').length === 0,
                                )
                            }
                        >
                            {location.pathname === Path.AUTH && (
                                <AuthForm email={form.getFieldValue('email')} form={form} />
                            )}
                            {location.pathname === Path.REGISTRATION && <RegForm />}
                            <Form.Item className={styles.box} style={{ marginBottom: '0' }}>
                                <Button
                                    className={styles.enterBtn}
                                    type='primary'
                                    htmlType='submit'
                                    data-test-id={
                                        location.pathname === Path.AUTH
                                            ? 'login-submit-button'
                                            : 'registration-submit-button'
                                    }
                                >
                                    Войти
                                </Button>
                                <Button
                                    className={styles.googleBtn}
                                    type='primary'
                                    onClick={signInGoogleHandler}
                                >
                                    <div className={styles.googleImg}>
                                        <GooglePlusOutlined />
                                    </div>
                                    {location.pathname === Path.AUTH ? 'Войти ' : 'Регистрация '}{' '}
                                    через Google
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
                {(location.pathname === Path.CONFIRM_EMAIL ||
                    location.pathname === Path.CHANGE_PASS) && <Outlet />}
            </div>
        </section>
    );
};
