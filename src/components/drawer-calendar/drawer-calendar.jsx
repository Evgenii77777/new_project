import { useEffect } from 'react';
import { Button, Drawer, Typography, Badge, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';

import { DrawerItem } from './drawer-item';
import { EditOutlined } from '@ant-design/icons';

import styles from './drawer-calendar.module.css';

const { Title } = Typography;

export const DrawerCalendar = ({
    showDrawer,
    openDrawer,
    date,
    typeTraining,
    listTraining,
    setListTraining,
    optionsList,
    listApproach,
    isEdit,
    setIsEdit,
    setNewExercises,
    newExercises,
}) => {
    const [form] = useForm();

    const formInitialProps = listTraining?.find(
        (el) => moment(el.date).format('DD.MM.yyyy') === date && el.name === typeTraining,
    );
    let findedExercises = formInitialProps?.exercises;

    const formInitialPropsNew = newExercises?.find(
        (el) => el.date === date && el.name === typeTraining,
    );
    let findedExercisesNew = formInitialPropsNew?.exercises;

    useEffect(() => {
        if (findedExercises?.length > 0 && !findedExercisesNew?.length) {
            form.setFieldsValue({ exercises: findedExercises });
        } else if (findedExercisesNew?.length > 0 && !findedExercises?.length) {
            form.setFieldsValue({ exercises: findedExercisesNew });
        } else if (findedExercises?.length > 0 && findedExercisesNew?.length > 0) {
            form.setFieldsValue({ exercises: [...findedExercises, ...findedExercisesNew] });
        } else {
            form.setFieldsValue({
                exercises: [
                    {
                        name: '',
                        weight: 1,
                        replays: 0,
                        approaches: 1,
                    },
                ],
            });
        }
    }, [findedExercises, findedExercisesNew, form]);

    const onHandleDrawer = () => {
        showDrawer();
        setIsEdit(true);
        const { exercises } = form.getFieldsValue();
        const newExercisesItem = exercises.map((el) => {
            if (el.name) {
                return {
                    name: el.name || '',
                    replays: el.replays || 1,
                    weight: el.weight || 0,
                    approaches: el.approaches || 3,
                };
            } else return;
        });

        setNewExercises([
            {
                name: typeTraining,
                date,
                exercises:
                    findedExercises?.length > 0
                        ? [...newExercisesItem]
                              .filter((el) => findedExercises?.every((e) => el.name !== e.name))
                              .filter((el) => el.name)
                        : [...newExercisesItem],
                id: isEdit ? '' : formInitialProps._id,
            },
        ]);
    };

    return (
        <>
            <Drawer
                className={styles.drawer}
                title={
                    isEdit ? (
                        '+ Добавление упражнений'
                    ) : (
                        <>
                            <EditOutlined style={{ color: 'rgb(47, 84, 235)' }} /> Редактирование
                        </>
                    )
                }
                width={408}
                onClose={onHandleDrawer}
                open={openDrawer}
                placement='right'
                getContainer={false}
            >
                <div className={styles.box}>
                    {listApproach?.map((el) => (
                        <Badge color={el.color} text={el.value} />
                    ))}
                    <Title className={styles.title} level={3}>
                        {date}
                    </Title>
                </div>
                <Form form={form}>
                    <Form.List name='exercises' initialValue={findedExercises}>
                        {(fields, { add }) => (
                            <>
                                <DrawerItem fields={fields} />
                                <div>
                                    <Button className={styles.addBtn} type='text' onClick={add}>
                                        + Добавить ещё
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Drawer>
        </>
    );
};
