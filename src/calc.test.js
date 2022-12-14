import {Calculator,AddCommand,SubCommand,MultyCommand,DivCommand,PercentCommand,Pow2Command,Pow3Command,PowYCommand,SqrtCommand,Sqrt3Command,SqrtYCommand,FactorialCommand,TenPowXCommand,DivideOnXCommand} from './functions.js';

test('Creating test', () => {
    let calc = new Calculator();
    expect(calc.value).toBe(0);
});

test('Add test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(15));
    expect(calc.value).toBe(15);
});

test('Sub test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(39));
    calc.executeCommand(new SubCommand(7));
    expect(calc.value).toBe(32);
});

test('Multy test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(30));
    calc.executeCommand(new MultyCommand(0.5));
    expect(calc.value).toBe(15);
});

test('Div test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(20));
    calc.executeCommand(new DivCommand(2));
    expect(calc.value).toBe(10);
});

test('Percent test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(400));
    calc.executeCommand(new PercentCommand());
    expect(calc.value).toBeCloseTo(4);
});

test('^2 test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(7));
    calc.executeCommand(new Pow2Command());
    expect(calc.value).toBe(49);
});

test('^3 test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(2));
    calc.executeCommand(new Pow3Command());
    expect(calc.value).toBe(8);
});

test('Sqrt test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(16));
    calc.executeCommand(new SqrtCommand());
    expect(calc.value).toBeCloseTo(4);
});

test('Sqrt3 test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(64));
    calc.executeCommand(new Sqrt3Command());
    expect(calc.value).toBeCloseTo(4);
});

test('SqrtY test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(243));
    calc.executeCommand(new SqrtYCommand(5));
    expect(calc.value).toBe(3);
});

test('Factorial test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(6));
    calc.executeCommand(new FactorialCommand());
    expect(calc.value).toBe(720);
});

test('PowY test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(6));
    calc.executeCommand(new PowYCommand(4));
    expect(calc.value).toBe(1296);
});

test('TenPowX test', () => {
    let calc = new Calculator();
    calc.executeCommand(new AddCommand(10));
    calc.executeCommand(new TenPowXCommand(4));
    expect(calc.value).toBe(10000);
});

test('1/x tets', () => {
    let calc = new Calculator();
    calc.executeCommand(new DivideOnXCommand(15));
    expect(calc.value).toBe(0.067);
});