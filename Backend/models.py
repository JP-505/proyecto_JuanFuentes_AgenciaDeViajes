from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import Optional


class PaqueteTuristico(BaseModel):
    model_config = ConfigDict(extra="forbid")

    destino: str = Field(..., min_length=1, max_length=120, example="Cancún, México")
    duracion_dias: int = Field(..., gt=0, example=5)
    precio_persona: float = Field(..., gt=0, example=1200.50)
    cupo_disponible: int = Field(..., ge=0, example=20)

    @field_validator("destino")
    @classmethod
    def validar_destino(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("El destino no puede estar vacío.")
        return value


class PaqueteUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    destino: Optional[str] = Field(default=None, min_length=1, max_length=120)
    duracion_dias: Optional[int] = Field(default=None, gt=0)
    precio_persona: Optional[float] = Field(default=None, gt=0)
    cupo_disponible: Optional[int] = Field(default=None, ge=0)

    @field_validator("destino")
    @classmethod
    def validar_destino(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        value = value.strip()
        if not value:
            raise ValueError("El destino no puede estar vacío.")
        return value