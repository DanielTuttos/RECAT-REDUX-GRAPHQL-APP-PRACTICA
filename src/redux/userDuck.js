import { loginWithGoogle, singOutGoogle } from '../firebase';
import { retreiveFavs } from './charsDuck';

// constantes
const initialData = {
    loggedIn: false,
    fetching: false

}
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOG_OUT = "LOG_OUT"

// reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                fetching: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                ...action.payload,
                loggedIn: true
            }

        case LOGIN_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        case LOG_OUT:
            return {
                ...initialData
            }

        default:
            return state;
    }
}

// funccion auxiliar
function saveStorage(storage) {
    localStorage.storage = JSON.stringify(storage);
}

// actions (actions creator)

export const logOutAction = () => {
    return (dispatch, getState) => {
        singOutGoogle();
        dispatch({
            type: LOG_OUT
        });
        localStorage.removeItem('storage');
    }
}

export const restoreSessionAction = () => {
    return (dispatch, getState) => {
        let storage = localStorage.getItem('storage');
        storage = JSON.parse(storage);
        if (storage && storage.user) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: storage.user
            })
            retreiveFavs()(dispatch, getState);
        }
    }
}

export const doGoogleLoginAction = () => {
    return (dispatch, getState) => {
        dispatch({
            type: LOGIN
        })

        return loginWithGoogle()
            .then(user => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    }
                })
                saveStorage(getState());
                retreiveFavs()(dispatch, getState);
            }).catch(err => {
                console.log(err);
                dispatch({
                    type: LOGIN_ERROR,
                    payload: err.message
                })
            })
    }
}

