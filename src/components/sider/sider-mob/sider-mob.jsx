import { Nav } from '@components/nav';
import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import LogoMobile from '../assets/logo_mob.png';
import styles from '../sider.module.css';

const { Sider } = Layout;

export const SiderMob = ({ collapsed, setCollapsed }) => (
    <Sider
        className={collapsed ? styles.siderMobilefull : styles.siderMobile}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: '#fff' }}
        width={'104px'}
        collapsedWidth={'0'}
    >
        <div className='logo' />
        <img className={styles.logoMob} src={collapsed ? '' : LogoMobile} alt='logo' />
        <Menu
            className={styles.menu}
            id='menu'
            mode='inline'
            defaultSelectedKeys={['1']}
            style={{ border: 'none' }}
        >
            <Nav collapsed={collapsed} />
        </Menu>
        <Button
            data-test-id='sider-switch-mobile'
            onClick={() => setCollapsed(!collapsed)}
            className='trigger'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
    </Sider>
);
