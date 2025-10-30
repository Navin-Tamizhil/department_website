import pandas as pd
import json

# Replace 'data.xlsx' with your Excel filename
excel_file = 'phd_all.xlsx'
json_file = 'phd_all.json'

# Read Excel file (assuming data is in the first sheet)
df = pd.read_excel(excel_file)

# Convert DataFrame to list of dictionaries
data = df.to_dict(orient='records')

# Save to JSON file
with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print(f"Data saved to {json_file}")
