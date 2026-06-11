from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_path = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))