import React, {Component} from 'react';
import {createFunction} from "../utils/FetchHelper"
import Container from 'react-bootstrap/Container'
import 'react-notifications/lib/notifications.css';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {NotificationManager} from 'react-notifications';
import './CreateTaskPage.css'
import {CREATE_TASKS_TEXT, ADD_FUNCTION_REGEX} from '../utils/Constants'
import { withRouter } from "react-router-dom";

class CreateTaskPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signature: "",
        };
        this.createFunction = this.createFunction.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    createFunction(event) {
        event.preventDefault();
        if (!this.state.signature.match(ADD_FUNCTION_REGEX)) {
            NotificationManager.warning('Bad input. Follow guide.', 'Warning');
            return;
        }
        createFunction(this.state.signature).then(response => {
            NotificationManager.success('Success message', 'Files created');
            this.props.history.push("tasks");
        }).catch(
            error => {
                NotificationManager.error('Error message', 'Error: click me!', 8000, () => {
                    alert(error);
                });
            }
        );

    }

    handleChange(event) {
        this.setState({signature: event.target.value});
    }

// TODO dorob pridanie spravnych hodnot do task
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={8}>
                            <form onSubmit={this.createFunction}>
                                <label>
                                    Signature:
                                </label>
                                <input type="text" value={this.state.signature} onChange={this.handleChange}/>
                                    <Button variant="outline-secondary" type="submit">Create function</Button>
                            </form>
                        </Col>
                        <Col>
                            <Row className={'container-move'}> {CREATE_TASKS_TEXT}</Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default withRouter(CreateTaskPage);
