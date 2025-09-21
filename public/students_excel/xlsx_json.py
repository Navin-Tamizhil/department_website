import pandas as pd
import json
import sys

def xlsx_to_json(xlsx_file, json_file, sheet_name=None):
    # Load the Excel file
    if sheet_name:
        df = pd.read_excel(xlsx_file, sheet_name=sheet_name)
    else:
        # Load first sheet by default
        df = pd.read_excel(xlsx_file)
    
    # Convert DataFrame to JSON string (records format = list of dicts)
    json_data = df.to_json(orient="records", force_ascii=False)
    
    # Write JSON data to file
    with open(json_file, "w", encoding="utf-8") as f:
        f.write(json_data)
    
    print(f"Converted '{xlsx_file}' to '{json_file}' successfully!")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python xlsx_to_json.py <input.xlsx> <output.json> [sheet_name]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    sheet = sys.argv[3] if len(sys.argv) > 3 else None

    xlsx_to_json(input_file, output_file, sheet)
