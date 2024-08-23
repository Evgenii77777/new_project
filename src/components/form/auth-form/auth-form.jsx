import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';

import { forgotPassword } from '@redux/thunk/async/post-user';
import { emailReg } from '@components/validation/validation';

import styles from '../../../pages/auth-page/auth-page.module.css';

export const AuthForm = ({ email, form }) => {
    const dispatch = useDispatch();
    const [checked, setCheked] = useState(false);

    const verifyCheckEmail = () => {
        form.validateFields(['email'])
            .then(() => {
                dispatch(forgotPassword(email));
                localStorage.setItem('email', email);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Form.Item
                name='email'
                rules={[{ required: true, message: '', type: 'email', pattern: emailReg }]}
            >
                <Input data-test-id='login-email' type='email' addonBefore='e-mail:' />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        min: 8,
                        message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                    },
                ]}
                hasFeedback
            >
                <Input.Password data-test-id='login-password' placeholder='Пароль' />
            </Form.Item>
            <Form.Item className={styles.boxConfirm} style={{ marginBottom: '26px' }}>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox
                        data-test-id='login-remember'
                        onChange={(e) => setCheked(e.target.checked)}
                    >
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Button
                    data-test-id='login-forgot-button'
                    type='text'
                    className={styles.rememberBtn}
                    onClick={verifyCheckEmail}
                >
                    Забыли пароль?
                </Button>
            </Form.Item>
        </>
    );
};
