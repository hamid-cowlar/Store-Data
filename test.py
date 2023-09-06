import pandas as pd

# Read the Excel file into a DataFrame
df = pd.read_excel('data.xlsx')

# Group by Category and Sub-Category and aggregate Deals into a list
grouped = df.groupby(['Category', 'Sub-Category'])['Deals'].agg(list).reset_index()

# Convert the DataFrame to JSON
json_data = []
for index, row in grouped.iterrows():
    category = row['Category']
    subcategory = row['Sub-Category']
    deals = row['Deals']
    
    category_data = next((item for item in json_data if item['Category'] == category), None)
    if category_data is None:
        category_data = {'Category': category, 'Subcategories': []}
        json_data.append(category_data)
    
    subcategory_data = {'Subcategory': subcategory, 'Deals': deals}
    category_data['Subcategories'].append(subcategory_data)

# Save the JSON data to a file
with open('output.json', 'w') as json_file:
    json.dump(json_data, json_file, indent=4)

print("JSON data has been saved to output.json")