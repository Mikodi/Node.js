"use strict";

const colors = require("colors/safe");

console.log(process.argv);

let num = process.argv[2];
let k = 0;

if (!(Number.isInteger(Number(num)) || Number.isInteger(Number(process.argv[3])))) {
    throw new Error(colors.red("Одно из значений не является числом, повторите попытку."));
} else {
    for (let i = num; i <= process.argv[3]; i++) {
        let flag = 1;
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = 0;
            } 
        }
        if (flag === 1 & i >= 2) {

            k++;
            if (k > 3) {
                k = 1;
            }
            switch (k) {
                case 1:
                    console.log(colors.green(i));
                    break;
                case 2:
                    console.log(colors.yellow(i));
                    break;
                case 3:
                    console.log(colors.red(i));
                    break;
            }  
        }
    }
}

if (k === 0) {
    console.log(colors.red("В данном диапозоне значений нет простых чисел."));
}