function part6A(data){
	let[time,distance]=data.split("\n");
	time=time.replace("Time:","").trim().split(/\s+/g).map(Number)
	distance=distance.replace("Distance:","").trim().split(/\s+/g).map(Number)
	let acc=[];
	for(const i in time){
		const t=time[i],d=distance[i];
		let acc_=0;
		for(let j=0;j<t;j++){
			const k=j*(t-j);
			if(k>d)acc_++;
		}
		acc.push(acc_);
	}
	return acc.reduce((acc,cur)=>acc*cur);
}
function part6B(data){
	let[time,distance]=data.split("\n");
	time=Number(time.replace("Time:","").replaceAll(/\s+/g,""));
	distance=Number(distance.replace("Distance:","").replaceAll(/\s+/g,""));
	let acc=0;
	for(let j=0;j<time;j++){
		const k=j*(time-j);
		if(k>distance)acc++;
	}
	return acc;
}
const testData6="Time:      7  15   30\nDistance:  9  40  200";
async function solve6(){
	console.assert(part6A(testData6)===288);
	console.assert(part6B(testData6)===71503);
	const data=await(await fetch("https://adventofcode.com/2023/day/6/input")).text();
	//const data=document.body.innerText;
	console.time("boat race")
	console.log("part6A",part6A(data));
	console.log("part6B",part6B(data));
	console.timeEnd("boat race")
}
await solve6();
