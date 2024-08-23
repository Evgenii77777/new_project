import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import { ListFeedbacks } from '@components/list-feedbacks';
import { LayoutMain } from '@components/layout';
import { EmptyFeedbacks } from './empty-feedbacks';
import { useDispatch, useSelector } from 'react-redux';
import {
    feedbacksErrorSelector,
    feedbacksMessageSelector,
    feedbacksSelector,
    feedbacksTypeSelector,
} from '@constants/selector';
import { MaxIndexFeedbacks } from '@constants/constant';
import { getFeedbacks, postFeedbacks } from '@redux/thunk/async/feedbacks';
import { ModalFeed } from '@components/modal-feed';
import { FetchError } from '@components/fetch-error';
import { dataMode } from '@pages/result-page/data-mode';
import { Path } from '@constants/path';
import { deleteMessage, deleteType } from '@redux/actions/post-user';
import { Wrapper } from '@components/wrapper';

import styles from './feedbacks-page.module.css';

const routes = [
    {
        path: 'main',
        name: 'Главная',
    },
    {
        name: 'Отзывы пользователей',
    },
];

export const FeedbacksPage = () => {
    const dispatch = useDispatch();
    const [fullFeed, setFullFeeed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valueStar, setValueStar] = useState(0);
    const [valueInp, setValueInp] = useState('');
    const navigate = useNavigate();
    const feedbacksArr = useSelector(feedbacksSelector);
    const isError = useSelector(feedbacksErrorSelector);
    const typeError = useSelector(feedbacksTypeSelector);
    const messageFeed = useSelector(feedbacksMessageSelector);
    const newFeedArr = feedbacksArr?.filter((el, index) => index < MaxIndexFeedbacks);
    const DATA_RESULT = dataMode.filter((el) => el.type === Path.ERROR_CHECK_EMAIL);
    const changeFormatTime = (time) => time.split('T')[0].split('-').join('.');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFullFeedbacks = () => setFullFeeed(!fullFeed);

    const onPostFeed = (data) => {
        dispatch(postFeedbacks(data));
        if (!messageFeed) {
            dispatch(getFeedbacks());
        }
        setIsModalOpen(!isModalOpen);
    };

    const onHandleNavigate = () => navigate(Path.MAIN);

    const onHandleAddFeed = () => {
        dispatch(deleteType(''));
        dispatch(getFeedbacks());
        setIsModalOpen(false);
    };

    const onHandleAddNewFeed = () => {
        dispatch(getFeedbacks());
        dispatch(deleteType(''));
        dispatch(deleteMessage(''));
        setIsModalOpen(true);
    };

    return (
        <LayoutMain routes={routes}>
            {isError && !typeError && !messageFeed && (
                <Wrapper>
                    {DATA_RESULT?.map((el) => (
                        <FetchError
                            title={el.title}
                            text={el.text}
                            id={el.id}
                            textBtn={el.textBtn}
                            func={onHandleNavigate}
                        />
                    ))}
                </Wrapper>
            )}
            {!isError && typeError && !messageFeed && (
                <Wrapper>
                    {dataMode
                        .filter((el) => !el.error && el.type === Path.FEEDBACKS)
                        ?.map((el) => (
                            <FetchError
                                title={el.title}
                                text={el.text}
                                id={el.id}
                                textBtn={el.textBtn}
                                func={onHandleAddFeed}
                                type={el.type}
                            />
                        ))}
                </Wrapper>
            )}
            {typeError && messageFeed && (
                <Wrapper>
                    {dataMode
                        .filter((el) => el.error && el.type === Path.FEEDBACKS)
                        ?.map((el) => (
                            <FetchError
                                title={el.title}
                                text={el.text}
                                id={el.id}
                                textBtn={el.textBtn}
                                textBtnSecond={el.textBtnSecond}
                                func={onHandleAddNewFeed}
                                funcSecond={onHandleAddFeed}
                                type={el.type}
                            />
                        ))}
                </Wrapper>
            )}
            {(!feedbacksArr.length || !newFeedArr.length) && !isError && (
                <EmptyFeedbacks showModal={showModal} />
            )}
            {(feedbacksArr.length || newFeedArr.length) && (
                <>
                    <ListFeedbacks
                        feedbacksArr={feedbacksArr}
                        newFeedArr={newFeedArr}
                        fullFeed={fullFeed}
                        changeFormatTime={changeFormatTime}
                    />
                    <div className={styles.wrapper}>
                        <Button
                            data-test-id='write-review'
                            className={styles.btnModal}
                            type='primary'
                            onClick={showModal}
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            data-test-id='all-reviews-button'
                            className={styles.btnLink}
                            type='link'
                            onClick={onFullFeedbacks}
                        >
                            {fullFeed ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                        </Button>
                    </div>
                </>
            )}
            <ModalFeed
                rating={valueStar}
                valueStar={valueStar}
                setValueStar={setValueStar}
                valueInp={valueInp}
                setValueInp={setValueInp}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                onPostFeed={onPostFeed}
            />
        </LayoutMain>
    );
};
