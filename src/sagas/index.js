import { all } from 'redux-saga/effects';

import weather from './Weather/sagas';

// combine all sagas
export default function* rootSaga() {
    yield all([
        weather()
    ]);
}