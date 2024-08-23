import { Nav } from '@components/nav';
import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import Logo from '../assets/logo.png';
import LogoMin from '../assets/logo_min.png';
import styles from '../sider.module.css';

const { Sider } = Layout;

export const SiderDesc = ({ collapsed, setCollapsed }) => (
    <Sider
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: '#fff' }}
        width={'208px'}
        collapsedWidth={'64px'}
    >
        <div className='logo' />
        <img
            className={collapsed ? styles.logo : styles.logoFull}
            src={collapsed ? LogoMin : Logo}
            alt='logo'
        />
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
            data-test-id='sider-switch'
            style={{ width: '20px' }}
            onClick={() => setCollapsed(!collapsed)}
            className='trigger'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
    </Sider>
);
