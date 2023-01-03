let jsonlArray = [];
let cleanArray = [];
let formatted = "";

document.getElementById("convertButton").addEventListener("click", convertTOjsonl);
document.getElementById("copyButton").addEventListener("click", copyToClipboard);
document.getElementById("saveToLocalFileButton").addEventListener("click", downloadFile);

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
    formatted = "";
    cleanArray.forEach(value=> formatted += `{'prompt': '${value.prompt}\\n\\n###\\n\\n', 'completion': ' ${value.completion} END'}\n`);
    document.getElementById('results').innerText = formatted;
    console.log('jsonlArray:', JSON.stringify(jsonlArray), 'cleanArray:', JSON.stringify(cleanArray), 'formatted:', formatted);
}

function copyToClipboard(){
    navigator.clipboard.writeText(formatted);
}

function downloadFile(){
    console.log('downloadFile called');
    let results = document.getElementById("results").innerText;
    let file = new File([results], "jsonl.txt", {type: "text/plain"});
    console.log('file is:', file);
    const url = window.URL.createObjectURL(file);  //file.data
    const a = document.createElement('a');
    a.href = url;
    a.download = "jsonl.jsonl"
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
