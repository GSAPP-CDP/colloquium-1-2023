from bs4 import BeautifulSoup
import csv

# Read the HTML file
with open('data/raw/2023 Grantees _ Grantees & Awardees — Brooklyn Arts Council.html', 'r') as file:
    html = file.read()

# Parse the HTML
soup = BeautifulSoup(html, 'html.parser')

# Find all grantee elements
grantees = soup.find_all('a', class_='grantee')

# Extract information for each grantee
data = []
for grantee in grantees:
    grantee_name = grantee.find('div', class_='title').text.strip()
    discipline_element = grantee.find('span', class_='discipline')
    discipline = discipline_element.text.strip() if discipline_element else ''
    
    location_element = grantee.find('div', class_='neighborhood')
    if location_element:
        location_label = location_element.find('span', class_='label')
        location = location_element.text.replace(location_label.text.strip(), '').strip() if location_label else location_element.text.strip()
    else:
        location = ''
    
    data.append([grantee_name, discipline, location])

# Write the data to a CSV file
with open('data/2023_grantees.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Grantee Name', 'Discipline', 'Location'])
    writer.writerows(data)
