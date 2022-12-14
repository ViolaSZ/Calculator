import {Calculator,AddCommand,SubCommand,MultyCommand,DivCommand,PercentCommand,Pow2Command,Pow3Command,PowYCommand,SqrtCommand,Sqrt3Command,SqrtYCommand,FactorialCommand,TenPowXCommand,DivideOnXCommand} from './functions.js';
let leftOperand = '';
let rightOperand = '';
let result = null;
let lastOperation = '';
let dotCheck = false;
let memory = new Calculator();
const calc = new Calculator();
const buttons = document.querySelector(".buttons");
buttons.addEventListener('click', realization);
const output = document.getElementById('answer');
const input = document.getElementById('input');

function realization(event){
    if (event.target.classList.contains('theme')){
        document.querySelector('.equals').classList.toggle('light'); 
        document.querySelector('.number').classList.toggle('light');
        document.querySelector('.button').classList.toggle('light');
        document.querySelector('.calcBody').classList.toggle('light');
        document.querySelector('.output').classList.toggle('light');
    }

    if (event.target.classList.contains('number')){
        if (event.target.value == '.'){
            if (dotCheck == false){
                dotCheck = true;
                leftOperand += event.target.textContent;
                output.innerHTML = leftOperand;
            }
        } else{
            leftOperand += event.target.textContent;
            output.innerHTML = leftOperand;
        }
    }

    if (event.target.classList.contains('sign')){
        if (!output.innerHTML) return;
        output.innerHTML *= -1;   
        leftOperand = output.innerHTML;  
    }

    if (event.target.classList.contains('operation')){
        dotCheck = false;
        if (event.target.value=='MR'){
            output.innerHTML = memory.value;
            leftOperand = memory.value;
        } else{
            if (event.target.value=='MC'){
                leftOperand = '';
                calc.value = 0;
                if (!memory.value) return;
                memory.value = 0;
                output.innerHTML = '';
                calc.value = 0;
            } else{
                if (event.target.value=='M-'){
                    calc.value = 0;
                    memory.executeCommand(new SubCommand(+leftOperand));
                    output.innerHTML = '';
                    leftOperand = ''; 
                } else{
                    if (event.target.value=='M+'){
                        calc.value = 0;
                        memory.executeCommand(new AddCommand(+leftOperand));
                        output.innerHTML = '';
                        leftOperand = ''; 
                    } else{
                        if (event.target.value == 'C'){
                            calc.value = 0;
                            calc.memory = 0;
                            leftOperand = '';
                            rightOperand = '';
                            output.innerHTML = '';
                            input.innerHTML = '';
                        } else{
                            if (event.target.value == '='){
                                if (!rightOperand){
                                    calc.executeCommand(new AddCommand(+leftOperand));
                                    output.innerHTML = calc.value;
                                } else{
                                    calc.value = mathRealization();
                                    output.innerHTML = calc.value;
                                    input.innerHTML = '';
                                }
                            } else{
                                if (!rightOperand){
                                    calc.executeCommand(new AddCommand(+leftOperand));
                                } else {
                                    leftOperand = mathRealization(lastOperation);
                                    output.innerHTML = calc.value;
                                    input.innerHTML = '';
                                }
                                //clearOperation(event.target.value);
                                if (!leftOperand) {
                                leftOperand = output.innerHTML;
                                output.innerHTML = '';
                                } else {
                                    rightOperand = leftOperand;
                                    output.innerHTML = '';
                                }
                                leftOperand += ' ' + event.target.value;
                                rightOperand = leftOperand;
                                input.innerHTML = leftOperand;
                                leftOperand = '';
                                lastOperation = event.target.value;
                                dotCheck = false;
                            }
                        }
                    }
                }
            }
        }
    }   
}

function mathRealization(){
    switch(lastOperation){
        case '+':
            calc.executeCommand(new AddCommand(+leftOperand)); 
            break;
        case '-':
            calc.executeCommand(new SubCommand(+leftOperand)); 
            break;
        case '*':
            calc.executeCommand(new MultyCommand(+leftOperand)); 
            break;
        case '/':
            calc.executeCommand(new DivCommand(+leftOperand)); 
            break;
        case '%':
            calc.executeCommand(new PercentCommand(+leftOperand)); 
            break;            
        case '^2':
            calc.executeCommand(new Pow2Command(+leftOperand)); 
            break;
        case '^3':
            calc.executeCommand(new Pow3Command(+leftOperand)); 
            break;
        case 'sqrt':
            calc.executeCommand(new SqrtCommand(+leftOperand)); 
            break;
        case 'sqrt3':
            calc.executeCommand(new Sqrt3Command(+leftOperand)); 
            break;
        case 'sqrty':
            calc.executeCommand(new SqrtYCommand(+leftOperand)); 
            break;             
        case '^y':
            calc.executeCommand(new PowYCommand(+leftOperand)); 
            break;   
        case '1/x':
            calc.executeCommand(new DivideOnXCommand(+leftOperand)); 
            break;  
        case 'x!':
            calc.executeCommand(new FactorialCommand(+leftOperand)); 
            break;
        case '10^x':
            calc.executeCommand(new TenPowXCommand(+leftOperand)); 
            break;
    }
    result = calc.value;
    return result;
} 