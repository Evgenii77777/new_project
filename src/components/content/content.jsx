import { HeartFilled, CalendarOutlined, ProfileOutlined } from '@ant-design/icons';
import { Layout, Typography, List, Card, Col, Row, Button } from 'antd';
import 'antd/dist/antd.css';

import styles from './content.module.css';

const { Content } = Layout;
const { Title } = Typography;
const data = [
    '— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки; ',
    '— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;',
    '— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;',
    '— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.',
];

export const ContentMain = ({ onNavigateUrl }) => (
    <Content className={styles.main}>
        <List
            className={styles.list}
            header={<div>С CleverFit ты сможешь:</div>}
            dataSource={data}
            renderItem={(item) => (
                <List.Item className={styles.item} style={{ padding: 0 }}>
                    <Typography.Text className={styles.text}> {item}</Typography.Text>
                </List.Item>
            )}
        />
        <Title className={styles.phrase} level={4} style={{ fontWeight: 500 }}>
            CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
            откладывай на завтра — начни тренироваться уже сегодня!
        </Title>
        <div className='site-card-wrapper'>
            <Row gutter={16}>
                <Col>
                    <Card className={styles.card} title='Расписать тренировки' bordered={false}>
                        <HeartFilled className={styles.icon} /> Тренировки
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.card} title='Назначить календарь' bordered={false}>
                        <Button
                            className={styles.btnCalendar}
                            onClick={onNavigateUrl}
                            data-test-id='menu-button-calendar'
                        >
                            <CalendarOutlined className={styles.icon} />
                            Календарь
                        </Button>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.card} title='Заполнить профиль' bordered={false}>
                        <ProfileOutlined className={styles.icon} /> Профиль
                    </Card>
                </Col>
            </Row>
        </div>
    </Content>
);
