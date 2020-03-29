import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TaskComponent.css'
import Button from 'react-bootstrap/Button'

import {
    Link
} from "react-router-dom";


class TaskComponent extends Component {


    render(){
        const { index, task } = this.props;
        return (
            <div className={'TaskComponent ' + (index % 2 === 0 ? 'TaskBackground' : '')}>
                <Row>

                    <Col xs={4}> <span className={'bold'}>Name:</span> {task.name} </Col>
                    <Col xs={2}> <span className={'bold'}>Score:</span> {task.score} </Col>
                    <Col> <span className={'bold'}>Tags:</span> {task.tags.map((tag, index) => {
                            return (
                                    <span key={index}>
                                        {tag}
                                        {index+1 === task.tags.length ? " ": ", "}
                                    </span>
                            )
                        })}
                    </Col>
                    <Col xs={1}>
                        <Link className='TaskLink' to={{
                        pathname: '/task',
                        state: { task: task }
                        }}><Button variant="outline-secondary">Edit</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default TaskComponent;
