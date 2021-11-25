const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');


inquirer.prompt([
    {
        name: 'directory',
        type: 'input',
        message: 'input the desired directory: ',
        default: __dirname,
    },
]).then((name)=> {
    const directoryFiles = path.resolve(__dirname, name.directory);
    questions(directoryFiles);
});


function questions(params) {
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list',
            message: 'Choose a file to read:',
            choices() {
                return fs.readdirSync(params);
            }
        },
    ]).then(({ fileName }) => {
        const fullPath = path.join(params, fileName);

        if (fs.lstatSync(fullPath).isFile()) {
            const data = fs.readFileSync(fullPath, 'utf-8');
            search_line(data);
        } else { 
            questions(fullPath);
        }
    });
};


function search_line(data) {
    inquirer.prompt([
        {
            name: 'search',
            type: 'input',
            message: 'Input the required line: ',
        },
    ]).then((answer) => {
        if (data.indexOf(answer.search) >= 0) {
            console.log("Совпадения найдены");
        } else {
            console.log("Совпадений нет")
        }
    });
};

