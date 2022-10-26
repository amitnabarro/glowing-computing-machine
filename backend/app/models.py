
from typing import Optional
from datetime import date
from beanie import Document
from pydantic import BaseModel, HttpUrl

class Source(BaseModel):
  id: Optional[str] = None
  name: str

class NewsArticle(Document):
    source: Optional[Source] = None
    author: Optional[str] = None
    title: str
    description: str
    url: HttpUrl
    urlToImage: HttpUrl
    publishedAt: str
    content: str
