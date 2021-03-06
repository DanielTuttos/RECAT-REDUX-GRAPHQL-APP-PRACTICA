import axios from 'axios';
import { updateDB, getFavs } from '../firebase';

// constantes 
let InitialData = {
    fetching: false,
    array: [],
    current: {},
    favorites: []
}
const URL = "https://rickandmortyapi.com/api/character";

const GET_CHARACTERS = "GET_CHARACTERS";
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

const REMOVE_CHARACTER = "REMOVE_CHARACTER";
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

const GET_FAVS = "GET_FAVS";
const GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";
const GET_FAVS_ERROR = "GET_FAVS_ERROR";


// reducer
export default function reducer(state = InitialData, action) {
    switch (action.type) {
        case GET_CHARACTERS:
            return {
                ...state,
                fetching: true
            }
        case GET_CHARACTERS_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        case GET_CHARACTERS_SUCCESS:
            return {
                ...state,
                array: action.payload,
                fetching: false
            }

        case REMOVE_CHARACTER:
            return {
                ...state,
                array: action.payload
            } 

        case ADD_TO_FAVORITES:
            return {
                ...state,
                ...action.payload
            }
        case GET_FAVS:
            return {
                ...state,
                fetching: true
            }

        case GET_FAVS_SUCCESS:
            return {
                ...state,
                fetching: false,
                favorites: action.payload
            }
        case GET_FAVS_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }


        default:
            return state;
    }
}

// actions(thunk)

export const retreiveFavs = () => {
    return (dispatch, getState) => {
        dispatch({
            type: GET_FAVS
        });
        let { uid } = getState().user;

        return getFavs(uid)
            .then(array => {
                dispatch({
                    type: GET_FAVS_SUCCESS,
                    payload: [...array]
                })
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_FAVS_ERROR,
                    payload: err.message
                })
            })
    }
}

export const addToFavoriteAction = () => {
    return (dispatch, getState) => {
        let { array, favorites } = getState().characters;
        let { uid } = getState().user;
        let char = array.shift();
        favorites.push(char);
        updateDB(favorites, uid)
        dispatch({
            type: ADD_TO_FAVORITES,
            payload: {
                array: [...array], favorites: [...favorites]
            }
        })

    }
}

export const removeCharacterAction = () => {
    return (dispatch, getState) => {
        // donde estan 
        let { array } = getState().characters;
        array.shift();
        dispatch({
            type: REMOVE_CHARACTER,
            payload: [...array]
        })
    }
}

export const getCharactersAction = () => {
    return (dispatch, getState) => {
        dispatch({
            type: GET_CHARACTERS
        })
        return axios.get(URL)
            .then(res => {
                dispatch({
                    type: GET_CHARACTERS_SUCCESS,
                    payload: res.data.results
                })
            }).catch(err => {
                console.log(err);
                dispatch({
                    type: GET_CHARACTERS_ERROR,
                    payload: err.response.message
                })
            })
    }
}
