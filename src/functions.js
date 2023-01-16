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

    execute(newResult){
        let result = 1;
        for (let i = 0; i < newResult; i++){
            result *= i + 1;
        }
        return result;
    }
}

class DivideOnXCommand{

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

export {
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
};