function isDigit(char){return"0123456789".includes(char);}
function part3A(data){
	const lines=data.split("\n");
	let acc=0;
	const indecies=new Set();
	function tryAddNumber(x,y){
		const line=lines[y];
		if(!line||!isDigit(line[x]))return;// if line is empty or char is non-digit, return
		while(isDigit(line[x-1]))x--;// find first digit of number
		const marker=`${x},${y}`;// generate identifier for number
		if(indecies.has(marker))return;// if already applied, skip
		else indecies.add(marker);// otherwise set as applied
		let x_=x;
		while(isDigit(line[x_]))x_++;// find last digit
		acc+=parseInt(line.slice(x,x_));// add number found
	}
	for(const y_ in lines){// for each line
		const y=parseInt(y_);
		for(const{index} of lines[y].matchAll(/[^\d.\n]/g)){// find part symbol
			tryAddNumber(index-1,y-1);//-1,-1
			tryAddNumber(index  ,y-1);// 0,-1
			tryAddNumber(index+1,y-1);//+1,-1
			tryAddNumber(index-1,y  );//-1, 0
			tryAddNumber(index+1,y  );//+1, 0
			tryAddNumber(index-1,y+1);//-1,+1
			tryAddNumber(index  ,y+1);// 0,+1
			tryAddNumber(index+1,y+1);//+1,+1
		}
	}
	return acc;
}
function part3B(data){
	const lines=data.split("\n");
	let acc=0;
	function applyDatum(x,y,datum){
		const line=lines[y];
		if(!line||!isDigit(line[x]))return;// if line is empty or char is non-digit, return
		while(isDigit(line[x-1]))x--;// find first digit of number
		const marker=`${x},${y}`;// generate identifier for number
		if(datum.indecies.has(marker))return;// if already applied, skip
		else datum.indecies.add(marker);// otherwise set as applied
		datum.count++;
		let x_=x;
		while(isDigit(line[x_]))x_++;// find last digit
		datum.acc*=parseInt(line.slice(x,x_));// add number found
	}
	for(const y_ in lines){// for each line
		if(!lines[y_].includes("*"))continue;
		const y=parseInt(y_);
		for(let x=lines[y].indexOf("*");x!==-1;x=lines[y].indexOf("*",x+1)){// find part
			const datum={indecies:new Set(),count:0,acc:1,};// running data to track
			applyDatum(x-1,y-1,datum);//-1,-1
			applyDatum(x  ,y-1,datum);// 0,-1
			applyDatum(x+1,y-1,datum);//+1,-1
			applyDatum(x-1,y  ,datum);//-1, 0
			applyDatum(x+1,y  ,datum);//+1, 0
			applyDatum(x-1,y+1,datum);//-1,+1
			applyDatum(x  ,y+1,datum);// 0,+1
			applyDatum(x+1,y+1,datum);//+1,+1
			if(datum.count===2)acc+=datum.acc;// if there are exactly 2 ajasent part numbers, add the part's accumulator to the master accumulator
		}
	}
	return acc;
}
const testData3=`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
async function solve3(){
	console.assert(part3A(testData3)===4361);
	console.assert(part3B(testData3)===467835);
	const data=await(await fetch("https://adventofcode.com/2023/day/3/input")).text();
	//const data=document.body.innerText;
	console.log("Part A",part3A(data));
	console.log("Part B",part3B(data));
}
await solve3();
