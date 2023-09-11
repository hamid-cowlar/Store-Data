import pandas as pd
import json

# Load the data from Excel
df = pd.read_excel('path_to_your_excel_file.xlsx', sheet_name="Unified Sheet")

categories_dict = {}

# Iterate over the rows
for _, row in df.iterrows():
    # Process Category
    if row['storeId'] not in categories_dict:
        categories_dict[row['storeId']] = {
            "storeId": str(row['storeId']),
            "CategoryTitle": row['CategoryTitle'],
            "logo": row['logo'],
            "mediaContent": row['mediaContent'],
            "SubcategoryTitle": []
        }

    category = categories_dict[row['storeId']]

    # Check if subcategory already exists
    subcategory = next((sc for sc in category['SubcategoryTitle'] if sc['subcategoryId'] == row['subcategoryId']), None)

    # If not, create a new subcategory
    if not subcategory:
        subcategory = {
            "storeId": str(row['storeId']),
            "subcategoryId": str(row['subcategoryId']),
            "subcategoryTitle": row['subcategoryTitle'],
            "logo": row['subcatLogo'],
            "mediaContent": row['subcatMediaContent'],
            "productItems": []
        }
        category['SubcategoryTitle'].append(subcategory)

    # Add product item to subcategory
    item_data = {
        "categoryId": str(row['storeId']),  # Assuming the storeId serves as the categoryId
        "subCategoryId": str(row['subcategoryId']),
        "ItemTitle": row['ItemTitle'],
        "description": row['description'],
        "ItemPrice": row['ItemPrice'],
        "local_image_path": row['local_image_path']
    }
    subcategory['productItems'].append(item_data)

result = list(categories_dict.values())

# Convert to JSON
with open('output.json', 'w') as outfile:
    json.dump(result, outfile, indent=4)
