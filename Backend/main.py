from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.entidades import router as entidades_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(entidades_router)

@app.get("/")
def read_root():
    return {"message": "API de Agencia de Viajes funcionando con éxito"}