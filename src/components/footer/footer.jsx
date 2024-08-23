import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Layout, Button, Card } from 'antd';
import 'antd/dist/antd.css';

import { Path } from '@constants/path';
import { getFeedbacks } from '@redux/thunk/async/feedbacks';

import styles from './footer.module.css';

const { Footer } = Layout;
const { Meta } = Card;

export const FooterMain = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onGetFeedbaacks = () => {
        navigate(Path.FEEDBACKS);
        dispatch(getFeedbacks());
    };

    return (
        <Footer className={styles.footer}>
            <Button
                data-test-id='see-reviews'
                className={styles.review}
                type='text'
                onClick={onGetFeedbaacks}
            >
                Смотреть отзывы
            </Button>
            <Card
                className={styles.wrap}
                actions={[
                    <Button className={styles.os} type='text'>
                        <AndroidFilled />
                        Android OS
                    </Button>,
                    <Button className={styles.os} type='text'>
                        <AppleFilled />
                        Apple iOS
                    </Button>,
                ]}
            >
                <Meta
                    className={styles.meta}
                    title='Скачать на телефон'
                    description='Доступно в PRO-тарифе'
                />
            </Card>
        </Footer>
    );
};
