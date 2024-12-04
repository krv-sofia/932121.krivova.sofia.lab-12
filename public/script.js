const first = document.getElementById('first')
const second = document.getElementById('second')
const operator = document.getElementById('operator')
const resultNode = document.getElementById('result')
const form = document.getElementById('calc');

document.addEventListener('submit', (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
});

function isValid(str) {
    if (str == undefined || str?.trim() == '' || isNaN(str)) {
        return false;
    }
    return true;
}

async function getResult(data) {
    const res = await fetch('/result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result?.result;
}

async function getFullString(data) {
    const res = await fetch('/calc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result?.result;
}

async function handleSubmit(fullString = true) {
    if (!isValid(first.value) || !isValid(second.value)) {
        alert('Please enter valid numbers');
        return;
    }

    let data = {
        first: first.value,
        second: second.value,
        operator: operator.value
    };

    let result;
    if (fullString) {
        result = await getFullString(data)
    } else {
        result = await getResult(data);
    }

    const header = document.createElement('h1');
    header.textContent = 'Result';
    const text = document.createElement('span');
    text.innerText = result;

    resultNode.appendChild(header);
    resultNode.appendChild(text);
    form.remove();
}