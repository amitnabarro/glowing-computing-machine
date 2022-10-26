from fastapi import APIRouter, Body
from pydantic import BaseModel
from models import NewsArticle

PAGE_SIZE = 1

class MetaData(BaseModel):
  total: int
  limit: int
  offset: int

class ListResponse(BaseModel):
  meta: MetaData
  objects: list[NewsArticle]


router = APIRouter()


@router.get("/articles", response_model=ListResponse)
async def get_articles(limit: int=PAGE_SIZE, offset: int=0):
  articles = await NewsArticle.all().to_list()
  return {
    "meta": {
        "total": len(articles),
        "limit": limit,
        "offset": offset
    },
    "objects": articles[offset:limit+offset]
  }
