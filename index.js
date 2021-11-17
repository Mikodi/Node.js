"use strict";

// 1 задание.

// 1, 5, 6, 2, 3, 4. Но не понимаю, почему при выводе в консоль не видит "record 3" и падает с ошибкой.


// 2 задание.
// С часами не получилось сделать, поэтому сократила до дней значение на входе.

/**
 * params(dd-mm-yyyy)
 */

const eventEmitter = require('events');
const emitter = new eventEmitter();
const colors = require("colors/safe");


function interval() {
    const ftDate = process.argv[2].split("-").reverse().join("-");
    const futureDate = +(new Date(`${ftDate}`));
    const dateNow = Date.now();
    const diff = futureDate - dateNow;
    const arr = [];

    
    const days  = Math.floor( diff / (1000 * 60 * 60 * 24) );
    const hour = Math.floor( diff / (1000 * 60 * 60));
    const min  = Math.floor( diff / (1000*60) );
    const sec  = Math.floor( diff / 1000 );

    const hours = hour - days  * 24;
    const mins = min  - hour * 60;
    const secs = sec  - min  * 60;


    arr.push({days, hours, mins, secs, diff});

    emitter.emit("exemp", arr);  
}


const timer = setInterval(function() {  
    interval();

}, 1000);


emitter.on("exemp", function(arr) {

    if (arr[0].diff < 0) {
            clearInterval(timer);
            console.log(colors.green("Время таймера истекло"));
    } else {
        console.log(`До ${colors.green(process.argv[2])} осталось: ${colors.magenta(arr[0].days)} дней ${colors.magenta(arr[0].hours)} часов ${colors.magenta(arr[0].mins)} минут ${colors.magenta(arr[0].secs)} секунд`
    );
    }
    
});


