export function setMyTaskReq (req) {
    return function (dispatch) {
        dispatch({
            type: 'SET_MY_TASK_REG',
            payload:req
        })

    }
}export function createMyTask (req) {
    return function (dispatch) {
        dispatch({
            type: 'CREATE_MY_TASK',
            payload:req
        })

    }
}