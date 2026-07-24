from fastapi import FastAPI
from api.routes import router

app = FastAPI(
    title="NetSage AI",
    version="1.0.0"
)

app.include_router(router)

@app.get("/")
def home():
    return {"message": "NetSage AI Backend Running"}