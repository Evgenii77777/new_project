import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

import { SiderDesc } from '@components/sider/sider-desc';
import { SiderMob } from '@components/sider/sider-mob';

import styles from './layout.module.css';

export const LayoutMain = ({ children, routes }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={styles.layout}>
            <SiderDesc collapsed={collapsed} setCollapsed={setCollapsed} />
            <SiderMob collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout className={styles.container} style={{ width: '100%' }}>
                <Breadcrumb className={styles.breadcrumb}>
                    {routes?.map((el, idx) => (
                        <Breadcrumb.Item key={idx}>
                            {el?.path ? <Link to={`../../${el.path}`}>{el.name}</Link> : el.name}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                {children}
            </Layout>
        </Layout>
    );
};
