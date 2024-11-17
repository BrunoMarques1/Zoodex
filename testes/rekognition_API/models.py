from sqlalchemy import Column, String, Integer
from pydantic import BaseModel
from database import Base

class Body(BaseModel):
    id: int
    nome_eng: str
    nome: str
    descricao: str

class Animais(Base):
    __tablename__ = "animais"
    
    id = Column(Integer, primary_key=True, nullable=False)
    nome_eng = Column(String, nullable=False)
    nome = Column(String, nullable=False)
    descricao = Column(String, nullable=False)

    def __repr__(self):
        return f"Animal [nome={self.nome}, descricao={self.descricao}]"
