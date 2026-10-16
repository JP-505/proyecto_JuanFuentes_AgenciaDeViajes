from fastapi import APIRouter, HTTPException, status
from models import PaqueteTuristico, PaqueteUpdate
from database import paquetes_collection
from bson import ObjectId
from pymongo import ReturnDocument

router = APIRouter(prefix="/api/paquetes", tags=["Paquetes Turísticos"])


def _parse_object_id(paquete_id: str) -> ObjectId:
    if not ObjectId.is_valid(paquete_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El identificador del paquete no es válido.",
        )
    return ObjectId(paquete_id)


def _serializar_paquete(paquete: dict) -> dict:
    return {
        "id": str(paquete["_id"]),
        **{key: value for key, value in paquete.items() if key != "_id"},
        "confirmado": paquete.get("confirmado", False),
    }


@router.get("/")
async def listar_paquetes():
    paquetes = await paquetes_collection.find().sort("destino", 1).to_list(length=None)
    return [_serializar_paquete(paquete) for paquete in paquetes]


@router.get("/{paquete_id}")
async def obtener_paquete(paquete_id: str):
    object_id = _parse_object_id(paquete_id)
    paquete = await paquetes_collection.find_one({"_id": object_id})
    if paquete is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró el paquete turístico.",
        )
    return _serializar_paquete(paquete)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def crear_paquete(paquete: PaqueteTuristico):
    datos = paquete.model_dump()
    resultado = await paquetes_collection.insert_one(datos)
    return _serializar_paquete({"_id": resultado.inserted_id, **datos})


@router.put("/{paquete_id}")
async def actualizar_paquete(paquete_id: str, paquete: PaqueteUpdate):
    object_id = _parse_object_id(paquete_id)
    cambios = paquete.model_dump(exclude_unset=True)
    if not cambios:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Debe enviar al menos un campo para actualizar.",
        )
    if any(value is None for value in cambios.values()):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Los campos del paquete no pueden ser nulos.",
        )

    paquete_actualizado = await paquetes_collection.find_one_and_update(
        {"_id": object_id},
        {"$set": cambios},
        return_document=ReturnDocument.AFTER,
    )
    if paquete_actualizado is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró el paquete turístico.",
        )
    return _serializar_paquete(paquete_actualizado)


@router.delete("/{paquete_id}")
async def eliminar_paquete(paquete_id: str):
    object_id = _parse_object_id(paquete_id)
    paquete_eliminado = await paquetes_collection.find_one_and_delete(
        {"_id": object_id}
    )
    if paquete_eliminado is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró el paquete turístico.",
        )
    return {"mensaje": "Paquete turístico eliminado correctamente."}
