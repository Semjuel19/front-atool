import React from 'react';
import TaskComponent from "./TaskComponent"
import { getListOfTasks, downloadExamZip} from "../utils/FetchHelper";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './TaskListPage.css'
import {NotificationManager} from 'react-notifications';



class TaskListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
    }


    componentDidMount() {
        getListOfTasks().then(response => {
            this.setState({tasks: response.data});
        }).catch(error => {
            NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                alert(error);
            })
        });
    }

    filterSearch(task){
        if( this.state.search === ''){
            return true;
        }
        return task.name.includes(this.state.search);
    }

    handleSearch(event){
        this.setState({search: event.target.value});
    }

    render() {
        const {tasks} = this.state;
        return (
            <Container>
                {
                    (tasks.length === 0) ? (<div>No tasks</div>) : (

                        <span>
                            <Row className={'row-align'}>
                                <Col>
                                    <Button variant="outline-secondary" onClick={downloadExamZip}>
                                        Download all tasks
                                    </Button>
                                </Col>
                                <Col xs={3}>
                                    <input placeholder={'search...'} type="text" value={this.state.search} onChange={this.handleSearch}/>
                                </Col>
                            </Row>
                                {tasks.filter(this.filterSearch).map((task, index) => {
                                    return (
                                        <span key={index}>
                                            <TaskComponent index = {index} task = {task}/>
                                        </span>
                                    )
                                })}
                        </span>)
                }

            </Container>
        );
    }
}

export default TaskListPage;
