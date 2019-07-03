import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    timerId: null,
    authRedirectPath: "/"
};

const authLogOut = (state, action) => {
    clearTimeout(state.timerId);
    return updateObject(state, {token: null, userId: null, timerId: null});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken, 
        userId: action.userId,
        err: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogOut(state, action);
        case "SET_TIMER": return updateObject(state, {timerId: action.timerId});
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;