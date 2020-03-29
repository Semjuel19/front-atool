import React, {Component} from 'react';
import {changeScore, addTag, getFileText, getTask, editFileText} from "../utils/FetchHelper";
import {makeTaskTagJson} from "../utils/Helpers"
import "ace-builds";
import AceEditor from "react-ace";
import Container from 'react-bootstrap/Container'
import 'react-notifications/lib/notifications.css';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './TaskPage.css'
import { SCORE_REGEX,SINGLE_TAG_REGEX } from '../utils/Constants'

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";
import {NotificationManager} from "react-notifications";


class TaskPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            task: {name: 'none', score: 0, tags: []},
            eventTagValue: '',
            eventScoreValue: '',
            textInAce: '',
            language: 'yaml',
            file: '/suite.yml'
        };
        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.changeScoreOfTask = this.changeScoreOfTask.bind(this);
        this.addTagToTask = this.addTagToTask.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changeFile = this.changeFile.bind(this);
        this.changeEditor = this.changeEditor.bind(this);
    }

    componentDidMount() {
        if (this.props.location.state !== undefined) {
            getTask(this.props.location.state.task.name).then(response => {
                this.setState({task: response.data});
                getFileText(this.props.location.state.task.name + this.state.file).then(response => {
                    this.setState({textInAce: response.data});
                }).catch(error => {
                    NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                        alert(error);
                    })
                });
            }).catch(error => {
                NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                    alert(error);
                });
            });
        }
    }


    changeScoreOfTask(event) {
        event.preventDefault();
        if (!this.state.eventScoreValue.match(SCORE_REGEX)) {
            NotificationManager.warning('Bad input. Follow guide.', 'Warning');
            return;
        }

        // if(this.state.task.score === 0) {
        //     NotificationManager.error('Error', 'Error: click me!', 8000, () => {
        //         alert("First you need to configure suite.yml in order to change score from value 0.");
        //     });
        //     return;
        // }

        changeScore(this.state.task.name, parseInt(this.state.eventScoreValue, 10)).then(() => {
            NotificationManager.success('Score changed', 'Success');
            this.setState({
                task: {
                    name: this.state.task.name,
                    score: this.state.eventScoreValue,
                    tags: this.state.task.tags
                },
                eventScoreValue: ''
            });
            getFileText(this.props.location.state.task.name + this.state.file).then(response => {
                this.setState({textInAce: response.data});
            }).catch(error => {
                NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                    alert(error);
                });
            });
        }).catch(error => {
            NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                alert(error);
            });
        });
    }

    addTagToTask(event) {
        event.preventDefault();
        if (!this.state.eventTagValue.match(SINGLE_TAG_REGEX)) {
            NotificationManager.warning('Bad input. Follow guide.', 'Warning');
            return;
        }
        let jasonString = "".concat(this.state.task.name, "=", this.state.eventTagValue);
        let json = makeTaskTagJson(jasonString);
        addTag(json).then(() => {
            NotificationManager.success('Tag added', 'Success');
            this.setState({
                task: {
                    name: this.state.task.name,
                    score: this.state.task.score,
                    tags: [...this.state.task.tags, this.state.eventTagValue]
                },
                eventTagValue: ''
            });
            getFileText(this.props.location.state.task.name + this.state.file).then(response => {
                this.setState({textInAce: response.data});
            }).catch(error => {
                NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                    alert(error);
                });
            });

        }).catch(error => {
            NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                alert(error);
            });
        });
    }

    onChange(newValue) {
        this.setState({textInAce: newValue})
    }

    changeFile() {
        editFileText(this.state.task.name + this.state.file, this.state.textInAce).then( () =>
            NotificationManager.success('Changes saved', 'Success')
        ).catch(error => {
            NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                alert(error);
            });
        });
    }

    handleScoreChange(event) {
        this.setState({eventScoreValue: event.target.value});
    }

    handleTagChange(event) {
        this.setState({eventTagValue: event.target.value});
    }

    changeEditor(event){
        switch(event.target.value) {
            case '/suite.yml':
                this.setState({file: event.target.value, language: 'yaml'});
                break;
            case '/solution.c':
                this.setState({file: event.target.value, language: 'c_cpp'});
                break;
            case '/tests.c':
                this.setState({file: event.target.value, language: 'c_cpp'});
                break;
            case '/assignment.md':
                this.setState({file: event.target.value, language: 'mark_down'});
                break;
            default:
                this.setState({file: event.target.value, language: 'yaml'});
        }
        getFileText(this.props.location.state.task.name + event.target.value).then(response => {
            this.setState({textInAce: response.data});
        }).catch(error => {
            NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                alert(error);
            });
        });

    }

    render() {
        const {task, language, file} = this.state;
        return (
            <Container>
                <Row className={'text-decoration'}>
                    <Col> Name: {task.name} </Col>
                    <Col> Score: {task.score} </Col>
                    <Col> Tags:
                        {
                            task.tags.map((tag, index) => {
                                return (
                                    <span key={index}>
                                        {tag}
                                        {index+1 === task.tags.length ? " ": ", "}
                                    </span>
                                )
                            })}
                    </Col>


                </Row>
                <Row className={'row-align'}>
                    <Col>
                        <form onSubmit={this.changeScoreOfTask}>
                            <label>
                                Change score:
                            </label>
                            <input type="text" placeholder={'Available options: [5,10,15,20,25]'} value={this.state.eventScoreValue} onChange={this.handleScoreChange}/>
                            <Button className={'button-width '}  variant="outline-secondary" type="submit">Change score</Button>
                        </form>
                    </Col>
                    <Col>
                        <form onSubmit={this.addTagToTask}>
                            <label>
                                Add tag:
                            </label>
                            <input type="text" placeholder={'No special chars allowed. Example: numbers'} value={this.state.eventTagValue} onChange={this.handleTagChange}/>
                            <Button className={'button-width '} variant="outline-secondary" type="submit">Add tag</Button>
                        </form>
                    </Col>
                </Row>
                <Row  className={'row-align'}>
                    <Col>
                        <Button className={'button-width '}  variant="outline-primary" value={'/suite.yml'} onClick={this.changeEditor}>
                            Edit suite.yml
                        </Button>
                    </Col>
                    <Col>
                        <Button className={'button-width '}  variant="outline-primary" value={'/solution.c'} onClick={this.changeEditor}>
                            Edit solution.c
                        </Button>
                    </Col>
                    <Col>
                        <Button className={'button-width '}  variant="outline-primary" value={'/tests.c'} onClick={this.changeEditor}>
                            Edit tests.c
                        </Button>
                    </Col>
                    <Col>
                        <Button className={'button-width '}  variant="outline-primary" value={'/assignment.md'} onClick={this.changeEditor}>
                            Edit assignment.md
                        </Button>
                    </Col>
                </Row>
                <Row>
                    Editing {file}
                </Row>
                <Row className={'row-align'}>

                        <AceEditor
                            placeholder="No data"
                            mode={language}
                            theme="monokai"
                            name="blah2"
                            width="100%"
                            height="400px"
                            onChange={this.onChange}
                            fontSize={14}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={this.state.textInAce}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}/>



                </Row>
                <Row>
                    <Button className={'button-width '}  variant="outline-secondary" onClick={this.changeFile}>
                        Save changes
                    </Button>
                </Row>
            </Container>
        )
    }

}

export default TaskPage;
