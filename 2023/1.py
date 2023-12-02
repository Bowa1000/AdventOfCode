import re
numbers={
	"0":0,"zero" :0,
	"1":1,"one"  :1,
	"2":2,"two"  :2,
	"3":3,"three":3,
	"4":4,"four" :4,
	"5":5,"five" :5,
	"6":6,"six"  :6,
	"7":7,"seven":7,
	"8":8,"eight":8,
	"9":9,"nine" :9,
}
def partA(lines):
	acc=0
	for line in lines:
		acc+=numbers[re.search("\A\D*(\d)",line).group(1)]*10
		acc+=numbers[re.search("(\d)\D*\Z",line).group(1)]
	return acc

patternA=re.compile(f"\A\D*?({'|'.join(numbers)})")
patternB=re.compile(f".*({'|'.join(numbers)})\D*?\Z")
def partB(lines:list[str]):
	acc=0
	#print(patternA,patternB)
	for line in lines:
		acc+=numbers[patternA.search(line).group(1)]*10
		acc+=numbers[patternB.search(line).group(1)]
	return acc
if __name__=="__main__":
	def main():
		import time
		testInputA=["1abc2","pqr3stu8vwx","a1b2c3d4e5f","treb7uchet"]
		testInputB=["two1nine","eightwothree","abcone2threexyz","xtwone3four","4nineeightseven2","zoneight234","7pqrstsixteen"]
		assert partA(testInputA)==142
		assert partB(testInputB)==281
		with open("1.input") as file:
			lines=file.readlines()
			start_time = time.time()
			print(partA(lines))
			print(partB(lines))
			print(f"{time.time()-start_time} seconds")
	main()
