import os
import json

from models.base_model import BaseModel

objects = {"BaseModel": BaseModel}

class FileStorage:
    __file_path = os.path.relpath("file.json")
    __objects = {}

    def all(self):
        return FileStorage.__objects
    
    def new(self, obj):
        if obj:
            obj_cls_name = obj.__class__.__name__
            obj_id = obj.id
            FileStorage.__objects[f"{obj_cls_name}.{obj_id}"] = obj

    def save(self):
        serializable = {}
        for key, value in FileStorage.__objects.items():
            serializable[key] = value.to_dict()

        with open(FileStorage.__file_path, 'w', encoding='utf-8') as f:
            json.dump(serializable, f, indent=4)

    def reload(self):
        if os.path.exists(FileStorage.__file_path):
            try:
                with open(FileStorage.__file_path, 'r', encoding="utf-8") as f:
                    a_dict = json.load(f)

                for key, value in a_dict.items():
                    FileStorage.__objects[key] = objects[value["__class__"]](**value)

            except(Exception):
                pass
