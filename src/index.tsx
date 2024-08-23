import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history, store } from '@redux/configure-store';

import { Container } from '@components/conatiner';
import { Loader } from '@components/loader';
import { RoutesApp } from './routes/RoutesApp';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Container>
                <Loader />
                <HistoryRouter history={history}>
                    <RoutesApp />
                </HistoryRouter>
            </Container>
        </Provider>
    </React.StrictMode>,
);
