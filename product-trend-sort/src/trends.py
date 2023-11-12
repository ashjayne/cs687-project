import pandas as pd
import matplotlib.pyplot as plt
from pytrends.request import TrendReq

requests_args = {
    'headers': {
        'User-Agent': 'Chrome/108.0.0.0 Safari/537.36'
    }
}

pytrends = TrendReq(hl='en-US')
#kw_list = ["Super Mario", "Luigi", "Bowser", "Princess Peach"]
kw_list = ["Super Mario", "Metroid", "Zelda", "Pikmin"]
pytrends.build_payload(kw_list, cat=0, timeframe='2023-01-01 2023-11-11', geo='US', gprop='')
df = pytrends.interest_over_time()

# Remove the "isPartial" column
df = df.drop(columns=["isPartial"])

# Calculate the percentage change for each keyword manually, handling division by zero
df_pct_change = (df - df.shift(1)) / (df.shift(1) + 0.001) * 100

# Replace any resulting NaN values with 0
df_pct_change = df_pct_change.fillna(0)

# Plot the percentage change in interest over time
plt.figure(figsize=(12, 6))
df_pct_change.plot(title='Percentage Change in Interest Over Time')
plt.xlabel('Date')
plt.ylabel('Percentage Change')
plt.grid(True)
plt.show()

# Print the first few rows of the percentage change DataFrame
print(df_pct_change.head(10))