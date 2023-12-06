class Converter{
	constructor(line){
		const[dst,src,range]=line.split(" ").map(Number);
		this.src=src;
		this.dst=dst;
		this.range=range;
	}
	compare(converter){
		return this.src-converter.src;
	}
	inRange(data){return data>=this.src&&data<(this.src+this.range);}
	//inRange(data){return data>=this.src;}
	convert(data){return data-this.src+this.dst;}
}
function part5A(data){
	data=data.split("\n\n");
	let index=data.shift().replace("seeds: ","").split(" ").map(Number);
	data=data.map(chunk=>{
		chunk=chunk.split("\n");
		chunk.shift();// delete unneed mapping information
		return chunk.map(line=>new Converter(line));//.sort((a,b)=>a.compare(b));
	});
	for(const step of data){
		for(const i in index){
			for(const converter of step){
				if(converter.inRange(index[i])){
					index[i]=converter.convert(index[i]);
					break;
				}
			}
		}
	}
	return Math.min(...index);
}
/*class Range{
	constructor(start,length){
		this.start=start;
		this.length=length;
	}
	convert(converters){

	}
}
function part5B(data){
	data=data.split("\n\n");
	const seeds=data.shift().replace("seeds: ","").split(" ").map(Number);
	let index=[];
	while(seeds.length)index.push(new Range(seeds.shift(),seeds.shift()));
	data=data.map(chunk=>{
		chunk=chunk.split("\n");
		chunk.shift();// delete unneed mapping information
		return chunk.map(line=>new Converter(line));//.sort((a,b)=>a.compare(b));
	});
	for(const step of data){
		for(const i in index){
			for(const converter of step){
				if(converter.inRange(index[i])){
					index[i]=converter.convert(index[i]);
					break;
				}
			}
		}
	}
	return Math.min(...index);
}*/
const testData5=`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
async function solve5(){
	console.assert(part5A(testData5)===35);
	//console.assert(part5B(testData5)===46);
	const data=await(await fetch("https://adventofcode.com/2023/day/5/input")).text();
	//const data=document.body.innerText;
	console.time("seed to plot")
	console.log("part5A",part5A(data));
	//console.log("part5B",part5B(data));
	console.timeEnd("seed to plot")
}
await solve5();
