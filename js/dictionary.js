document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('wordInput');
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchWord(this.value);
        }
    });
});

function searchWord(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayDefinitions(data))
        .catch(error => {
            console.error('Error fetching the word:', error);
            displayError();
        });
}
function displayDefinitions(data) {
    const definitionsContainer = document.getElementById('definitions');
    definitionsContainer.innerHTML = ''; 

    if (!Array.isArray(data) || data.length === 0) {
        definitionsContainer.innerHTML = '<p>Word not found or an error occurred.</p>';
        return;
    }

    let overallIndex = 1;

    data.forEach((entry) => {
        entry.meanings.forEach((meaning) => {
            meaning.definitions.forEach((definition) => {
                const definitionElement = document.createElement('div');
                definitionElement.classList.add('definition');

                const defText = document.createElement('p');
                defText.innerHTML = `<strong>${overallIndex++}.</strong> ${definition.definition}`;
                definitionElement.appendChild(defText);

                if (definition.example) {
                    const exampleText = document.createElement('p');
                    exampleText.classList.add('example');
                    exampleText.textContent = `Example: ${definition.example}`;
                    definitionElement.appendChild(exampleText);
                }

                definitionsContainer.appendChild(definitionElement);
            });
        });
    });
}
