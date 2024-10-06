import csv 

with open('src/Components/FINAL_COORDS.csv', 'r') as read_obj: 

	# Return a reader object which will 
	# iterate over lines in the given csvfile 
	csv_reader = csv.reader(read_obj) 

	# convert string to list 
	list_of_csv = []
	for row in csv_reader:
		nrow=[float(row[0]),float(row[1])]
		list_of_csv.append(nrow)
	print(list_of_csv) 
