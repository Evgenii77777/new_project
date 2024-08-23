import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'antd';
import 'antd/dist/antd.css';
import ruRu from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';

import { LayoutMain } from '@components/layout';
import {
    trainingErrorMessageSelector,
    trainingListSelector,
    trainingListTypeSelector,
} from '@constants/selector';
import { Path } from '@constants/path';
import { daysShort, monthsShort, optionsList } from '@constants/constant';
import { getTrainingList } from '@redux/thunk/async/training';
import { FetchError } from '@components/fetch-error';
import { Wrapper } from '@components/wrapper';
import { dataMode } from '@pages/result-page/data-mode';
import { deleteType } from '@redux/actions/post-user';
import { DrawerCalendar } from '@components/drawer-calendar';
import { CalendarCell } from '@components/training-calendar/calendar-cell';

import styles from './calendar-page.module.css';

moment.locale('ru');

moment.updateLocale('ru', {
    weekdaysMin: daysShort,
    monthsShort,
    week: { dow: 1 },
});

const routes = [
    {
        path: 'main',
        name: 'Главная',
    },
    {
        name: 'Календарь',
    },
];

export const CalendarPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeDateModal, setActiveDateModal] = useState('');
    const [typeTraining, setTypeTraining] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const isErrorGetTrainingMessage = useSelector(trainingErrorMessageSelector);
    const isErrorGetTrainingListType = useSelector(trainingListTypeSelector);
    const trainingData = useSelector(trainingListSelector);
    const [listTraining, setListTraining] = useState([]);
    const [newExercises, setNewExercises] = useState([]);
    const DATA_RESULT = dataMode.filter((el) => el.type === Path.CALENDAR && !el.training);
    const DATA_POST_RESULT = dataMode.filter((el) => el.type === Path.CALENDAR && el.post);
    const onHandleClose = () => dispatch(deleteType(''));
    const onHandleNavigate = () => {
        dispatch(deleteType(''));
        dispatch(getTrainingList());
    };

    useEffect(() => {
        if (isErrorGetTrainingMessage) {
            navigate(Path.MAIN);
        } else {
            dispatch(getTrainingList());
        }

        if (trainingData) {
            setListTraining(trainingData);
        } else {
            setListTraining([]);
        }
    }, [dispatch, isErrorGetTrainingMessage, navigate, trainingData]);

    const handleDateClick = (date) => {
        setActiveDateModal(date);
    };

    const handleCloseModal = () => {
        setActiveDateModal('');
    };

    const showDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const ErrorModal = () => (
        <>
            {(isErrorGetTrainingListType || isErrorGetTrainingListType === 'errorPostList') && (
                <Wrapper url={Path.CALENDAR}>
                    {isErrorGetTrainingListType === 'errorPostList'
                        ? DATA_POST_RESULT?.map((el) => (
                              <FetchError
                                  title={el.title}
                                  text={el.text}
                                  id={el.id}
                                  textBtn={el.textBtn}
                                  onClose={onHandleClose}
                                  func={onHandleNavigate}
                              />
                          ))
                        : DATA_RESULT?.map((el) => (
                              <FetchError
                                  title={el.title}
                                  text={el.text}
                                  id={el.id}
                                  textBtn={el.textBtn}
                                  onClose={onHandleClose}
                                  func={onHandleNavigate}
                              />
                          ))}
                </Wrapper>
            )}
        </>
    );

    const dateCellRender = (value) => {
        const stringValue = value.format('DD.MM.yyyy');
        const listData = listTraining?.filter(
            ({ date }) => moment(date).format('DD.MM.yyyy') === stringValue,
        );
        const isSunday = moment(stringValue, 'DD.MM.YYYY').format('dddd') === 'Sunday';
        const isTomorrow = stringValue > moment().format('DD.MM.yyyy');
        return (
            <CalendarCell
                isTomorrow={isTomorrow}
                listData={listData}
                isSunday={isSunday}
                date={stringValue}
                activeDateModal={activeDateModal}
                optionsList={optionsList}
                listTraining={listTraining}
                setListTraining={setListTraining}
                handleCloseModal={handleCloseModal}
                onHandleClose={onHandleClose}
                showDrawer={showDrawer}
                typeTraining={typeTraining}
                setTypeTraining={setTypeTraining}
                trainingData={trainingData}
                setIsEdit={setIsEdit}
                newExercises={newExercises}
                setNewExercises={setNewExercises}
            />
        );
    };

    return (
        <LayoutMain routes={routes}>
            <div className={styles.containerCalendar}>
                <ErrorModal />
                <div className={styles.wrapper}>
                    <Calendar
                        dateCellRender={dateCellRender}
                        className={styles.calendar}
                        locale={ruRu}
                        onSelect={(value) => {
                            const stringValue = value.format('DD.MM.yyyy');
                            if (stringValue !== activeDateModal) {
                                handleDateClick(stringValue);
                            }
                        }}
                    />
                </div>

                {openDrawer && (
                    <DrawerCalendar
                        listApproach={optionsList?.filter((el) => el.value === typeTraining)}
                        showDrawer={showDrawer}
                        openDrawer={openDrawer}
                        date={activeDateModal}
                        typeTraining={typeTraining}
                        listTraining={listTraining}
                        setListTraining={setListTraining}
                        optionsList={optionsList}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        newExercises={newExercises}
                        setNewExercises={setNewExercises}
                    />
                )}
            </div>
        </LayoutMain>
    );
};
