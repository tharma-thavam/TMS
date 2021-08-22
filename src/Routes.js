import React from 'react'
import {Redirect, Route, Switch, BrowserRouter} from 'react-router-dom'

import LoginPage from "./Login/Components/LoginPage";
import DashBoard from "./MyTasks/Components/DashBoard";
import CreateNewTask from "./MyTasks/Components/CreateNewTask";
import NavBar from "./Common/Components/NavBar";

function Routes() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Redirect exact from='/' to='/login'/>
                    <Route
                        exact
                        path='/login'
                        component={LoginPage}/>
                    <Route
                        render={() => {
                            return (
                                <div>
                                    <NavBar/>
                                    <Route
                                        exact
                                        path='/createNewTask'
                                        component={CreateNewTask}/>
                                    <Route
                                        exact
                                        path='/myTasks'
                                        component={DashBoard}/>
                                </div>
                            )
                        }}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes
