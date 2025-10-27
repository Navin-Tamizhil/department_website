import os
import csv
import json

input_folder = '/home/s417/dept_website/public/students_excel'
output_folder = '/home/s417/dept_website/public/students_excel'

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.endswith('.csv'):
        csv_file_path = os.path.join(input_folder, filename)
        json_file_name = os.path.splitext(filename)[0] + '.json'
        json_file_path = os.path.join(output_folder, json_file_name)

        with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
            reader = csv.reader(csv_file)
            data = [row[0] for row in reader if row]  # read only the first column

        with open(json_file_path, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, indent=4)

        print(f"Converted: {filename} → {json_file_name}")
