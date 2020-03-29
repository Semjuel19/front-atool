import React, {Component} from 'react';
import TaskComponent from './TaskComponent'

class TagComponent extends Component {


    render() {
        const {tasks} = this.props;
        return (
            <div>
                {tasks.map((task, index) => {
                    return (
                        <span key={index}>
                                <TaskComponent index={index} task={task}/>
                         </span>
                    )
                })}
            </div>
        )
    }

}

export default TagComponent;
