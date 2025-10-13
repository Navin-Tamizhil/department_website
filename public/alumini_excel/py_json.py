import pandas as pd
import json

# Excel file name
excel_file = 'alumini.xlsx'

# Load the entire Excel file
xls = pd.ExcelFile(excel_file)

# Loop through all sheet names
for sheet_name in xls.sheet_names:
    # Read the sheet into a DataFrame
    df = pd.read_excel(xls, sheet_name=sheet_name)

    # Convert DataFrame to JSON format (list of dicts)
    data_json = df.to_dict(orient='records')

    # Create a JSON file named after the sheet
    json_filename = f'{sheet_name}.json'
    with open(json_filename, 'w', encoding='utf-8') as json_file:
        json.dump(data_json, json_file, ensure_ascii=False, indent=4)

    print(f"Saved JSON for sheet '{sheet_name}' as '{json_filename}'")
