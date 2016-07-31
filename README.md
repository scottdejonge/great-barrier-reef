# Explore the Great Barrier Reef

## About Explore the Great Barrier Reef

The Great Barrier Reef is the largest living ecosystem on Earth comprised of 2,900 unique reefs and 600 continental islands with more than 1,500 species of fish – 10% of the world’s fish species. Explore the Great Barrier Reef is an interactive education tool to better understand the scale and diversity of this natural wonder.

### Explore the Reef

Learn the scale of the Great Barrier Reef by navigating through the 2,300km-long ecosystem, thousands of reefs, and hundreds of islands.

### Dive In

Get up close to the reef structures that make up the Great Barrier Reef through virtual dives, keep an eye out for unique coral structures and sea life up close.

### Reefs

Discover the 2,900 unique individual reef structures spread across the Great Barrier Reef that together make up the Great Barrier Reef.

### Islands

The Great Barrier Reef includes over 600 continental islands, see the difference in size, location, and geology between them.

### Marine Park Zoning

See how the Great Barrier Reef is being preserved by marine park zoning, protecting waters along the Great Barrier Reef coast.

## Data Story

Explore the Great Barrier Reef uses geolocation datasets from the Queensland Government, mainly displaying KML onto Google Maps. During the process of getting the KML to display correctly it was clear that the size of the KML data would pose a problem.

To overcome issues with KML display and rendering, data was stripped of excess CDATA tags and empty XML markup, then the KML files were parsed into Google's Fusion Tables for map visualisation checks removing excess tabular data not required for the display on the map.

After cleaning the XML of any unnecessary markup, the KML was exported from Fusion Tables, reducing file size by top to 20%.

Larger KML datasets such as Island data was chunked into smaller KML files selecting fragments of Island data by alphabetical chunks (e.g. A-L, L-Q, Q-Z).

The purpose of displaying the KML data into a Google Maps interface is to inform the public to location of significance within the reef, including larger reef structures, main islands, and marine park zone boundaries. This highlights the scale and diversity of reef and islands as well as illustrates the main shipping travel routes through the reef into main ports such as Townsville.

## Data Sources

### [Great Barrier Reef coast marine park zoning](https://data.qld.gov.au/dataset/great-barrier-reef-coast-marine-park-zoning)

Zonings within Queensland State Marine Park - Great Barrier Reef Coast Marine Park.

### [Geographic features - Queensland series](https://data.qld.gov.au/dataset/geographic-features-queensland-series)

This is a series of datasets covering the State of Queensland displaying geographic features. Features are attributed with source information and names where available. Datasets include: - Bays including Bays, Coves, Gulfs etc., Large Area Features including Deserts, Peninsulas etc., Mountain Ranges, Beaches, Sea Passages, Mountain Peaks, Capes including Capes, Points, Head, Mainland, Marine Islands, Reefs and Shoals, Island Groups, Highest Astronomical Tide

### [Marine islands - Queensland](https://data.qld.gov.au/dataset/marine-islands-queensland)

This dataset displays the marine islands of Queensland. Marine islands are those islands beyond the Queensland mainland and their boundary coincides with the Coastline and State Border - Queensland dataset.Attributes within the Coastline and State Border - Queensland dataset describe the source used in compiling that dataset. Island names have been sourced from numerous locations and attributes within the data describe the source of the names and includes names obtained from:- Queensland Place Names Database- Queensland Government publications- Geoscience Australia 1:100000 Topographic Mapping- Geoscience Australia 1:250000 Topographic Mapping

## Acknowledgements

### Underwater Images

[XL Catlin Seaview Survey](http://catlinseaviewsurvey.com/) through [Google Maps](https://www.google.com.au/maps/)

### Music

[Deliberate Thought by Kevin MacLeod](http://incompetech.com/music/royalty-free/?keywords=deliberate+thought) Attribution 4.0 International [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

### Icons

[Mohamad Sabbagh](https://thenounproject.com/Jetro/) Creative Commons from the [Noun Project](https://thenounproject.com/Msabbagh/collection/the-sea/?oq=reef&cidx=0&i=97733)

### Images

#### Underwater photo

[Kyle Taylor](https://www.flickr.com/photos/kyletaylor/) Attribution 2.0 Generic [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) 

#### Aerial photo

[FarbenfroheWunderwelt](https://www.flickr.com/photos/farbenfrohewunderwelt/) Attribution-NoDerivs 2.0 Generic [CC BY-ND 2.0](https://creativecommons.org/licenses/by-nd/2.0/) 

## Technology

* GitHub
  * Github Pages
* Jekyll
* Markdown
* Google Maps
* KML
* HTML
* Javascript
  * JQuery
* CSS
  * PostCSS
* Webpack

## Creators

### Scott de Jonge

* Twitter: [@scottdejonge](https://twitter.com/scottdejonge)
* Github: [@scottdejonge](https://github.com/scottdejonge)