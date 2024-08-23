import cn from 'classnames';
import { Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { IconError } from '@components/icon-error';
import { Path } from '@constants/path';

import styles from './fetch-error.module.css';

const { Title, Paragraph } = Typography;

export const FetchError = ({
    isMessage,
    title,
    text,
    id,
    textBtn,
    func,
    type,
    textBtnSecond,
    funcSecond,
    onClose,
}) => (
    <>
        <div
            data-test-id='modal-no-review'
            className={cn({ [styles.errorTrainingList]: location.pathname === Path.CALENDAR })}
        >
            <IconError />
            <Title
                data-test-id='modal-error-user-training-title'
                className={cn(styles.title, {
                    [styles.titleErr]: location.pathname === Path.ERRR0R_CHEK_EMAIL_NO_EXIST,
                    [styles.titleErrCalendar]: location.pathname === Path.CALENDAR,
                })}
                level={2}
            >
                {title}
            </Title>
            {location.pathname === Path.CALENDAR && (
                <Button
                    data-test-id='modal-error-user-training-button-close'
                    onClick={onClose}
                    className={styles.btnClose}
                >
                    <CloseOutlined style={{ color: 'rgb(140, 140, 140)' }} />
                </Button>
            )}
        </div>
        <Paragraph
            data-test-id='modal-error-user-training-subtitle'
            className={cn(styles.text, {
                [styles.textSuccess]: location.pathname === Path.SUCCES_CHANGE_PASS,
                [styles.textSuccessCalendar]: location.pathname === Path.CALENDAR,
            })}
        >
            {text}
        </Paragraph>
        <div className={styles.box}>
            <Button
                className={cn(styles.btnSend, {
                    [styles.btnSendErr]: location.pathname === Path.ERRR0R_CHEK_EMAIL_NO_EXIST,
                    [styles.btnSendErrCalendar]: location.pathname === Path.CALENDAR,
                    [styles.btnSendError]:
                        location.pathname === Path.ERROR_CHECK_EMAIL ||
                        (location.pathname === Path.FEEDBACKS && type !== Path.FEEDBACKS) ||
                        isMessage,
                })}
                onClick={func}
                data-test-id={id}
                type='primary'
            >
                {textBtn}
            </Button>
            {location.pathname === Path.FEEDBACKS && type === Path.FEEDBACKS && (
                <Button className={styles.secondBtn} type='default' funcSecond onClick={funcSecond}>
                    {textBtnSecond}
                </Button>
            )}
        </div>
    </>
);
