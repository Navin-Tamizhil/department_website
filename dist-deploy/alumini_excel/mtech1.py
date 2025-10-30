import pandas as pd
import json
import re

def parse_alumni_excel(file_path, sheet_name):
    # Read the specific sheet with all data as strings, no header row
    df = pd.read_excel(file_path, sheet_name=sheet_name, header=None, dtype=str)
    df.fillna('', inplace=True)  # Replace NaN with empty string
    
    # Regex pattern to identify batch headers like "M.Tech Alumni 2023 - 2025 Batch"
    batch_header_pattern = re.compile(r'^M\.Tech Alumni \d{4} ?- ?\d{4} Batch$', re.IGNORECASE)
    
    batch_indices = []
    batch_names = []
    
    # Find rows containing batch headers
    for i, val in enumerate(df[0]):
        if batch_header_pattern.match(val.strip()):
            batch_indices.append(i)
            batch_names.append(val.strip())
    
    batch_indices.append(len(df))  # End index for last batch
    
    # Process each batch
    for i in range(len(batch_indices) - 1):
        start_idx = batch_indices[i]
        end_idx = batch_indices[i + 1]
        
        batch_name = batch_names[i]
        
        # Header row is immediately after batch header row
        headers = df.iloc[start_idx + 1].tolist()
        headers = [h.strip() for h in headers]
        
        # Extract data rows after header row
        batch_data = df.iloc[start_idx + 2:end_idx]
        
        records = []
        for _, row in batch_data.iterrows():
            record = {headers[j]: row[j].strip() if isinstance(row[j], str) else row[j] for j in range(len(headers))}
            # Only add record if at least one field is non-empty
            if any(record.values()):
                # Replace empty strings with None
                record = {k: (v if v != '' else None) for k, v in record.items()}
                records.append(record)
        
        # Clean filename: remove spaces, dots, dashes to avoid issues
        filename = batch_name.replace(' ', '_').replace('-', '_').replace('.', '') + '.json'
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(records, f, ensure_ascii=False, indent=4)
        
        print(f'Saved {filename} with {len(records)} records')

if __name__ == "__main__":
    parse_alumni_excel('alumini1.xlsx', 'MTech Alumni')
