import asyncio
import subprocess
import json
import re
from pymongo import MongoClient
from telegram import Bot
# from datetime import datetime
from datetime import datetime, timedelta

# Function definitions
def find_json_objects(text):
    stack = []
    result = []
    start = None
    for i, char in enumerate(text):
        if char == '{':
            if not stack:
                start = i
            stack.append('{')
        elif char == '}':
            stack.pop()
            if not stack:
                result.append(text[start:i + 1])
    return result

async def parse_to_array(input_string):
    resssss = find_json_objects(input_string)
    print(resssss)
    array = []
    for match in resssss:
        json_string = json.loads(match)
        print(json_string['user']['username'])
        obj = {}
        obj['text'] = json_string['rawContent']
        obj['url'] = json_string['url']
       
        time_string = json_string['date']

        # Convert the string to a datetime object
        time_obj = datetime.fromisoformat(time_string)

# Format the datetime object to exclude seconds
        new_time = time_obj + timedelta(hours=2)
        time_without_seconds = time_obj.strftime("%Y-%m-%d %H:%M")
        # Add 2 hours
        obj['date'] = time_without_seconds
        obj['username'] = json_string['user']['username']
        obj['str_id'] = json_string['id_str']
        print(json_string['date'])
        print( json_string['rawContent'])
        TOKEN = '8148402983:AAE0IyQEs_wqoSm8dHWQoRjqgMPSMh_ym-M'
        chat_id = '6217923679'
        zahraaToken ='7882990980:AAEXRcLn_W60kxb4TMhcnKvlEx_dSsjEazs'
        zahraaId ='914417115'
        client = MongoClient("mongodb://localhost:27017")
        db = client["twitter_data"]
        collection = db["tweets"]
        getRes = collection.find_one({'str_id': json_string['id_str']})
        if not getRes:
            collection.insert_one(obj)
            bot = Bot(token=TOKEN)
            zahraaBot= Bot(token=zahraaToken)
            message = f"""
                          
                          🟥 <b>{obj['username']}</b> 🟥

                          
{obj['text']}

<b>{obj['date']}</b>

<b>{obj['url']}</b>

 

            """
            await bot.send_message(chat_id=chat_id, text=message, parse_mode="HTML")
            await bot.send_message(chat_id=zahraaId, text=message, parse_mode="HTML")

        else :
            print(json_string['id_str'])
    return array
async def run_twscrape(command: str, args: list):
    try:
        bash_command = ["twscrape", command] + args
        result = subprocess.run(
            bash_command,
            text=True,
            capture_output=True,
            check=True
        )
        data = result.stdout
        await parse_to_array(data)
    except subprocess.CalledProcessError:
        print("Error executing twscrape.")
    except FileNotFoundError:
        print("twscrape is not installed or not in the PATH.")

async def main_loop():
    while True:
        # await run_twscrape("user_tweets_and_replies", ["1130891570", "--limit", "10"])
        # await run_twscrape("user_tweets_and_replies", ["295123952", "--limit", "10"])
        # await run_twscrape("user_tweets_and_replies", ["1508848274303819788", "--limit", "10"])
        # await run_twscrape("user_tweets_and_replies", ["23573083", "--limit", "10"])
        
        await run_twscrape("user_tweets_and_replies", ["4795483642", "--limit", "10"])
        await asyncio.sleep(240)  # Wait for 2 minutes

# Entry point
if __name__ == "__main__":
    asyncio.run(main_loop())
