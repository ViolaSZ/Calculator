class Calculator{
    constructor(){
        this.value = 0;
        this.operationsHistory = [];
    }

    executeCommand(command) {
        this.value = command.execute(this.value);
        this.operationsHistory.push(command);
    }
    
    undo() {
        const command = this.operationsHistory.pop();
        this.value = command.undo(this.value);
    }
}

class AddCommand{
    constructor(numberToAdd){
        this.numberToAdd = numberToAdd;
    }

    execute(newResult){
        console.log('execAdd',newResult,this.numberToAdd);
        return newResult + this.numberToAdd;
    }

    undo(newResult){
        return newResult - this.numberToAdd;
    }
}

class SubCommand{
    constructor(numberToSub){
        this.numberToSub = numberToSub;
    }

    execute(newResult){
        console.log('execSub',newResult,this.numberToAdd);
        return newResult - this.numberToSub;
    }

    undo(newResult){
        return newResult + this.numberToSub;
    }
}

class DivCommand{
    constructor(numberToDiv){
        this.numberToDiv = numberToDiv;
    }

    execute(newResult){
        return newResult / this.numberToDiv;
    }

    undo(newResult){
        return newResult * this.numberToDiv;
    }
}

class MultyCommand{
    constructor(numberToMulty){
        this.numberToMulty = numberToMulty;
    }

    execute(newResult){
        return newResult * this.numberToMulty;
    }

    undo(newResult){
        return newResult / this.numberToMulty;
    }
}

class PowYCommand{
    constructor(numberOfPow){
        this.numberOFPow = numberOfPow;
    }

    execute(newResult){
        let x = newResult;
        for (let i = 0; i < this.numberOFPow - 1; i++){
            newResult *= x;
        }
        return newResult;
    }

    undo(newResult){
        return (newResult ** (1/this.numberOFPow)).toFixed(3);
    }
}

class TenPowXCommand{
    constructor(numberOfPow){
        this.numberOFPow = numberOfPow;
    }

    execute(newResult){
        newResult = 10;
        for (let i = 0; i < this.numberOFPow - 1; i++){
            newResult *= 10;
        }
        return newResult;
    }

    undo(newResult){
        return (10 ** (1/this.numberOFPow)).toFixed(3);
    }
}

class ChangeSignCommand{
    // constructor(numberOFPow){
    //     this.numberOFPow = numberOFPow;
    // }

    execute(newResult){
        return -newResult;
    }

    undo(newResult){
        return -newResult;
    }
}

class PercentCommand{
    constructor(numberForPercent){
        this.numberForPercent = numberForPercent;
    }

    execute(newResult){
        return newResult / 100 * this.numberForPercent;
    }

    undo(newResult){
        return newResult * 100;
    }
}

class FactorialCommand{
    // constructor(numberForPercent){
    //     this.numberForPercent = numberForPercent;
    // }

    execute(newResult){
        let result = 1;
        for (let i = 0; i < newResult; i++){
            result *= i + 1;
        }
        return result;
    }

    // undo(newResult){
    //     return newResult / this.numberToPow;
    // }
}

class DivideOnXCommand{
    // constructor(numberForPercent){
    //     this.numberForPercent = numberForPercent;
    // }

    execute(newResult){
        return (1 / newResult).toFixed(3);
    }

    undo(newResult){
        return ((1 / newResult) ** (-1)).toFixed(3);
    }
}

class SqrtYCommand{
    constructor(inputNumber){
        this.inputNumber = inputNumber;
    }

    execute(newResult){
        return (newResult ** (1/this.inputNumber)).toFixed(3);
    }

    undo(newResult){
        return (newResult ** (this.inputNumber)).toFixed(3);
    }
}

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
        } else{
            if (!rightOperand){
                calc.value = +leftOperand;
            } else {
                leftOperand = mathRealization();
                output.innerHTML = calc.value;
                input.innerHTML = '';
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

//export {Calculator,AddCommand,SubCommand,MultyCommand,DivCommand,PercentCommand,Pow2Command,Pow3Command,PowYCommand,SqrtCommand,Sqrt3Command,SqrtYCommand,FactorialCommand,TenPowXCommand,DivideOnXCommand};