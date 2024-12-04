const express = require('express');

const app = express();

app.use(express.json());

function calculate(first, second, operator, fullString = true) {
    let str = `${first} ${operator} ${second}`;
    
    if (operator == '/' && second == 0) {
        return { result: 'Division by 0' }
    } else {
        const result = eval(str);
        if (fullString) {
            return { result: `${str} = ${result}` }
        } else {
            return { result: result }
        }
    }
}

app.post('/calc', (req, res) => {
    const { first, second, operator } = req.body;
    const result = calculate(first, second, operator);
    res.json(result);
})

app.post('/result', (req, res) => {
    const { first, second, operator } = req.body;
    const result = calculate(first, second, operator, false);
    res.json(result);
})

app.use(express.static('public'))
app.use('/Calc', express.static('public', {extensions: ['html']}))

app.listen(5000, () => console.log('listening on port 5000'));