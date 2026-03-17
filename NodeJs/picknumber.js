const readline = require('readline-sync');

let response = readline.question("Pick a number: ");
let number = Number(response);

if (!Number.isNaN(number)) {
  console.log("Your number is the square root of " +
              number * number);
} else {
    console.log("Hey.  Why didn't you give me a number?");
}
