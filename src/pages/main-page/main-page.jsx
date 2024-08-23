import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HeaderMain } from '@components/header';
import { ContentMain } from '@components/content';
import { FooterMain } from '@components/footer';
import { LayoutMain } from '@components/layout';
import { Wrapper } from '@components/wrapper';
import { FetchError } from '@components/fetch-error';
import { trainingErrorMessageSelector, trainingErrorSelector } from '@constants/selector';
import { dataMode } from '@pages/result-page/data-mode';
import { Path } from '@constants/path';
import { deleteMessage } from '@redux/actions/post-user';
import { getTraining } from '@redux/thunk/async/training';

const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onNavigateUrl = (url) => navigate(url);
    const isErrorGetTraining = useSelector(trainingErrorSelector);
    const isMessageErrorTraining = useSelector(trainingErrorMessageSelector);
    const DATA_RESULT = dataMode.filter((el) => el.type === Path.ERROR_CHECK_EMAIL);

    const onHandleNavigate = () => {
        dispatch(deleteMessage(''));
    };

    const onHandleCalendar = () => {
        navigate(Path.CALENDAR);
        dispatch(getTraining());
    };

    const routes = [
        {
            name: 'Главная',
        },
    ];

    const ErrorModal = () => (
        <>
            {isErrorGetTraining && isMessageErrorTraining && (
                <Wrapper>
                    {DATA_RESULT?.map((el) => (
                        <FetchError
                            title={el.title}
                            text={el.text}
                            id={el.id}
                            textBtn={el.textBtn}
                            func={onHandleNavigate}
                            isMessage={isMessageErrorTraining}
                        />
                    ))}
                </Wrapper>
            )}
        </>
    );

    return (
        <>
            <ErrorModal />
            <LayoutMain routes={routes}>
                <HeaderMain />
                <ContentMain onNavigateUrl={onHandleCalendar} />
                <FooterMain />
            </LayoutMain>
        </>
    );
};

export default MainPage;
