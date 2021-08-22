export default function reducer(state = {
    loginCredential: {
        userName: "tharma",
        password: "tharma@123"
    },
    userLoginReq: {}

}, action) {
    switch (action.type) {
        case 'SET_USER_LOGIN_REG': {
            return {
                ...state,
                userLoginReq: action.payload
            }
        }
        default:
            return state
    }
}