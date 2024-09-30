from sqlalchemy import Column, String, Integer
from pydantic import BaseModel
from database import Base

class Body(BaseModel):
    nome: str
    descricao: str

class Animais(Base):
    __tablename__ = "animais"
    
    nome = Column(String, primary_key=True)
    descricao = Column(String, nullable=False)

    def __repr__(self):
        return f"Animal [nome={self.nome}, descricao={self.descricao}]"
