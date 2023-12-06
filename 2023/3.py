# not really a different method from 3.js since i don't see one that isn't shooting myself in the foot
import re
patternA=re.compile("[^\d.\n]")
patternB=re.compile("\*")

# not working, trying to debug
def partA(data:list[str])->int:
	acc,used=0,set()
	def add(x,y):
		if not data[y][x-1].isnumeric():return 0
		while data[y][x-1].isnumeric():x-=1
		print((x,y))
		if (x,y) in used:return 0
		else:used.add((x,y))
		x_=x
		while data[y][x_].isnumeric():x_+=1
		print(data[y][x:x_])
		return int(data[y][x:x_])
	for y,line in enumerate(data):
		for m in patternA.finditer(line):
			acc+=add(m.start()-1,y-1)
			acc+=add(m.start()  ,y-1)
			acc+=add(m.start()+1,y-1)
			acc+=add(m.start()-1,y  )
			#acc+=add(m.start()  ,y  )
			acc+=add(m.start()+1,y  )
			acc+=add(m.start()-1,y+1)
			acc+=add(m.start()  ,y+1)
			acc+=add(m.start()+1,y+1)
	return acc

# not working, trying to debug
def partB(data:list[str])->int:
	acc=0
	def index(x:int,y:int,used:set[tuple[int,int,int]]):
		if not data[y][x-1].isnumeric():return
		while data[y][x-1].isnumeric():x-=1
		x_=x
		while data[y][x_].isnumeric():x_+=1
		used.add((x,y,int(data[y][x:x_])))
	for y,line in enumerate(data):
		used=set()
		for m in patternB.finditer(line):
			index(m.start()-1,y-1,used)
			index(m.start()  ,y-1,used)
			index(m.start()+1,y-1,used)
			index(m.start()-1,y  ,used)
			#index(m.start()  ,y  ,used)
			index(m.start()+1,y  ,used)
			index(m.start()-1,y+1,used)
			index(m.start()  ,y+1,used)
			index(m.start()+1,y+1,used)
			if len(used)==2:acc+=used.pop()*used.pop()
	return acc

if __name__=="__main__":
	def main():
		testData=[
			"467..114..",
			"...*......",
			"..35..633.",
			"......#...",
			"617*......",
			".....+.58.",
			"..592.....",
			"......755.",
			"...$.*....",
			".664.598..",
		]
		import time
		a=partA(testData)
		b=partB(testData)
		print(a,b)
		assert a==4361
		assert b==467835
		with open("3.input") as file:
			lines=file.readlines()
			start_time=time.time()
			print(partA(lines))
			print(partB(lines))
			print(f"{time.time()-start_time} seconds")
	main()
