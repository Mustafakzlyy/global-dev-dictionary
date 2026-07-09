/*
 � �* GLOBAL DEV DICTIONARY - CONFIGURATION ZONE

 Hey there! Want to add a new language to the project?
 It's super easy! Just add a new line inside the 'supportedLanguages'
 array below following this format:
 { code: "language_code", name: "Language_Name" }

 Example for Spanish:
 { code: "es", name: "Español" }

 */
const supportedLanguages = [
    { code: "en", name: "English" },
{ code: "ku", name: "Kurdî" }
]; //

let currentDictionaryData = [];

const langSelect = document.getElementById('lang-select');
const container = document.getElementById('dictionary-container');
const searchInput = document.getElementById('search-input');

function initLanguageSelector() {
    supportedLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.innerText = lang.name;
        langSelect.appendChild(option);
    });
}

async function loadDictionary(langCode) {
    try {
        const response = await fetch(`locales/${langCode}.json`);
        currentDictionaryData = await response.json();
        displayTerms(currentDictionaryData);
    } catch (error) {
        container.innerHTML = `<p style="color: red;">Error loading ${langCode}.json. Make sure the file exists!</p>`;
        console.error("Error loading language file:", error);
    }
}

function displayTerms(terms) {
    container.innerHTML = "";

    if(terms.length === 0) {
        container.innerHTML = "<p>No terms found matching your search.</p>";
        return;
    }

    terms.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <div>
        <h3>${item.term}</h3>
        <p>${item.definition}</p>
        </div>
        <div class="contributor">
        Contributed by: <a href="https://github.com/${item.contributor}" target="_blank">@${item.contributor}</a>
        </div>
        `;
        container.appendChild(card);
    });
}

searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = currentDictionaryData.filter(item =>
    item.term.toLowerCase().includes(keyword) ||
    item.definition.toLowerCase().includes(keyword)
    );
    displayTerms(filtered);
});

langSelect.addEventListener('change', (e) => {
    loadDictionary(e.target.value);
    searchInput.value = "";
});

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    loadDictionary('en');
});
