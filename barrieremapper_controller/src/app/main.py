# Description: This file contains the main code for the controller API. It is responsible for receiving requests from the user and sending them to the broker. It also receives responses from the broker and sends them back to the user. 
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder

import app.api.pydantic_models as pydantic_models
import app.api.broker_functions as broker_functions

# get env vars
broker_url = os.environ.get("SCORPIO_URL")


# setup app
app: FastAPI = FastAPI(title = "Controller", openapi_tags = [], root_path = "/controller_api")


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# add CORS middleware
app.add_middleware(CORSMiddleware, allow_origins = ["*"], allow_credentials = True, allow_methods = ["*"], allow_headers = ["*"])

# post entity
@app.post("/entity")
def post_entity(barrier: pydantic_models.Barrier_Post):
    # get json with jsonable_encoder
    data = jsonable_encoder(barrier)
    # transform to ngsi-ld
    ngsi_entity = broker_functions.json_to_ngsild(data)
    # post entity to broker 
    response = broker_functions.post_entity(broker_url, ngsi_entity)   
    print(response.status_code)
    print(response.text)
    return response.status_code

# get entities
@app.get("/entities")
def get_entities(entity_type: str, key_value: str):
    # get entities from broker
    response = broker_functions.get_entities(broker_url, entity_type, key_value)
    return response.json()


# testing
@app.get("/ping")
def pong():    
    return {"ping": "pong!"}