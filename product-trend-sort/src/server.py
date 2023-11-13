from flask import Flask, jsonify
from flask_cors import CORS
from pytrends.request import TrendReq

requests_args = {
    'headers': {
        'User-Agent': 'Chrome/108.0.0.0 Safari/537.36'
    }
}

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/get_trend_data', methods=['GET'])
def get_trend_data():
    pytrends = TrendReq(hl='en-US')
    kw_list = ["Super Mario", "Pikmin", "Splatoon", "The Legend of Zelda"] # create list of keywords
    pytrends.build_payload(kw_list, cat=0, timeframe='2023-11-01 2023-11-13', geo='US', gprop='') # can change timeframe as needed

    df = pytrends.interest_over_time()
    df = df.drop(columns=["isPartial"]) # drops isPartial column
    df_pct_change = (df - df.shift(1)) / (df.shift(1) + 0.001) * 100 # calculates % change, handle % by 0
    df_pct_change = df_pct_change.fillna(0) # fills in NA with 0
    trend_data = {keyword: df_pct_change[keyword].iloc[-1] for keyword in kw_list} # creates dictionary from kw_list

    return jsonify(trend_data) # returns values as a JSON file that the React app can read

if __name__ == '__main__':
    app.run()