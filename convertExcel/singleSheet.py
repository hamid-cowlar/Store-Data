import pandas as pd
import json

# Load the data from Excel
df = pd.read_excel('data.xlsx', sheet_name="Copy of Sheet1")

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

    subcategory = next((sc for sc in category.get('SubcategoryTitle', []) if row.get('subcategoryId') and sc.get('subcategoryId') == row['subcategoryId']), None)


    # If not, create a new subcategory
    if not subcategory:
        subcategory = {
            "storeId": str(row['storeId']),
            "subcategoryTitle": row['subcategoryTitle'],
            "logo": row['subcatLogo'],
            "mediaContent": row['subcatMediaContent'],
            "productItems": []
        }
        category['SubcategoryTitle'].append(subcategory)

    # Add product item to subcategory
    item_data = {
        "categoryId": str(row['storeId']),  # Assuming the storeId serves as the categoryId
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
