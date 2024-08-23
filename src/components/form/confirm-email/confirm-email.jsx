import VerificationInput from 'react-verification-input';
import { Typography } from 'antd';
import 'antd/dist/antd.css';

import { IconError } from '@components/icon-error';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail } from '@redux/thunk/async/post-user';
import { useEffect, useState } from 'react';
import { LengthVerificationInput } from '@constants/constant';

import styles from './confirm-email.module.css';

const { Title, Paragraph } = Typography;

export const ConfirmEmail = () => {
    const dispatch = useDispatch();
    const [confirmValue, setConfirmvalue] = useState('');
    const isError = useSelector((state) => state.login.error);
    const email = localStorage.getItem('email');

    useEffect(() => {
        if (confirmValue.length === LengthVerificationInput && isError) {
            setConfirmvalue('');
        }
    }, [confirmValue, isError]);

    return (
        <>
            <div className={styles.wrapper}>
                <IconError />
                <Title className={styles.title} level={2}>
                    {!isError && 'Введите код для восстановления аккаунта'}
                    {isError && 'Неверный код. Введите код для восстановления аккаунта'}
                </Title>
                <Paragraph className={styles.text}>
                    Мы отправили вам на e-mail <span className={styles.email}>{email}</span>{' '}
                    шестизначный код. Введите его в поле ниже.
                </Paragraph>
                <VerificationInput
                    value={confirmValue}
                    onChange={setConfirmvalue}
                    placeholder=''
                    inputProps={{ 'data-test-id': 'verification-input' }}
                    onComplete={(value) =>
                        dispatch(
                            confirmEmail({
                                email: email,
                                code: value,
                            }),
                        )
                    }
                    classNames={{
                        container: styles.box,
                        character: isError ? styles.characterError : 'character',
                        characterInactive: styles.inactive,
                        characterSelected: styles.selected,
                        characterFilled: styles.filled,
                    }}
                />
                <Paragraph className={styles.text}>
                    Не пришло письмо? Проверьте папку Спам.
                </Paragraph>
            </div>
        </>
    );
};
