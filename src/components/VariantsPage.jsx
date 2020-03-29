import React, {Component} from 'react';
import {getFileText, editFileText, getVariants} from "../utils/FetchHelper";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "ace-builds";
import AceEditor from "react-ace";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './VariantsPage.css';
import {VARIANTS_TEXT} from '../utils/Constants';
import {NotificationManager} from 'react-notifications';
import Spinner from 'react-bootstrap/Spinner';


import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";

class VariantsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            default_path: 'ztool-definition.yml',
            yaml: '',
            variants: 'Click button above to generate.',
            isVariants: false,
            copied: false,
            loading: false
        };
        this.onChange = this.onChange.bind(this);
        this.changeYamlFile = this.changeYamlFile.bind(this);
        this.generateVariants = this.generateVariants.bind(this);
        this.showRightButton = this.showRightButton.bind(this);
    }

    componentDidMount() {
        getFileText(this.state.default_path).then(response => {
            this.setState({textInAce: response.data});
        });
    }

    changeYamlFile() {
        editFileText(this.state.default_path, this.state.textInAce).then( () =>
            NotificationManager.success('File changed', 'Success')
        ).catch(error => {
            NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                alert(error);
            })
        });
    }

    onChange(newValue) {
        this.setState({textInAce: newValue})
    }

    generateVariants() {
        this.setState({loading: true});
        getVariants().then(response => {
            this.setState({variants: response.data, isVariants: true});
            NotificationManager.success('Variants generated', 'Success');
        }).catch(error => {
            NotificationManager.error('Error', 'Error: click me!', 8000, () => {
                alert(error);
            })
        }).then( () => this.setState({loading: false}));
    }

    showRightButton() {
        if (this.state.loading){
            return  <Button variant="outline-secondary" className={'button-width'} disabled>
                        It may take a few minutes
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </Button>
        }
        if (this.state.isVariants) {
            return <CopyToClipboard text={this.state.variants}
                                    onCopy={() => { this.setState({copied: true}) }}>
                <Button variant="outline-secondary" className={'button-width'} onClick={this.copy}>
                    Copy variants
                    {this.state.copied ? <span style={{color: 'red'}}> ✓</span> : null}
                </Button>
            </CopyToClipboard>
        }
        return  <Button variant="outline-secondary" className={'button-width'} onClick={this.generateVariants}>
                    Generate variants
                </Button>

    }

    render() {
        return (
            <div>
                <Container>
                    <Row className={'container-move'}>
                        <Button variant="outline-secondary" className={'button-width'} onClick={this.changeYamlFile}>
                            Save changes
                        </Button>
                    </Row>

                    <Row className={'container-move'}>
                        <Col xs={8}>
                            <AceEditor
                                placeholder="No data"
                                width="100%"
                                height="400px"
                                mode="yaml"
                                theme="monokai"
                                name="blah2"
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
                        </Col>
                        <Col>
                            {VARIANTS_TEXT}
                        </Col>
                    </Row>

                    <Row className={'container-move'}>
                        {this.showRightButton()}
                    </Row>
                    <Row className={'container-move'}>
                        <Col xs={8}>
                            <AceEditor
                                placeholder="No data"
                                mode="yaml"
                                theme="monokai"
                                name="blah2"
                                width="100%"
                                height="400px"
                                fontSize={14}
                                showPrintMargin={true}
                                showGutter={true}
                                readOnly={true}
                                highlightActiveLine={true}
                                value={this.state.variants}
                                setOptions={{
                                    enableBasicAutocompletion: false,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: false,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                }}/>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }

}

export default VariantsPage;
