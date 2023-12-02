# "…\n" varient because File.readLines includes EOL
recordIndex={
	"red"  :0,"red\n"  :0,
	"green":1,"green\n":1,
	"blue" :2,"blue\n" :2,
}
def partA(data:list[str],limits:tuple[int,int,int])->int:
	r0,g0,b0=limits
	acc=0
	for session in data:
		r1,g1,b1=(0,0,0)
		for round in session[session.index(": ")+2:].split("; "):
			record=[0,0,0,]
			for marbles in round.split(", "):
				i=marbles.index(" ")
				record[recordIndex[marbles[i+1:]]]+=int(marbles[:i])
			r2,g2,b2=record
			r1=max(r1,r2)
			g1=max(g1,g2)
			b1=max(b1,b2)
		if r0>=r1 and g0>=g1 and b0>=b1:
			acc+=int(session[5:session.index(": ")])
	return acc
def partB(data:list[str])->int:
	acc=0
	for session in data:
		r0,g0,b0=(0,0,0)
		for round in session[session.index(": ")+2:].split("; "):
			record=[0,0,0,]
			for marbles in round.split(", "):
				i=marbles.index(" ")
				record[recordIndex[marbles[i+1:]]]+=int(marbles[:i])
			r1,g1,b1=record
			r0=max(r0,r1)
			g0=max(g0,g1)
			b0=max(b0,b1)
		acc+=r0*g0*b0
	return acc
if __name__=="__main__":
	def main():
		testData=[
			"Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
			"Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
			"Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
			"Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
			"Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
		]
		import time
		assert partA(testData,(3,5,4))==2
		assert partB(testData)==2286
		with open("2.input") as file:
			lines=file.readlines()
			start_time = time.time()
			print(partA(lines,(12,13,14)))
			print(partB(lines))
			print(f"{time.time()-start_time} seconds")
	main()
