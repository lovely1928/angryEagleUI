import axios from "axios";
import { USER_ACTION_TYPES } from "./userTypes";
import { getUserError, updateUserAction, userLoadingAction } from "./userActions";

const initialUserstate = {
    loading: false,
    error: null,
    user: {}
}
export const userReducer = (state = initialUserstate, action) => {

    switch (action.type) {
        case USER_ACTION_TYPES.GET_USER_LOADING:
            return {
                ...state,
                loading: true,
            }

        case USER_ACTION_TYPES.GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case USER_ACTION_TYPES.GET_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                user: {}
            }
        case USER_ACTION_TYPES.LOGGED_OUT:
            return {
                ...state,
                user: {},
            }
        default:
            return state;
    }
}

export const fetchUsers = () => {
    return async function (dispatch) {
        try {
            const token = localStorage.getItem('token')
            dispatch(userLoadingAction())
            const resp = await axios.get('http://localhost:4000/api/user/profile', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            let user = resp.data.data
            dispatch(updateUserAction(user))
        }
        catch (e) {
            getUserError(e.message)
        }
    }
}