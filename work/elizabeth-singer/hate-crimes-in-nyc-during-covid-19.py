# Import libraries
import pandas as pd
import geopandas as gpd
import folium

# CSV URL
csv_url = "https://data.cityofnewyork.us/api/views/bqiq-cu78/rows.csv?accessType=DOWNLOAD"

# GeoJSON URL
geojson_url = "https://data.cityofnewyork.us/api/geospatial/78dh-3ptz?method=export&format=GeoJSON"

# Load the CSV data
complaints_data = pd.read_csv(csv_url)

# Group the data by precinct and count complaints
complaints_per_precinct = complaints_data.groupby('Complaint Precinct Code')['Full Complaint ID'].count().reset_index()

# Load the GeoJSON data
precincts_geo = gpd.read_file(geojson_url)

# Convert the 'precinct' column to int64
precincts_geo['precinct'] = precincts_geo['precinct'].astype('int64')

# Merge the GeoDataFrame with the complaints data
merged_data = precincts_geo.merge(complaints_per_precinct, left_on="precinct", right_on="Complaint Precinct Code", how="left")

# Create a Folium map
nyc_map = folium.Map(location=[40.7128, -74.0060], zoom_start=10)  # NYC coordinates

# Add a choropleth layer to the map
folium.Choropleth(
    geo_data=merged_data,
    data=complaints_per_precinct,
    columns=['Complaint Precinct Code', 'Full Complaint ID'],
    key_on='feature.properties.precinct',
    fill_color='YlOrRd',
    fill_opacity=0.7,
    line_opacity=0.2,
    legend_name='Complaints per Precinct'
).add_to(nyc_map)

# Save the map to an HTML file
nyc_map.save('nyc_complaints.html')
