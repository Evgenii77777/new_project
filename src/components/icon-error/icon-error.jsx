import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    WarningFilled,
    CloseCircleFilled,
    CheckCircleFilled,
    ExclamationCircleFilled,
    CloseCircleOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

import { Path } from '@constants/path';
import {
    feedbacksMessageSelector,
    feedbacksTypeSelector,
    isErrorSelector,
    trainingErrorMessageSelector,
    trainingListTypeSelector,
} from '@constants/selector';

import Back from './assets/image.png';

import styles from './icon-error.module.css';

export const IconError = () => {
    const location = useLocation();
    const isError = useSelector(isErrorSelector);
    const typeFeedbacks = useSelector(feedbacksTypeSelector);
    const messageFeed = useSelector(feedbacksMessageSelector);
    const isMessageErrorTraining = useSelector(trainingErrorMessageSelector);
    const typeErrTraining = useSelector(trainingListTypeSelector);

    const error =
        location.pathname.includes('error') &&
        location.pathname !== Path.ERROR_LOGIN &&
        location.pathname !== Path.ERROR_CHECK_EMAIL;
    const errorAuth = location.pathname === Path.CONFIRM_EMAIL && isError;

    return (
        <>
            {location.pathname === Path.CALENDAR && typeErrTraining && (
                <CloseCircleOutlined
                    className={styles.iconErrorCalendar}
                    style={{
                        color:
                            typeErrTraining === 'errorPostList'
                                ? 'rgb(255, 77, 79) '
                                : 'rgb(47, 84, 235)',
                    }}
                />
            )}
            {location.pathname === Path.CONFIRM_EMAIL && !isError && (
                <ExclamationCircleFilled
                    className={styles.icon}
                    style={{ color: 'rgb(47, 84, 235)' }}
                />
            )}
            {location.pathname === Path.ERROR_LOGIN && (
                <WarningFilled className={styles.icon} style={{ color: ' rgb(250, 173, 20) ' }} />
            )}
            {(location.pathname === Path.SUCCESS ||
                location.pathname === Path.SUCCES_CHANGE_PASS ||
                (typeFeedbacks === 'feedbacks' && !messageFeed)) && (
                <CheckCircleFilled className={styles.icon} style={{ color: 'rgb(82, 196, 26) ' }} />
            )}
            {(error || errorAuth || (typeFeedbacks === 'feedbacks' && messageFeed)) && (
                <CloseCircleFilled className={styles.icon} style={{ color: 'rgb(255, 77, 79) ' }} />
            )}
            {(location.pathname === Path.ERROR_CHECK_EMAIL ||
                (location.pathname === Path.FEEDBACKS && !typeFeedbacks) ||
                isMessageErrorTraining) && (
                <img className={styles.imgError} src={Back} alt='icon-error' />
            )}
        </>
    );
};
