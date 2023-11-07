import pandas as pd
import matplotlib.pyplot as plt
from pytrends.request import TrendReq

requests_args = {
    'headers': {
        'User-Agent': 'Chrome/108.0.0.0 Safari/537.36'
    }
}

pytrends = TrendReq(hl='en-US')
kw_list = ["Super Mario", "Luigi", "Bowser", "Princess Peach"]
pytrends.build_payload(kw_list, cat=0, timeframe='2022-01-01 2023-11-06', geo='US', gprop='')
df = pytrends.interest_over_time()
print (df.head(10))