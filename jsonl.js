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
    const downloadResults = document.getElementById('downloadResults');
    const blob = new Blob(formatted);
    downloadResults.href = URL.createObjectURL(blob);
    downloadResults.download = 'jsonl-file';                     //filename to download
    downloadResults.click();
}
