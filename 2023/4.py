def partA(data:list[str])->int:
	acc=0
	for line in data:
		line=line[line.index(": ")+2:]
		chunk_a,chunk_b=line.split(" | ")
		set_a=set(chunk_a.split(" "))
		set_b=set(chunk_b.split(" "))
		while "" in set_a:set_a.remove("")
		while "" in set_b:set_b.remove("")
		matches=len(set_a.intersection(set_b))
		if matches>=1:acc+=2**(matches-1)
	return acc
def partB(data:list[str])->int:
	acc=0
	lines=[]
	for line in data:
		line=line[line.index(": ")+2:]
		chunk_a,chunk_b=line.split(" | ")
		set_a=set(chunk_a.split(" "))
		set_b=set(chunk_b.split(" "))
		while "" in set_a:set_a.remove("")
		while "" in set_b:set_b.remove("")
		lines.append([len(set_a.intersection(set_b)),1])
	for index in range(len(lines)):
		score,count=lines[index]
		acc+=count
		while score>0:
			lines[index+score][1]+=count
			score-=1
	return acc

if __name__=="__main__":
	def main():
		testData=[
			"Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
			"Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
			"Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
			"Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
			"Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
			"Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
		]
		import time
		assert partA(testData)==13
		assert partB(testData)==30
		with open("4.input") as file:
			lines=file.readlines()
			start_time=time.time()
			print(partA(lines))
			print(partB(lines))
			print(f"{time.time()-start_time} seconds")
	main()
