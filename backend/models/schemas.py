from pydantic import BaseModel

class Device(BaseModel):
    hostname: str
    interfaces: list
    routing_protocols: list