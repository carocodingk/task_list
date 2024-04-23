from flask import Flask
from markupsafe import escape
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:3000"])


db_task = [{
   "id": 0,
   "description": "learn python"
}]
counter_id = 1 

def get_all_tasks():
   return db_task

def add_task(description):
   global counter_id
   db_task.append({"id": counter_id, "description": description})
   curr_id = counter_id
   counter_id +=1
   return curr_id

def update_task(task_id, description):
   found = False
   for item in db_task:
      if item["id"] == task_id:
         item["description"] = description
         found = True
   if found:
      return task_id
   else:
      return -120

def remove_task(task_id):
    found = False
    for item in db_task:
      if item["id"] == task_id:
         db_task.remove(item)
         found = True
    if found:
      return task_id
    else:
      return -123
	 

def whatever():
    return "<p>wackilandia chalinga</p>"

@app.route("/abc")
def hello_world():
    output = whatever()
    return output

@app.get('/tasks')
def tasks_get():
    output = get_all_tasks()
    return output

@app.post('/task')
def task_post():
    print(request.get_json())
    data = request.get_json()
    
    return { "id": add_task(data['description']) }

@app.put('/task')
def task_put():
    data = request.get_json()
    return { "id": update_task(data['id'], data['description']) }

@app.delete('/task')
def task_delete():
    data = request.get_json()
    return {"id":  remove_task(data['id'])}