from aiohttp import ClientSession
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import init_db
from routes import router
from tasks import fetch_articles

app = FastAPI(title='Drone News API')

app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.on_event("startup")
async def startup_event():
  await init_db()
  app.aiohttp_session = ClientSession()
  await fetch_articles(app.aiohttp_session)

@app.on_event("shutdown")
async def shutdown_event():
  await app.aiohttp_session.close()

app.include_router(router, prefix="/api")

@app.get("/", tags=["Home"])
async def home():
    return {"message": "Welcome to  the home page of the Drone News API"}
