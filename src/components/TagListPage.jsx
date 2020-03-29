import React from 'react';
import {addTag, getListOfTags} from "../utils/FetchHelper";
import TagComponent from './TagComponent'
import Container from 'react-bootstrap/Container'
import './TaskComponent.css'
import Button from 'react-bootstrap/Button'
import {NotificationManager} from "react-notifications";
import {makeTaskTagJson} from "../utils/Helpers";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {ADD_TAG_TEXT, MULTIPLE_TAG_REGEX} from '../utils/Constants'

class TagListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            eventTagValue: ''
        };
        this.handleTagChange = this.handleTagChange.bind(this);
        this.addTagToTask = this.addTagToTask.bind(this);
    }


    componentDidMount() {
        getListOfTags().then(response => {
            this.setState({tags: response.data});
        }).catch(error => {
            NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                alert(error);
            })
        });
    }

    addTagToTask(event) {
        event.preventDefault();
        if (!this.state.eventTagValue.match(MULTIPLE_TAG_REGEX)) {
            NotificationManager.warning('Bad input. Follow guide.', 'Warrning');
            return;
        }
        let json = makeTaskTagJson(this.state.eventTagValue);
        addTag(json).then(() => {
            NotificationManager.success('Tag(s) added', 'Success');
            getListOfTags().then(response => {
                this.setState({tags: response.data});
            }).catch(error => {
                NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                    alert(error);
                })
            });
            this.setState({eventTagValue : ''})
        }).catch(error => {
            NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                alert(error);
            })
        });
    }

    handleTagChange(event) {
        this.setState({eventTagValue: event.target.value});
    }



    render() {
        const {tags} = this.state;
        return (
            <div>
                <Container>
                    <Row>

                        <Col xs={6}>
                            <form onSubmit={this.addTagToTask}>
                                <label>
                                    Add tag:
                                </label>
                                <input type="text" value={this.state.eventTagValue} onChange={this.handleTagChange}/>
                                <Button variant="outline-secondary" type="submit">Add tag</Button>
                            </form>
                        </Col>
                        <Col>
                            {ADD_TAG_TEXT}
                        </Col>

                    </Row>
                {
                    (tags.length === 0) ? (<div>No tags in tasks</div>) : (
                        <span>
                                {tags.map((tag, index) => {
                                    return (
                                        <span key={index}>
                                                <h2>
                                                    Tag: {tag.tag}
                                                </h2>
                                                <TagComponent tasks = {tag.tasks}/>
                                        </span>
                                    )
                                })}
                        </span>)
                }
                </Container>
            </div>
        );
    }
}

export default TagListPage;
