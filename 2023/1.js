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
const digits=["zero","one","two","three","four","five","six","seven","eight","nine",];
function mapper(_,a,b){
	if(digits.includes(a))a=digits.indexOf(a).toString();// map words to numbers
	if(digits.includes(b))b=digits.indexOf(b).toString();// map words to numbers
	return a+b;// return combined digit pair
}
function partB(data){
	// match whole line, passing first and last number to mapper for conversion to digits
	// i tried splitting this into 2 patterns for readability, which matched neither end correctly
	data=data.replaceAll(/^[^\d]*?(\d|zero|one|two|three|four|five|six|seven|eight|nine).*(\d|zero|one|two|three|four|five|six|seven|eight|nine)[^\d]*?$/gm,mapper);
	// same as above assuming remaining lines are single numbers, doubling match via nesting, should not match digit pairs produced from above
	data=data.replaceAll(/^[^\d]*?((\d|zero|one|two|three|four|five|six|seven|eight|nine))[^\d]*?$/gm,mapper);
	return data.split("\n").map(Number).reduce((a,b)=>a+b); // convert list into string array, then number array, then sum of numbers
}

async function solve(){
	const input=await(await fetch("https://adventofcode.com/2023/day/1/input")).text();
	console.time("solve")
	console.assert(partA(`1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet`)===142);
	console.assert(partB(`two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen`)===281);
	console.log("Part A",partA(input));
	console.log("Part B",partB(input));
	console.timeEnd("solve")
}
// in-browser console allows top level await
await solve();
