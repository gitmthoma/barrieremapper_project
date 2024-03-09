import uuid
import datetime
import requests
import json

# transform json entity to ngsi-ld entity 
def json_to_ngsild(json_entity):
    ngsild_entity = {
        "id": "urn:ngsi-ld:Barrier" + ":" + str(uuid.uuid4()),
        "type": "Barrier",
        "dateCreated": {
            "type": 'Property',
            "value": datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
        },
        "username": {
            "type": 'Property',
            "value": json_entity["username"],
        },
        "labeling": {
            "type": 'Property',
            "value": json_entity["labeling"]
        },
        "description": {
            "type": 'Property',
            "value": json_entity["description"]
        }, 
        "isTemporary": {
            "type": 'Property',
            "value": json_entity["isTemporary"]
        },
        "location": {
            "type": 'GeoProperty',
            "value": {
                "type": 'Point',
                "coordinates": [json_entity["lat"], json_entity["lng"]]
                }
        },
        "@context": []
        }    
    return ngsild_entity


def post_entity(broker_url, ngsild_entity):
    # post to broker at /ngsi-ld/v1/entities
    url = broker_url + "/ngsi-ld/v1/entities"
    headers = {"Content-Type": "application/ld+json"}
    response = requests.post(url , 
                             data = json.dumps(ngsild_entity), 
                             headers = headers)  
    return response

def get_entities(broker_url, entity_type, key_value):
    # set params for broker request
    if key_value=="yes":
        params = {"options": "keyValues",
                  "type": entity_type}
    else:
        params = {"type": entity_type}
    # get from broker at /ngsi-ld/v1/entities
    url = broker_url + "/ngsi-ld/v1/entities"
    headers = {"Content-Type": "application/ld+json"}
    response = requests.get(url , 
                             headers = headers,
                             params = params)  
    return response