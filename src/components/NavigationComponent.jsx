import React from 'react';
import TaskListPage from './TaskListPage'
import TaskPage from './TaskPage'
import CreateTaskPage from './CreateTaskPage'
import VariantsPage from './VariantsPage'
import TagListPage from './TagListPage'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import './NavigationComponent.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {NotificationContainer} from "react-notifications";


class NavigationComponent extends React.Component {

    render() {
        return (
            <>
             <NotificationContainer/>
            <Router>
                <div>
                <Navbar fixed="top"  className='NavBarBackground'>
                    <Nav className="mr-auto">
                        <Link className='NavLink' to="/tasks">Tasks list</Link>
                        <Link className='NavLink' to="/tags">Tags list</Link>
                        <Link className='NavLink' to="/function">Create new function</Link>
                        <Link className='NavLink' to="/variants">Generate variants</Link>
                    </Nav>
                </Navbar>
                </div>
                <div className="ContentCovered">
                    <Switch>
                        <Route path="/tasks">
                            <TaskListPage/>
                        </Route>
                        <Route path="/tags">
                            <TagListPage/>
                        </Route>
                        <Route path="/task" component={TaskPage}/>
                        <Route path="/function">
                            <CreateTaskPage/>
                        </Route>
                        <Route path="/variants">
                            <VariantsPage/>
                        </Route>

                    </Switch>
                </div>
            </Router>
            </>
        );
    }
}

export default NavigationComponent;
