import { Badge } from 'antd';
import 'antd/dist/antd.css';

import { TrainigModal } from '../training-modal';

import styles from './calendar-cell.module.css';

export const CalendarCell = ({
    listData,
    date,
    handleCloseModal,
    activeDateModal,
    isSunday,
    optionsList,
    listTraining,
    setListTraining,
    showDrawer,
    typeTraining,
    setTypeTraining,
    isTomorrow,
    setIsEdit,
    newExercises,
    setNewExercises,
}) => (
    <div>
        <ul className={styles.listBadge}>
            {listData?.map((el) => (
                <li key={el.name}>
                    <Badge
                        color={optionsList?.filter((e) => e.value === el.name).map((i) => i.color)}
                        text={el.name}
                    />
                </li>
            ))}
        </ul>
        {date === activeDateModal && (
            <TrainigModal
                isTomorrow={isTomorrow}
                listData={listData}
                handleClose={handleCloseModal}
                date={date}
                isSunday={isSunday}
                optionsList={optionsList}
                listTraining={listTraining}
                setListTraining={setListTraining}
                showDrawer={showDrawer}
                activeDateModal={activeDateModal}
                typeTraining={typeTraining}
                setTypeTraining={setTypeTraining}
                setIsEdit={setIsEdit}
                newExercises={newExercises}
                setNewExercises={setNewExercises}
            />
        )}
    </div>
);
