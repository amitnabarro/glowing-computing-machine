import aiohttp
import datetime
from models import NewsArticle

NEWS_API_URL = "https://newsapi.org/v2/everything"



async def fetch_articles(q:str):
  # fetch articles from the news api
  params = {
    "q": q,
    "from": datetime.datetime.now().isoformat(),
    "sortBy": "popularity",
    "language": "en",
    "pageSize": 100,
    "apiKey": "63ee3d9002cb4113a7590f0330a62726"
  }
  async with aiohttp.ClientSession() as session:
    async with session.get(NEWS_API_URL, params=params) as response:
      if(response.status == 200):
        data = await response.json()
        models = []
        print('dude whatr is going on', data)
        for article in data["articles"]:
          try:
            model = NewsArticle(**article)
            await model.insert()
          except Exception as e:
            print('something is wrong')
        # we're not using insert_many to evaluate url uniqueness
        # await NewsArticle.insert_many(models)
      else:
        print("** - Error fetching articles", response.text)


