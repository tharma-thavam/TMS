export function setLoginUserReq (req) {
    return function (dispatch) {
        dispatch({
            type: 'SET_USER_LOGIN_REG',
            payload:req
        })

    }
}