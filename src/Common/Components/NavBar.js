import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

export default class NavBar extends Component {

    render() {
        return (
            <div className='container-fluid'>
                <div className="row">

                    <div className="nav-bar text-secondary">
                        <FontAwesomeIcon icon={faBars}/> &nbsp;&nbsp;
                        <span className="vl"> &nbsp;&nbsp;My Tasks</span>
                    </div>

                    <div className="nav-bar text-center">
                       <div className="col-md-12">
                           <h3><b>Marketing Campaign</b></h3>
                       </div>
                    </div>
                </div>
            </div>
        )
    }
}
