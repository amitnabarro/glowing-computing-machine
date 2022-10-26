import aiohttp
from models import NewsArticle

NEWS_API_URL = "https://newsapi.org/v2/everything"



async def fetch_articles(session):
  # fetch articles from the news api
  params = {
    "q": "miles davis",
    "from": "2022-10-25",
    "sortBy": "popularity",
    "language": "en",
    "pageSize": 100,
    "apiKey": "3d9ef7cce8a54740a02cb625e6e130f2"
  }
  async with session.get(NEWS_API_URL, params=params) as response:
    if(response.status == 200):
      data = await response.json()
      models = []
      for article in data["articles"]:
        try:
          model = NewsArticle(**article)
          await model.insert()
        except Exception as e:
          print('pass thing one', article.get('title'), e)
      # await NewsArticle.insert_many(models)
    else:
      print("Error fetching articles", response.text)


