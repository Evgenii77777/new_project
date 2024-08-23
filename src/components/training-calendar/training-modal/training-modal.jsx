import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Badge, Button, Select, Typography } from 'antd';
import { CloseOutlined, ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { postTrainingList, putTrainingList } from '@redux/thunk/async/training';

import EmptyList from './assets/empty-image.png';

import styles from './training-modal.module.css';
import moment from 'moment';

const { Title, Paragraph } = Typography;

export const TrainigModal = ({
    handleClose,
    date,
    isSunday,
    activeDateModal,
    optionsList,
    listTraining,
    setListTraining,
    showDrawer,
    typeTraining,
    setTypeTraining,
    listData,
    isTomorrow,
    setIsEdit,
    newExercises,
    setNewExercises,
}) => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const activeExercises = listData?.filter((el) => el.name === typeTraining);
    const findedExercises = newExercises?.filter(
        (el) => el.name === typeTraining && el.date === date,
    )[0];

    const listActiveDayTrayning = listData?.filter(
        (el) => moment(el.date).format('DD.MM.yyyy') === activeDateModal,
    );
    const selectOptions = optionsList.filter((item) =>
        listActiveDayTrayning?.every((el) => el.name !== item.value),
    );

    const onChangeStep = (num) => setStep(num);

    const onEditTraining = (train) => {
        if (step !== 3) {
            setTypeTraining(train);
            setStep(3);
        } else {
            setIsEdit(false);
            showDrawer();
        }
    };

    const handleChange = (value) => {
        setTypeTraining(value);
        setStep(3);
    };

    return (
        <div className={cn(styles.modal, { [styles.rigthModal]: isSunday })}>
            <div className={styles.box}>
                <div className={styles.wrapp}>
                    {step === 1 && (
                        <>
                            <Title
                                className={styles.title}
                                level={3}
                            >{`Тренировки на ${date}`}</Title>
                            <Button className={styles.btnClose} onClick={handleClose}>
                                <CloseOutlined style={{ color: 'rgb(140, 140, 140)' }} />
                            </Button>
                        </>
                    )}
                    {(step === 2 || step === 3) && (
                        <>
                            <Button className={styles.btnBack} onClick={() => onChangeStep(1)}>
                                <ArrowLeftOutlined style={{ color: 'rgb(140, 140, 140)' }} />
                            </Button>
                            <Select
                                className={styles.select}
                                defaultValue={typeTraining ? typeTraining : 'Выбор типа тренировки'}
                                onChange={handleChange}
                                options={selectOptions}
                            />
                        </>
                    )}
                </div>

                <div>
                    {!listActiveDayTrayning.length &&
                        !newExercises?.filter((e) => e.date === date).length &&
                        step === 1 && (
                            <Paragraph className={styles.text}>Нет активных тренировок</Paragraph>
                        )}
                    {!newExercises?.filter((e) => e.date === date).length &&
                        !listActiveDayTrayning.length && (
                            <img className={styles.emptyImg} src={EmptyList} alt='icon-empty' />
                        )}
                    {(listActiveDayTrayning.length > 0 || newExercises.length > 0) &&
                        step !== 3 && (
                            <ul>
                                {listActiveDayTrayning?.map((el) => (
                                    <li key={el.key} className={styles.itemBadge}>
                                        <Badge
                                            color={optionsList
                                                .filter((e) => e.value === el.name)
                                                .map((i) => i.color)}
                                            text={el.name}
                                        />
                                        {step === 1 && (
                                            <Button
                                                id={el.name}
                                                className={styles.btnEdit}
                                                onClick={(el) =>
                                                    onEditTraining(el.currentTarget.id)
                                                }
                                            >
                                                <EditOutlined
                                                    style={{ color: 'rgb(47, 84, 235)' }}
                                                />
                                            </Button>
                                        )}
                                    </li>
                                ))}
                                {newExercises
                                    ?.filter((e) => e.date === date)
                                    ?.map((el) => (
                                        <li key={el.key} className={styles.itemBadge}>
                                            <Badge
                                                color={optionsList
                                                    .filter((e) => e.value === el.name)
                                                    .map((i) => i.color)}
                                                text={el.name}
                                            />
                                            {step === 1 && (
                                                <Button
                                                    id={el.name}
                                                    className={styles.btnEdit}
                                                    onClick={(el) =>
                                                        onEditTraining(el.currentTarget.id)
                                                    }
                                                >
                                                    <EditOutlined
                                                        style={{ color: 'rgb(47, 84, 235)' }}
                                                    />
                                                </Button>
                                            )}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    {(listActiveDayTrayning.length > 0 || newExercises.length > 0) &&
                        step === 3 && (
                            <ul>
                                {listActiveDayTrayning
                                    ?.filter((item) => item.name === typeTraining)
                                    ?.map((el) =>
                                        el.exercises.map((e) => (
                                            <li className={styles.itemApproach} key={e.name}>
                                                <Paragraph className={styles.text}>
                                                    {e.name}
                                                </Paragraph>
                                                <Button
                                                    className={styles.btnEdit}
                                                    onClick={onEditTraining}
                                                >
                                                    <EditOutlined
                                                        style={{ color: 'rgb(47, 84, 235)' }}
                                                    />
                                                </Button>
                                            </li>
                                        )),
                                    )}
                                {newExercises
                                    ?.filter(
                                        (item) => item.name === typeTraining && item.date === date,
                                    )
                                    ?.map((el) =>
                                        el.exercises.map((e) => (
                                            <li className={styles.itemApproach} key={e.name}>
                                                <Paragraph className={styles.text}>
                                                    {e.name}
                                                </Paragraph>
                                                <Button
                                                    className={styles.btnEdit}
                                                    onClick={onEditTraining}
                                                >
                                                    <EditOutlined
                                                        style={{ color: 'rgb(47, 84, 235)' }}
                                                    />
                                                </Button>
                                            </li>
                                        )),
                                    )}
                            </ul>
                        )}
                </div>
            </div>
            <div className={styles.btnBox}>
                {step === 1 && (
                    <>
                        <Button
                            className={styles.btnCreate}
                            type='primary'
                            onClick={isTomorrow ? () => onChangeStep(2) : ''}
                        >
                            Создать тренировку
                        </Button>
                    </>
                )}
                {(step === 2 || step === 3) && (
                    <>
                        <Button
                            className={styles.btnAdd}
                            type='default'
                            onClick={isTomorrow ? showDrawer : ''}
                            disabled={!typeTraining || listData?.length > 5}
                        >
                            Добавить упражнения
                        </Button>
                        <Button
                            className={styles.btnSave}
                            type='text'
                            onClick={() => {
                                findedExercises.id
                                    ? dispatch(
                                          putTrainingList({
                                              training: {
                                                  name: findedExercises.name,
                                                  exercises: findedExercises.exercises,
                                                  date: moment(
                                                      `${findedExercises.date.split('.')[2]}-${
                                                          findedExercises.date.split('.')[1]
                                                      }-${
                                                          findedExercises.date.split('.')[0]
                                                      } 19:00:00`,
                                                  ).format(),
                                              },
                                              trainingId: findedExercises.id,
                                          }),
                                      )
                                    : dispatch(
                                          postTrainingList({
                                              name: findedExercises.name,
                                              exercises: findedExercises.exercises,
                                              date: moment(
                                                  `${findedExercises.date.split('.')[2]}-${
                                                      findedExercises.date.split('.')[1]
                                                  }-${findedExercises.date.split('.')[0]} 19:00:00`,
                                              ).format(),
                                          }),
                                      );
                                setStep(1);
                                setNewExercises([]);
                            }}
                            disabled={!listData.length && !newExercises.length}
                        >
                            Сохранить
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
