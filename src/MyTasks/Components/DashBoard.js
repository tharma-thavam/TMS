import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import get from "lodash/get";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'

import {setMyTaskReq} from "../action";
import SmsTone from '../media/sms-tone.mp3'
import CreateNewTask from "./CreateNewTask";

class DashBoard extends Component {
    state = {
        isOpenTaskModal: false
    };

    openCloseTaskModal = () => {
        this.setState({isOpenTaskModal: !this.state.isOpenTaskModal})
    };


    getPriorityStyle = (priority) => {
        const style = {
            color: 'white', padding: '5px 15px'
        };

        switch (priority) {
            case "Low" :
                return <span className="badge badge-pill badge-success" style={style}> {priority} </span>;
            case "High" :
                return <span className="badge badge-pill badge-danger" style={style}>{priority}</span>;
            case "Med" :
                return <span className="badge badge-pill badge-warning" style={style}>{priority}</span>;
            default:
                return {priority}
        }
    }
    changeStatusAsCompleted = (index) => {
        let myTasks = {...this.props.myTasksReducer.myTasks};
        if (myTasks[index]['status'] !== 'Completed') {
            const audio = document.getElementById('audio');
            audio.play();
            myTasks[index]['status'] = 'Completed';
            this.props.dispatch(setMyTaskReq(myTasks))
        }
    }

    render() {

        const {isOpenTaskModal} = this.state;
        const {myTasks = []} = this.props.myTasksReducer;

        return (
            <div className="container-fluid grey-bg" style={{paddingTop: '70px', height: '100vh'}}>
                <div className="task-box">
                    <div className="row">
                        <audio id="audio">
                            <source src={SmsTone}/>
                        </audio>
                        <div className="col-md-10">
                            <button type="button" className="btn-button"
                                    onClick={() => this.openCloseTaskModal()}>
                                Add Task
                            </button>
                        </div>
                        <div className="col-md-2 text-secondary padding-top-10" style={{paddingLeft: '30px',fontSize: '15px'}}>
                            Priority
                        </div>
                        <div className="col-md-12">
                            <hr/>
                        </div>
                    </div>
                    {
                        myTasks.map((task, index) => {
                            return (
                                <div key={index} className="col-md-12"
                                     onClick={() => task.status !== 'Completed' ? this.changeStatusAsCompleted(index) : () => {
                                     }}>
                                    <div className="row ">
                                        <div className="col-md-10">
                                            <FontAwesomeIcon icon={faCheckCircle}
                                                             color={task.status === 'Completed' ? 'green' : 'text-secondary'}/>
                                            &nbsp;
                                            {
                                                task.status === 'Completed' ?
                                                    <del>{get(task, 'name')}</del> :
                                                    get(task, 'name')
                                            }
                                        </div>
                                        <div className="col-md-2 text-center">
                                            {this.getPriorityStyle(get(task, 'priority'))}
                                        </div>

                                        <div className="col-md-12">
                                            <hr/>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                {
                    isOpenTaskModal &&
                    <CreateNewTask
                        isOpenTaskModal={isOpenTaskModal}
                        openCloseTaskModal={this.openCloseTaskModal}
                    />
                }
            </div>
        )
    }

}

export default connect((store) => ({
    myTasksReducer: store.myTasksReducer,
}))(withRouter(DashBoard))