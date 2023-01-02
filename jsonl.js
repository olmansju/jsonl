let jsonlArray = [];
let cleanArray = [];
let formatted = "";

document.getElementById("convertButton").addEventListener("click", convertTOjsonl);
document.getElementById("copyButton").addEventListener("click", copyToClipboard);

function convertTOjsonl(){
    console.log('button pushed');
    let promptText = document.getElementById("promptTextArea").value;
    let promptTrimmed = promptText.trim();
    let promptEnd = "\n\n###\n\n";
    let completionText = document.getElementById("completionTextArea").value;
    let completionTrimmed = completionText.trim();
    let completionEnd = "END";
    //space at beginning of completion is deliberate / recommended
    let jsonlObject = {'prompt': `${promptTrimmed}${promptEnd}`, 'completion': ` ${completionTrimmed} ${completionEnd}`};
    jsonlArray.push(jsonlObject);
    let cleanObject = {'prompt': promptTrimmed, 'completion': completionTrimmed};
    cleanArray.push(cleanObject);
    updateResultsDiv();
}

function updateResultsDiv(){
    console.log('updateResultsDiv called');
    cleanArray.forEach(value=> formatted += `{'prompt': '${value.prompt}\\n\\n###\\n\\n', 'completion': ' ${value.completion} END'}\n`);
    document.getElementById('results').innerText = formatted;
}

function copyToClipboard(){
    let copyText = "text test text test";
    navigator.clipboard.writeText(formatted);
}
