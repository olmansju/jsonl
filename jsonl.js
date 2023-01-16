let jsonlArray = [];
let cleanArray = [];
let formatted = "";

document.getElementById("convertButton").addEventListener("click", convertTOjsonl);
document.getElementById("copyButton").addEventListener("click", copyToClipboard);
document.getElementById("saveToLocalFileButton").addEventListener("click", downloadFile);
document.getElementById("saveToLocalMemoryBrowserButton").addEventListener("click", saveToLocalStorage);
document.getElementById("deleteLocalStorageButton").addEventListener("click", deleteFromLocalStorage);

function convertTOjsonl(){
    console.log('button pushed');
    let promptText = document.getElementById("promptTextArea").value;
    let promptTrimmed = promptText.trim().replace(/"/g, "'").replace(/\n/g, " ");
    let promptEnd = "\nBotty-TA-259:";
    let completionText = document.getElementById("completionTextArea").value;
    let completionTrimmed = completionText.trim().replace(/"/g, "'").replace(/\n/g, " ");
    let completionEnd = "\n";
    //space at beginning of completion is deliberate / recommended
    let jsonlObject = {"prompt": `${promptTrimmed}${promptEnd}`, "completion": ` ${completionTrimmed} ${completionEnd}`};
    jsonlArray.push(jsonlObject);
    let cleanObject = {"prompt": promptTrimmed, "completion": completionTrimmed};
    cleanArray.push(cleanObject);
    updateResultsDiv();
    document.getElementById("message").innerText = "-";
    document.getElementById("completionTextArea").value = "";
}

function updateResultsDiv(){
    console.log('updateResultsDiv called');
    formatted = "";
    cleanArray.forEach(value=> formatted += `{"prompt": "${value.prompt.replace(/"/g, "'").replace(/\n/g, " ")}\\nBotty-TA-259:", "completion": " ${value.completion.replace(/"/g, "'").replace(/\n/g, " ")}\\n"}\n`);
    document.getElementById('results').innerText = formatted;
    document.getElementById('resultCount').innerText = `The total number of items in this training set is: ${cleanArray.length}`;
    console.log('jsonlArray:', JSON.stringify(jsonlArray), 'cleanArray:', JSON.stringify(cleanArray), 'formatted:', formatted);
}

function copyToClipboard(){
    navigator.clipboard.writeText(formatted);
    document.getElementById('message').innerText = "jsonl data copied to clipboard";
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
    document.getElementById('message').innerText = "jsonl data downloaded as jsonl.jsonl file";
}

function saveToLocalStorage(){
    let results = document.getElementById("results").innerText;
    let jsonlObject = { "formattedResultsHTML": results, "arrayResults": jsonlArray, "cleanResults": cleanArray};
    let jsonlObjectStringified = JSON.stringify(jsonlObject);
    localStorage.setItem("jsonlements", jsonlObjectStringified);
    console.log('saved to local storage...');
    document.getElementById('message').innerText = "jsonl data saved to browser local storage";
}

function checkLocalStorage(){
    let jsonlements = localStorage.getItem("jsonlements");
    console.log(jsonlements);
    if (jsonlements != null) {
        console.log("jsonlements object found");
        let jsonlObject = JSON.parse(jsonlements);
        formatted = jsonlObject.formattedResultsHTML;
        jsonlArray = jsonlObject.arrayResults;
        cleanArray = jsonlObject.cleanResults;
        updateResultsDiv();
        document.getElementById('message').innerText = "jsonl data retrieved from local storage in browser";
    } else {
        console.log("nothing in local storage");
    }
}

function deleteFromLocalStorage(){
    localStorage.removeItem('jsonlements');
    document.getElementById('message').innerText = "jsonl data removed from local storage, refresh the page to erase results";
}

function fineTuneFormat(){
    let pyCharmTerminalCommand = `openai -k 'your-api-key-here'  api fine_tunes.create -t "C:\Users\restOfYourPath\FileName.jsonl" -m "curie"`;
    let uploadedJSONLmodel01c = "curie:ft-ilt-tlte-cehs-unl-2023-01-06-21-01-08"; //$0.09
    let uploadedJSONLmodel02c = "curie:ft-ilt-tlte-cehs-unl-2023-01-13-04-20-06"; //$0.17
    let uploadedJSONLmodel02d = "davinci:ft-ilt-tlte-cehs-unl-2023-01-16-19-58-20"; //$1.65
    let uploadedResultFile01 = "file-gIEAtMuKE1tSLFscjRCXDdSC";
    let uploadedResultFile02 = "file-GCOJLBAvPL28yrIXbAa41W1j";
    let uploadedResultFile03 = "file-zY3R7anSD7LyNUBFt92pwr7D";
    let terminalTest = `openai -k 'your-api-key-here'  api completions.create -m curie:ft-ilt-tlte-cehs-unl-2023-01-06-21-01-08 -p "when is the final day of class?"`;
}

checkLocalStorage();
