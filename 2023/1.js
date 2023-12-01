// https://adventofcode.com/2023/day/1

// assumtions: there is at least 1 digit, no empty lines, non-digits are irrelivant
function partA(data){
	// itteration 1
	//data=data.replaceAll(/^[^\d]+|[^\d]+$/gm,"")  // remove non-digits from outside  qwe4rty2uio0p -> 4rty2uio0 | asd6fgh9jkl -> 6fgh9 | zxc5vbn -> 5
	//data=data.replaceAll(/^(\d).+(\d)$/gm,"$1$2") // remove non-digits from inside   4rty2uio0 -> 40 | 6fgh9 -> 69
	//data=data.replaceAll(/^(\d)$/gm,"$1$1")       // duplicate single-digits         5 -> 55
	// refactorization
	data=data.replaceAll(/^[^\d]*(\d).*(\d)[^\d]*$|^[^\d]*(\d)[^\d]*$/gm,"$1$2$3$3")// combine above
	return data.split("\n").map(Number).reduce((a,b)=>a+b); // convert list into string array, then number array, then sum of numbers
}
// ammendments: some numbers are spelled out
function mapper(_,a,b){
	switch(a){
		case"zero":a="0";break;
		case"one":a="1";break;
		case"two":a="2";break;
		case"three":a="3";break;
		case"four":a="4";break;
		case"five":a="5";break;
		case"six":a="6";break;
		case"seven":a="7";break;
		case"eight":a="8";break;
		case"nine":a="9";break;
	}
	switch(b){
		case"zero":b="0";break;
		case"one":b="1";break;
		case"two":b="2";break;
		case"three":b="3";break;
		case"four":b="4";break;
		case"five":b="5";break;
		case"six":b="6";break;
		case"seven":b="7";break;
		case"eight":b="8";break;
		case"nine":b="9";break;
	}
	return a+b;
}
function partB(data){
	// match whole line, passing first and last number to mapper for conversion to digits
	// i tried splitting this into 2 patterns for readability, which matched neither end correctly
	data=data.replaceAll(/^[^\d]*?(\d|zero|one|two|three|four|five|six|seven|eight|nine).*(\d|zero|one|two|three|four|five|six|seven|eight|nine)[^\d]*?$/gm,mapper);
	// same as above assuming remaining lines are single numbers, doubling match via nesting, should not match digit pairs produced from above
	data=data.replaceAll(/^[^\d]*?((\d|zero|one|two|three|four|five|six|seven|eight|nine))[^\d]*?$/gm,mapper);
	return data.split("\n").map(Number).reduce((a,b)=>a+b); // convert list into string array, then number array, then sum of numbers
}

console.assert(partA(`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`)===142);
console.assert(partB(`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`)===281);
// running in terminal appears to error
const input=await(await fetch("https://adventofcode.com/2023/day/1/input")).text();
console.log("Part A",partA(input));
console.log("Part B",partB(input));
