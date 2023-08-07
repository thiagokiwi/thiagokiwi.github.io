window.onload = function() {
    const selectVariables = document.getElementById('variables');
    const keywordFields = document.getElementById('keywordFields');
    const generateBtn = document.querySelector('.generateBtn');
    const downloadLink = document.getElementById('downloadLink');
    const matchTypeSelect = document.getElementById('matchType');

    function createKeywordFields() {
        keywordFields.innerHTML = '';
        for(let i = 0; i < selectVariables.value; i++) {
            let fieldLabel = document.createElement('label');
            fieldLabel.textContent = `Variable ${i+1} Keywords:`;
            let inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = `Enter keywords separated by comma`;
            keywordFields.append(fieldLabel);
            keywordFields.append(inputField);
        }
    }

    createKeywordFields();
    selectVariables.onchange = createKeywordFields;

    function generateKeywords() {
        let inputs = keywordFields.querySelectorAll('input');
        let keywordsList = Array.from(inputs).map(input => input.value.split(','));
        let generatedKeywords = combine(keywordsList);
        let matchType = matchTypeSelect.value;

        switch(matchType) {
            case "phrase":
                generatedKeywords = generatedKeywords.map(keyword => `"${keyword}"`);
                break;
            case "exact":
                generatedKeywords = generatedKeywords.map(keyword => `[${keyword}]`);
                break;
            default:
                break;
        }

        let blob = new Blob([generatedKeywords.join('\n')], {type: "text/plain;charset=utf-8"});
        let url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.classList.remove('hidden');
    }

    function combine(arr, prefix = "") {
        let result = [];
        for(let value of arr[0]) {
            if(arr.length > 1) {
                let newArr = arr.slice(1);
                let newPrefix = prefix.length > 0 ? `${prefix} ${value.trim()}` : value.trim();
                let combined = combine(newArr, newPrefix);
                result = result.concat(combined);
            } else {
                result.push(`${prefix} ${value.trim()}`.trim());
            }
        }
        return result;
    }

    generateBtn.onclick = generateKeywords;
}
