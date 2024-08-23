import animationData from '../components/loader/base-loader.json';

export const LengthVerificationInput = 6;

export const MaxIndexFeedbacks = 4;

export const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

export const daysShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const monthsShort = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
];

export const optionsList = [
    {
        value: 'Ноги',
        key: 'legs',
        color: 'rgb(255, 77, 79)',
    },
    {
        value: 'Руки',
        key: 'hands',
        color: 'rgb(19, 194, 194)',
    },
    {
        value: 'Силовая',
        key: 'strength',
        color: 'rgb(250, 219, 20)',
    },
    {
        value: 'Спина',
        key: 'back',
        color: 'rgb(250, 140, 22)',
    },
    {
        value: 'Грудь',
        key: 'chest',
        color: 'rgb(82, 196, 26)',
    },
];
