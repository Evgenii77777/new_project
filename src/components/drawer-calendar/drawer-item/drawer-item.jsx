import { Input, InputNumber, Form } from 'antd';

import styles from '../drawer-calendar.module.css';

export const DrawerItem = ({ fields }) => (
    <>
        {fields.map((field, i) => (
            <div key={field.key} className={styles.wrapper}>
                <Form.Item name={[field.name, 'name']}>
                    <Input
                        placeholder='Упражнение'
                        data-test-id={`modal-drawer-right-input-exercise${i}`}
                    />
                </Form.Item>
                <div className={styles.list}>
                    <Form.Item
                        className={styles.inputFirst}
                        label={i === 0 ? 'Подходы' : 'Подходы, раз'}
                        colon={false}
                        name={[field.name, 'approaches']}
                    >
                        <InputNumber
                            addonBefore='+'
                            placeholder='1'
                            min={1}
                            data-test-id={`modal-drawer-right-input-approach${i}`}
                        />
                    </Form.Item>

                    <Form.Item
                        className={styles.listNewTraining}
                        label='Вес, кг'
                        name={[field.name, 'weight']}
                    >
                        <InputNumber
                            placeholder='0'
                            min={0}
                            data-test-id={`modal-drawer-right-input-weight${i}`}
                        />
                    </Form.Item>
                    <div className={styles.operand}>x</div>
                    <Form.Item
                        className={styles.listNewTraining}
                        label='Количество'
                        name={[field.name, 'replays']}
                    >
                        <InputNumber
                            placeholder='1'
                            min={1}
                            data-test-id={`modal-drawer-right-input-quantity${i}`}
                        />
                    </Form.Item>
                </div>
            </div>
        ))}
    </>
);
