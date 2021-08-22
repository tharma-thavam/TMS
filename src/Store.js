import {combineReducers} from 'redux'

import loginReducer from './Login/reducer'
import myTasksReducer from './MyTasks/reducer'

export default combineReducers({
    loginReducer,
    myTasksReducer

})
