from uuid import uuid4
from datetime import datetime
from . import engine

class BaseModel:
    def __init__(self, *args, **kwargs) -> None:
        if kwargs:
            for key, value in kwargs.items():
                if key in ("created_at", "updated_at"):
                    value = datetime.fromisoformat(value)
                if key != "__class__":
                    setattr(self, key, value)
        else:
            self.id = str(uuid4())
            self.created_at = datetime.now()
            self.updated_at = datetime.now()
            engine.file_storage.FileStorage.new(self, self)

    def __str__(self) -> str:
        return ("[{}] ({}) {}").format(
            self.__class__.__name__,
            self.id,
            self.__dict__
        )

    def save(self):
        self.updated_at = datetime.now()
        engine.file_storage.FileStorage.save(self)

    def to_dict(self):
        a_dict = self.__dict__.copy()
        cls_name = self.__class__.__name__

        a_dict["__class__"] = cls_name
        a_dict["created_at"] = datetime.isoformat(a_dict.get("created_at"))
        a_dict["updated_at"] = datetime.isoformat(a_dict.get("updated_at"))

        return a_dict