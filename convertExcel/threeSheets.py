import pandas as pd

# Load the data from Excel
xls = pd.ExcelFile('path_to_your_excel_file.xlsx')

df_categories = pd.read_excel(xls, 'Category')
df_subcategories = pd.read_excel(xls, 'SubCategories')
df_product_items = pd.read_excel(xls, 'Product Items')

result = []

# Iterate over categories
for _, cat_row in df_categories.iterrows():
    category_data = {
        "storeId": str(cat_row["storeId"]),
        "CategoryTitle": cat_row["CategoryTitle"],
        "logo": cat_row["logo"],
        "mediaContent": cat_row["mediaContent"],
        "SubcategoryTitle": []
    }
    
    # Find related subcategories
    related_subcategories = df_subcategories[df_subcategories["storeId"] == cat_row["storeId"]]
    
    for _, subcat_row in related_subcategories.iterrows():
        subcategory_data = {
            "storeId": str(subcat_row["storeId"]),
            "subcategoryTitle": subcat_row["subcategoryTitle"],
            "logo": subcat_row["logo"],
            "mediaContent": subcat_row["mediaContent"],
            "productItems": []
        }
        
        # Find related product items
        related_product_items = df_product_items[df_product_items["subCategoryId"] == subcat_row["subCategoryId"]]
        
        for _, item_row in related_product_items.iterrows():
            item_data = {
                "categoryId": str(item_row["subCategoryId"]),  # Assuming this is the intended mapping
                "subCategoryId": str(item_row["subCategoryId"]),
                "ItemTitle": item_row["ItemTitle"],
                "description": item_row["description"],
                "ItemPrice": item_row["ItemPrice"],
                "local_image_path": item_row["local_image_path"]
            }
            subcategory_data["productItems"].append(item_data)
        
        category_data["SubcategoryTitle"].append(subcategory_data)
    
    result.append(category_data)

# Convert to JSON
with open('output.json', 'w') as outfile:
    json.dump(result, outfile, indent=4)
