export {makeTaskTagJson}

function makeTaskTagJson(parseString){
    let firstSeparation = '';
    if(parseString.charAt(parseString.length-1) === ','){
        firstSeparation = parseString.slice(0, -1).split(",");
    } else {
        firstSeparation = parseString.split(",");
    }
    let jsonString = "[";
    firstSeparation.forEach( element => {
        let values = element.split("=");
        jsonString = jsonString.concat('{"task": "',values[0],'" ,"tag": "',values[1],'"},');
    });
    jsonString = jsonString.slice(0, -1);
    jsonString = jsonString.concat("]");
    return JSON.parse(jsonString);
}