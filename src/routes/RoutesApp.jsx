import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { AuthPage } from '@pages/auth-page';
import { RegForm } from '@components/form/reg-form';
import { ResultPage } from '@pages/result-page';
import { ProtectedRoutes } from './protected-routes';
import { ConfirmEmail } from '@components/form/confirm-email';
import { ChangePass } from '@components/form/change-pass';
import { AuthForm } from '@components/form/auth-form';
import { CalendarPage } from '@pages/calendar-page';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { Loader } from '@components/loader';
import { Path } from '@constants/path';

import 'normalize.css';
import '../index.css';

export const RoutesApp = () => {
    const navigate = useNavigate();
    const MainPageLazy = lazy(() => import('@pages/main-page/main-page'));

    useEffect(() => {
        window.addEventListener('beforeunload', function () {
            sessionStorage.clear();
        });
        if (
            localStorage.getItem('JWT') === 'undefined' &&
            sessionStorage.getItem('JWTSession') === 'undefined'
        ) {
            navigate(Path.AUTH);
        }
    }, [navigate]);
    return (
        <Routes>
            <Route element={<AuthPage />}>
                <Route path={Path.AUTH} element={<AuthForm />} />
                <Route path={Path.REGISTRATION} element={<RegForm />} />
                <Route path={Path.CONFIRM_EMAIL} element={<ConfirmEmail />} />
                <Route path={Path.CHANGE_PASS} element={<ChangePass />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
                <Route>
                    <Route path={Path.HOME} element={<Navigate to={Path.MAIN} />} />
                    <Route
                        path={Path.MAIN}
                        element={
                            <Suspense fallback={<Loader />}>
                                <MainPageLazy />
                            </Suspense>
                        }
                    />
                </Route>
                <Route path={Path.RESULT} element={<ResultPage />}>
                    <Route path={Path.ERROR_LOGIN} element={<ResultPage />} />
                    <Route path={Path.SUCCESS} element={<ResultPage />} />
                    <Route path={Path.ERROR_USER_EXIST} element={<ResultPage />} />
                    <Route path={Path.ERRR0R_CHEK_EMAIL_NO_EXIST} element={<ResultPage />} />
                    <Route path={Path.ERROR_CHECK_EMAIL} element={<ResultPage />} />
                    <Route path={Path.ERROR_USER_EXIST} element={<ResultPage />} />
                    <Route path={Path.ERROR_CHANGE_PASS} element={<ResultPage />} />
                    <Route path={Path.SUCCES_CHANGE_PASS} element={<ResultPage />} />
                    <Route path={Path.ERROR} element={<ResultPage />} />
                </Route>
                <Route path={Path.FEEDBACKS} element={<FeedbacksPage />} />
                <Route path={Path.CALENDAR} element={<CalendarPage />} />
            </Route>
        </Routes>
    );
};
