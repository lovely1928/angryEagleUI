import { USER_ACTION_TYPES } from "./userTypes"

export const updateUserAction = (data) => {
    return {
        type: USER_ACTION_TYPES.GET_USER_SUCCESS,
        payload: data
    }
}
export const userLoadingAction = (data) => {
    return {
        type: USER_ACTION_TYPES.GET_USER_LOADING
    }
}
export const getUserError = (error) => {
    return {
        type: USER_ACTION_TYPES.GET_USER_ERROR,
        payload: error
    }
}

export const loginUserAction = () => ({
    type: USER_ACTION_TYPES.LOGGED_IN,
    // payload: { isLoggedIN: true }
})

export const logoutUserAction = () => ({
    type: USER_ACTION_TYPES.LOGGED_OUT,
    // payload: { isLoggedIN: false }
})