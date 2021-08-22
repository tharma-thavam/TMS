import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {setLoginUserReq} from '../action'
import get from 'lodash/get'

import '../style/Login.scss'

class LoginPage extends Component {
    state = {
        error: ""
    }

    setValue = (event, refer) => {
        let {userLoginReq} = this.props.loginReducer
        userLoginReq[refer] = event.target.value
        this.props.dispatch(setLoginUserReq(userLoginReq))
    }

    handleLogin = () => {
        const {history} = this.props
        const {userLoginReq, loginCredential} = this.props.loginReducer
        const {userName, password} = loginCredential

        if (get(userLoginReq, 'userName') !== userName || get(userLoginReq, 'password') !== password) {
            this.setState({error: "Unable to sign in, Invalid username or password"})
            this.props.dispatch(setLoginUserReq({}))

        } else {
            history.push("/myTasks")
            this.setState({error: ""})
        }

    }

    render() {
        const {error} = this.state
        const {userLoginReq} = this.props.loginReducer

        const userName = get(userLoginReq, 'userName')
        const password = get(userLoginReq, 'password')

        return (
            <div className="container-fluid login">
                <div className="row bg">
                    <div className="col-md-12" style={{marginTop: '35vh'}}>
                        <div className="login-pad">
                            <Fragment>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h4><b>Login</b></h4>
                                    </div>
                                    <div className="col-md-12 text-center padding-top-20 ">
                                        <input ref="userName"
                                               className="input"
                                               placeholder="User Name"
                                               value={userName === undefined || userName === null ? '' : userName}
                                               onChange={(e) => this.setValue(e, 'userName')}
                                        />
                                    </div>

                                    <div className="col-md-12 text-center padding-top-20">
                                        <input ref='password'
                                               placeholder="Password"
                                               className="input"
                                               value={password === undefined || password === null ? '' : password}
                                               onChange={(e) => this.setValue(e, 'password')}
                                               type="password"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 text-center padding-top-20">
                                        <button className="btn-button"
                                                onClick={() => this.handleLogin()}>
                                            Login
                                        </button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 padding-top-20 text-right">
                                        <div className="text-right text-primary pointer">
                                            Reset Password
                                        </div>
                                    </div>
                                </div>

                            </Fragment>

                            {
                                error &&
                                <div className="row">
                                    <div className="col-md-12 text-center padding-top-10">
                                        <h6 className="text-danger">{error}</h6>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect((store) => ({
    loginReducer: store.loginReducer
}))(withRouter(LoginPage))