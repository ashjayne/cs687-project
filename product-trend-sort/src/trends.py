from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-US', tz=360)

# Get trending searches
trending_searches = pytrends.trending_searches(pn='united_states') 

print("Trending Searches in the United States:")
for search in trending_searches:
    print(search)
