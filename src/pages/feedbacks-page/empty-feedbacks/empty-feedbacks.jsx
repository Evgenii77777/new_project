import { Typography, Button } from 'antd';
import 'antd/dist/antd.css';

import styles from '../feedbacks-page.module.css';

const { Title } = Typography;

export const EmptyFeedbacks = ({ showModal }) => (
    <section className={styles.wrapEmpty}>
        <div className={styles.boxEmpty}>
            <div className={styles.container}>
                <Title className={styles.title} level={4} style={{ fontWeight: 500 }}>
                    Оставьте свой отзыв первым
                </Title>
                <Typography.Text className={styles.text}>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями, и помогите им сделать
                    правильный выбор.
                </Typography.Text>
            </div>
            <Button
                data-test-id='write-review'
                className={styles.btnOpenModal}
                type='primary'
                onClick={showModal}
            >
                Написать отзыв
            </Button>
        </div>
    </section>
);
