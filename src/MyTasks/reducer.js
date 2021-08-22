export default function reducer(state = {
    createMyTaskReq:{},
    myTasks: [
        {name:"Campaign creative concept", priority:"Med", status:"New"},
        {name:"Campaign messaging", priority:"High", status:"New"},
        {name:"Media plan", priority:"Low", status:"New"}
    ]

}, action) {
    switch (action.type) {

        case 'SET_MY_TASK_REG': {
            return {
                ...state,
                createMyTaskReq: action.payload
            }
        }

        case 'CREATE_MY_TASK': {
            return {
                ...state,
                myTasks: action.payload
            }
        }

        default:
            return state
    }
}