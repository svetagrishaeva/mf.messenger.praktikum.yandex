import { infoItems, passwordItems } from './profile-data.js';
import { infoItemsTmpl, passwordItemsTmpl } from './profile-template.js';

// info items page render 
render(infoItems, infoItemsTmpl, 'info-items');

saveButton.onclick = () => {
    // redrawing page to its original view
    setDisplayValueForElements('');
    saveButton.style.display = 'none'; 

    infoItems.forEach(x => {
        let infoElement = document.getElementById(x.id);
        if (infoElement) {
            infoElement.parentNode.style.display = '';
            infoElement.parentNode.setAttribute('disabled', 'disabled');
        }
    })

    passwordItems.forEach(x => {
        let passwordElement = document.getElementById(x.id);
        if (passwordElement) {
            passwordElement.parentNode.style.display = 'none';
        }
    })
}

dataChangeLink.onclick = () => {
    setDisplayValueForElements('none');
    saveButton.style.display = 'block'; 

    infoItems.forEach(x => {
        document.getElementById(x.id).removeAttribute('disabled');
        document.getElementById(x.id).onchange = onChange;
    });
}

passwordChangeLink.onclick = () => {
    setDisplayValueForElements('none');
    saveButton.style.display = 'block'; 

    const dataElements = document.getElementById('info-items').children;
    Array.prototype.forEach.call(dataElements, x => x.style.display = 'none');

    // password items page render 
    render(passwordItems, passwordItemsTmpl, 'password-items');

    passwordItems.forEach(x => document.getElementById(x.id).onchange = onChange);
}

function setDisplayValueForElements(value) {
    let elements = document.getElementsByClassName('link-row');
    Array.prototype.forEach.call(elements, x => x.style.display = value);

    document.getElementById('circle-overlay').style.display = value;
    document.getElementById('user-name').style.display = value;
}

function onChange() {
    console.log(this, this.value);
}

function render(items, tmpl, parentElementId) {
    let html = _.template(tmpl)({ items: items });
    document.getElementById(parentElementId).innerHTML = html;
    
    let name = items.find(x => x.id == 'display_name')?.value;
    if (name) {
        document.getElementById('user-name').textContent = name;
    }
}