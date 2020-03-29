import axios from 'axios';
import * as fileSaver from "file-saver";

export {getListOfTasks, changeScore, createFunction, getListOfTags, getFileText, addTag, getTask,editFileText, getVariants,downloadExamZip}

const BASE_URL = 'https://atool-herocu.herokuapp.com';

function getListOfTasks(){
    const url = `${BASE_URL}/tasks`;
    return axios.get(url);
}

function getListOfTags(){
    const url = `${BASE_URL}/tags`;
    return axios.get(url);
}

function changeScore(taskName, score){
    const url = `${BASE_URL}/task/score`;
    return axios.post(url,{ task: taskName, score: score });
}

function createFunction(signature){
    const url = `${BASE_URL}/generate/files`;
    return axios.post(url,{ signature: signature });
}

function addTag(tasks){
    const url = `${BASE_URL}/tag/add`;
    return axios.post(url,{ tasks: tasks });
}

function getFileText(task){
    const url = `${BASE_URL}/file/read?path=${task}`;
    return axios.get(url);
}

function getTask(task){
    const url = `${BASE_URL}/task?path=${task}`;
    return axios.get(url);
}

function editFileText(task, text){
    const url = `${BASE_URL}/file/edit`;
    return axios.post(url,{ task: task, text: text});
}

function getVariants(){
    const url = `${BASE_URL}/generate/variants`;
    return axios.get(url);
}

function downloadExamZip(){
    const url = `${BASE_URL}/tasks/download`;
    return axios.get(url, {responseType: 'arraybuffer', headers: {contentType: 'multipart/form-data'}})
        .then(response => {let blob = new Blob([response.data], { type: '*/*' });
            fileSaver.saveAs(blob, "exam.zip");} );
}
