import { SettingOutlined } from '@ant-design/icons';
import { Typography, Button, Layout } from 'antd';
import 'antd/dist/antd.css';

import styles from './header.module.css';

const { Title } = Typography;
const { Header } = Layout;

export const HeaderMain = () => (
    <Header className={styles.header}>
        <div className={styles.box}>
            <Title className={styles.title} style={{ margin: 0 }}>
                Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                мечты!
            </Title>
            <Button
                type='text'
                className={styles.settings}
                icon={<SettingOutlined className={styles.iconSetting} />}
            >
                <span className={styles.settingsText}> Настройки</span>
            </Button>
        </div>
    </Header>
);
