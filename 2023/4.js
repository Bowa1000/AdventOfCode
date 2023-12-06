const space=/\s+/g;
function part4A(data){
	let acc=0;
	for(const line of data.split("\n")){// split cards into stacks
		const numbers=line.replace(/Card\s+\d+:\s+/,"");// remove unnecessary data
		let[a,b]=numbers.split(/\s+\|\s+/);// split data into 2 sets
		b=b.split(space).map(Number);// convert second groupB into numbers
		// convert groupA into numbers and count how many appear in groupB
		let matches=a.split(space).map(Number).reduce((accumulator,current)=>accumulator+b.includes(current),0);
		if(matches<1)continue;// no points, skip next line to skip fractional exponent ugliness
		acc+=2**(matches-1);// every match past the first doubles score
	}
	return acc;
}
/*
4*1
2*1	2*2
2*1	2*2	2*4
1*1	1*2	1*4	1*8
0*1	0*2	0*2	0*6	0*14
0*1	0*1	0*1	0*1	0*1	0*1

1+2+4+8+14+1
*/
function part4B(data){
	let acc=0;
	const cards=data.split("\n").map(line=>{// split cards into stacks
		const numbers=line.replace(/Card\s+\d+:\s+/,"");// remove unnecessary data
		let[a,b]=numbers.split(/\s+\|\s+/);// split data into 2 sets
		b=b.split(space).map(Number);// convert second groupB into numbers
		// convert groupA into numbers and count how many appear in groupB
		return a.split(space).map(Number).reduce((accumulator,current)=>accumulator+b.includes(current),0);
	}).map(score=>{return{score,count:1}});// convert scores into stacks
	for(let i=0;i<cards.length;i++){// for each card
		const{score,count}=cards[i]
		acc+=count;// count how many we got total
		if(score>1){// if it has a score of 2+
			const j_=i+score;
			// multiply the next SCORE card stacks COUNT times
			for(let j=i+1;j<=j_;j++)cards[j].count+=count;// (add COUNT to the next SCORE lines)
		}
		// otherwise if it has a score of 1 multiple only the next card stack COUNT times
		else if(score===1)cards[i+1].count+=count;// add COUNT to the next line
	}
	return acc;
}
const testData4=`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
async function solve4(){
	console.assert(part4A(testData4)===13);
	console.assert(part4B(testData4)===30);
	//const data=(await(await fetch("https://adventofcode.com/2023/day/4/input")).text()).trim();
	const data=document.body.innerText.trim();
	console.time("card counting");
	console.log("part4A",part4A(data));
	console.log("part4B",part4B(data));
	console.timeEnd("card counting");
}
await solve4();
