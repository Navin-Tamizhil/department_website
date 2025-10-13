import pandas as pd
import json
import re

excel_file = 'alumini.xlsx'
sheet_name = 'MTech Alumni'  # change if different

# Load the whole sheet as raw, no headers, to preserve batch heading rows
df = pd.read_excel(excel_file, sheet_name=sheet_name, header=None)

# Pattern to detect batch headers like 'M.Tech Alumni 2023 - 2025 Batch'
batch_header_pattern = re.compile(r'M\.Tech Alumni \d{4} ?- ?\d{4} Batch', re.IGNORECASE)

# Find indices where batch headers appear
batch_start_indices = []
for idx, row in df.iterrows():
    # Check all cells in row if any matches pattern
    if any(isinstance(cell, str) and batch_header_pattern.search(cell) for cell in row):
        batch_start_indices.append(idx)

# Add an index for end of sheet to simplify logic
batch_start_indices.append(len(df))

# Iterate over batches and extract data
for i in range(len(batch_start_indices) - 1):
    start_idx = batch_start_indices[i]
    end_idx = batch_start_indices[i+1]
    
    # Extract batch header text (first matching cell in header row)
    header_row = df.iloc[start_idx]
    batch_name = None
    for cell in header_row:
        if isinstance(cell, str) and batch_header_pattern.search(cell):
            batch_name = cell.strip()
            break
    
    # Data rows start after header row + 1 (assuming one empty row before columns)
    data_start = start_idx + 2
    
    # Slice the batch data frame
    batch_df = df.iloc[data_start:end_idx].reset_index(drop=True)
    
    # The first row after batch header is assumed to be column headers (like 'Sl.No', 'Name of the Student', ...)
    batch_df.columns = batch_df.iloc[0]
    batch_df = batch_df.drop(0).reset_index(drop=True)
    
    # Drop any fully empty columns (sometimes extra empty columns exist)
    batch_df.dropna(axis=1, how='all', inplace=True)
    
    # Convert to list of dicts
    batch_data = batch_df.to_dict(orient='records')
    
    # Clean batch name for filename
    filename = re.sub(r'[\\/*?:"<>|]', "", batch_name) + '.json'
    
    # Save to JSON file
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(batch_data, f, ensure_ascii=False, indent=4)
    
    print(f"Saved {filename} with {len(batch_data)} records")
