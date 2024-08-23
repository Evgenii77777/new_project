import { Form, Input } from 'antd';

import { emailReg, passReg } from '@components/validation/validation';

import styles from '../../../pages/auth-page/auth-page.module.css';

export const RegForm = () => (
    <>
        <Form.Item name='email' rules={[{ required: true, message: '', pattern: emailReg }]}>
            <Input type='email' addonBefore='e-mail:' data-test-id='registration-email' />
        </Form.Item>
        <Form.Item
            name='password'
            rules={[
                {
                    required: true,
                    min: 8,
                    pattern: passReg,
                    message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                },
            ]}
            hasFeedback
            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
        >
            <Input.Password placeholder='Пароль' data-test-id='registration-password' />
        </Form.Item>
        <Form.Item
            className={styles.confirm}
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Пароли не совпадают',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают'));
                    },
                }),
            ]}
        >
            <Input.Password
                placeholder='Повторите пароль'
                data-test-id='registration-confirm-password'
            />
        </Form.Item>
    </>
);
