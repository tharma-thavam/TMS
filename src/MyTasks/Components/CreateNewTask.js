import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Modal from 'react-modal';
import get from 'lodash/get';

import {setMyTaskReq, createMyTask} from "../action";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '40%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

class DashBoard extends Component {
    state = {
        error: ""
    }

    componentDidMount() {
        this.setState({error: ""})
        this.props.dispatch(setMyTaskReq({}))
    }

    setNewTaskValue = (event, refer) => {
        const createMyTaskReq = {...this.props.myTasksReducer.createMyTaskReq}
        createMyTaskReq[refer] = event.target.value
        this.props.dispatch(setMyTaskReq(createMyTaskReq))
    }

    createNewTask = () => {
        const createMyTaskReq = {...this.props.myTasksReducer.createMyTaskReq}
        const {myTasks} = this.props.myTasksReducer
        const {name, priority} = createMyTaskReq
        if (!name) this.setState({error: "Please enter the task name"})
        else if (!priority) this.setState({error: "Please select the priority"})
        else {
            this.props.openCloseTaskModal()
            createMyTaskReq['status'] = 'New';
            myTasks.push(createMyTaskReq);
            this.props.dispatch(createMyTask(myTasks))
        }
    }


    render() {

        const {error} = this.state
        const {isOpenTaskModal, openCloseTaskModal} = this.props
        const {createMyTaskReq} = this.props.myTasksReducer
        const taskName = get(createMyTaskReq, 'name')

        return (
            <Modal
                isOpen={isOpenTaskModal}
                onRequestClose={openCloseTaskModal}
                style={customStyles}
                contentLabel="Create Task Modal">

                <div className="container-fluid text-center">
                    <div className="row">

                        <div className="col-md-11"/>
                        <div className="col col-md-1 text-right text-secondary pointer"
                             onClick={() => openCloseTaskModal()}>
                            X
                        </div>

                        <div className="col-md-12 text-center">
                            <h5><b> Create New Task</b></h5>
                        </div>

                        <div className="col-md-12">
                            <hr/>
                        </div>

                        <div className="col-md-12 padding-top-20 text-left">
                            <table style={{width: '100%'}}>
                                <tbody>
                                <tr>
                                    <td> Task Name :</td>
                                    <td><input type="text"
                                               value={taskName === undefined || taskName === null ? '' : taskName}
                                               onChange={(e) => this.setNewTaskValue(e, 'name')}/></td>
                                </tr>

                                <tr>
                                    <td> Select The Priority :</td>
                                    <td><select className="form-select border-none"
                                                style={{padding: '5px 60px', background: 'white', border: '1px groove'}}
                                                aria-label="priority"
                                                onChange={(e) => this.setNewTaskValue(e, 'priority')}>
                                        <option defaultValue>--Select--</option>
                                        <option value="Low">Low</option>
                                        <option value="Med">Medium</option>
                                        <option value="High">High</option>
                                    </select></td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                        {
                            error &&
                            <div className="col-md-12 padding-top-20">
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            </div>
                        }

                        <div className="col-md-12 text-center padding-top-20 padding-bottom-20">
                            <button className="btn-button"
                                    onClick={() => this.createNewTask()}>
                                Create
                            </button>
                        </div>

                    </div>
                </div>
            </Modal>
        )
    }
}

export default connect((store) => ({
    myTasksReducer: store.myTasksReducer,
}))(withRouter(DashBoard))