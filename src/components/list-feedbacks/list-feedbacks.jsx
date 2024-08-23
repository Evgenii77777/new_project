import cn from 'classnames';
import { Avatar, Rate, List, Typography } from 'antd';
import 'antd/dist/antd.css';

import styles from './list-feedbacks.module.css';

export const ListFeedbacks = ({ fullFeed, feedbacksArr, newFeedArr, changeFormatTime }) => (
    <List
        className={cn(styles.list, { [styles.fullList]: fullFeed })}
        itemLayout='horizontal'
        dataSource={fullFeed ? feedbacksArr : newFeedArr}
        renderItem={(item) => (
            <List.Item className={styles.item}>
                <List.Item.Meta
                    className={styles.meta}
                    avatar={<Avatar src={item.imageSrc} className={styles.imgAvatar} />}
                    title={item.fullName || 'Пользователь'}
                />
                <div className={styles.box}>
                    <div className={styles.wrapper}>
                        <Rate className={styles.rate} disabled defaultValue={item.rating} />
                        <Typography.Text className={styles.time}>
                            {changeFormatTime(item.createdAt)}
                        </Typography.Text>
                    </div>
                    <Typography.Text className={styles.text}>{item.message}</Typography.Text>
                </div>
            </List.Item>
        )}
    />
);
