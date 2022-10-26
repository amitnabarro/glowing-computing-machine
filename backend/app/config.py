from typing import Optional
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseSettings
from models import NewsArticle


class Settings(BaseSettings):
  DATABASE_URL: Optional[str] = 'mongodb://localhost:27017/news'

  class Config:
    env_file = ".env"
    orm_mode = True


async def init_db():
  client = AsyncIOMotorClient(Settings().DATABASE_URL)
  await init_beanie(database=client.get_default_database(), document_models=[NewsArticle])
