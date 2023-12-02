const gameRE=/^Game (\d+): (.+)$/gm;
const roundRE=/(\d+) (\w+)/g;
function partA(data,limits){
	let sum=0;
	session:for(const[,id,session] of data.matchAll(gameRE)){// split data into a list of ID and Session pairs
		const counts=Object.create(null);// start an empty record for each session
		for(const round of session.split("; ")){// split each session into a round
			const roundCount=Object.create(null);// start an empty record for each round
			for(const[,count,color] of round.matchAll(roundRE)){// extract each color,count pair fron each round
				roundCount[color]??=0;// initalize record entry with 0 if unset
				roundCount[color]+=Number(count);// incriment record entry
			}
			for(const key in roundCount)counts[key]=Math.max(counts[key]??0,roundCount[key]);// accumulate record into its heighest values
		}
		for(const key in limits)if(counts[key]>limits[key])continue session;// skip to next game if this session isn't possible
		sum+=Number(id);
	}
	return sum;
}
function partB(data){
	let sum=0;
	for(const[,id,session] of data.matchAll(gameRE)){// split data into a list of ID and Session pairs
		const counts=Object.create(null);// start an empty record for each session
		for(const round of session.split("; ")){// split each session into a round
			const roundCount=Object.create(null);// start an empty record for each round
			for(const[,count,color] of round.matchAll(roundRE)){// extract each color,count pair fron each round
				roundCount[color]??=0;// initalize record entry with 0 if unset
				roundCount[color]+=Number(count);// incriment record entry
			}
			for(const key in roundCount)counts[key]=Math.max(counts[key]??0,roundCount[key]);// accumulate record into its heighest values
		}
		sum+=counts.red*counts.green*counts.blue;// calculate power of the session
	}
	return sum;
}

const testData=`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
async function solve(){
	console.assert(partA(testData,{red:3,green:5,blue:4})===2);
	console.assert(partB(testData)===2286);
	const data=await(await fetch("https://adventofcode.com/2023/day/2/input")).text();
	//const data=document.body.innerText;
	console.time("color game");
	console.log("partA",partA(data,{red:12,green:13,blue:14}));
	console.log("partB",partB(data));
	console.timeEnd("color game");
}
await solve();
