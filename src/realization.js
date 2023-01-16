import { changeTheme } from './changeTheme.js';
import {
    Calculator,
    AddCommand,
    SubCommand,
    MultyCommand,
    DivCommand,
    PercentCommand,
    PowYCommand,
    SqrtYCommand,
    FactorialCommand,
    TenPowXCommand,
    DivideOnXCommand,
    ChangeSignCommand
} from './functions.js';

let leftOperand = '';
let rightOperand = '';
let result = null;
let lastOperation = '';
let equalCheck = false;
let dotCheck = false;
let memory = new Calculator();
const calc = new Calculator();
const buttons = document.querySelector(".buttons");
buttons.addEventListener('click', realization);
const output = document.getElementById('answer');
const input = document.getElementById('input');

function realization(event){
    if (event.target.classList.contains('theme')){
        // document.querySelector('.equals').classList.toggle('light'); 
        // document.querySelector('.number').classList.toggle('light');
        // document.querySelector('.button').classList.toggle('light');
        // document.querySelector('.calcBody').classList.toggle('light');
        // document.querySelector('.output').classList.toggle('light');
        changeTheme();
    }

    if (event.target.classList.contains('number')){
        if (event.target.value == '.'){
            if (dotCheck == false){
                dotCheck = true;
                leftOperand += event.target.textContent;
                output.innerHTML = leftOperand;
            }
        } else{
            if (!lastOperation){
                leftOperand += event.target.textContent;
                output.innerHTML = leftOperand;
            } else{
                rightOperand += event.target.textContent;
                output.innerHTML = rightOperand;
            }
        }
    }

    if (event.target.classList.contains('sign')){
        if (!output.innerHTML) return;
        output.innerHTML *= -1;   
        leftOperand = output.innerHTML;  
    }

    if (event.target.classList.contains('memory')){
        switch (event.target.value){
            case 'MR':
                output.innerHTML = memory.value;
                leftOperand = memory.value;
                break;
            case 'MC':
                leftOperand = '';
                if (!memory.value) return;
                memory.value = 0;
                output.innerHTML = '';
                break;
            case 'M+':
                memory.executeCommand(new AddCommand(+leftOperand));
                output.innerHTML = '';
                leftOperand = ''; 
                break;
            case 'M-':
                memory.executeCommand(new SubCommand(+leftOperand));
                output.innerHTML = '';
                leftOperand = ''; 
                break;
        }
    }

    if (event.target.classList.contains('once')){
        calc.value = +leftOperand;
        lastOperation = event.target.value;
        calc.value = mathRealization();
        input.innerHTML = calc.value;
        output.innerHTML = '';
        leftOperand = calc.value;
    }

    if (event.target.classList.contains('clear')){
        calc.value = 0;
        calc.memory = 0;
        leftOperand = '';
        rightOperand = '';
        output.innerHTML = '';
        input.innerHTML = '';
    }

    if (event.target.classList.contains('operation')){
        dotCheck = false;
        if (event.target.value == '='){
            if (!rightOperand){
                calc.value = +leftOperand;
                output.innerHTML = calc.value;
            } else{
                calc.value = mathRealization();
                output.innerHTML = calc.value;
                input.innerHTML = '';
            }
            calc.value = 0;
            rightOperand = '';
            equalCheck = true;
        } else{
            if (equalCheck){
                leftOperand = output.innerHTML;
            }
            if (!rightOperand){
                calc.value = +leftOperand;
            } else {
                leftOperand = mathRealization();
                output.innerHTML = calc.value;
                input.innerHTML = '';
                if (!equalCheck)
                    leftOperand = '';
            }
            if (!leftOperand) {
                rightOperand = output.innerHTML.trim();
                output.innerHTML = '';
            } 
            output.innerHTML = '';
            input.innerHTML = leftOperand + ' ' + event.target.value;
            rightOperand = '';
            lastOperation = event.target.value;
            dotCheck = false;
            equalCheck = false;
        }
    }
}

function mathRealization(){
    switch(lastOperation){
        case '+':
            calc.executeCommand(new AddCommand(+rightOperand)); 
            break;
        case '-':
            calc.executeCommand(new SubCommand(+rightOperand)); 
            break;
        case '*':
            calc.executeCommand(new MultyCommand(+rightOperand)); 
            break;
        case '/':
            calc.executeCommand(new DivCommand(+rightOperand)); 
            break;
        case '%':
            calc.executeCommand(new PercentCommand(+rightOperand)); 
            break;            
        case '^2':
            calc.executeCommand(new PowYCommand(2)); 
            break;
        case '^3':
            calc.executeCommand(new PowYCommand(3)); 
            break;
        case 'sqrt':
            calc.executeCommand(new SqrtYCommand(2)); 
            break;
        case 'sqrt3':
            calc.executeCommand(new SqrtYCommand(3)); 
            break;
        case 'sqrty':
            calc.executeCommand(new SqrtYCommand(+rightOperand)); 
            break;             
        case '^y':
            calc.executeCommand(new PowYCommand(+rightOperand)); 
            break;   
        case '1/x':
            calc.executeCommand(new DivideOnXCommand(+rightOperand)); 
            break;  
        case 'x!':
            calc.executeCommand(new FactorialCommand(+rightOperand)); 
            break;
        case '10^x':
            calc.value = 10;
            calc.executeCommand(new PowYCommand(+leftOperand)); 
            break;
    }
    result = calc.value;
    return result;
} 