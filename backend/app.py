from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # This will allow all routes & methods


# Initialize DB
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL
    )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route("/api/todos", methods=["GET"])
def get_todos():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, task FROM todos")
    rows = cursor.fetchall()
    todos = [{"id": row[0], "task": row[1]} for row in rows]
    conn.close()
    return jsonify(todos)


@app.route("/api/todos", methods=["POST"])
def add_todo():
    data = request.get_json()
    task = data.get("task")
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO todos (task) VALUES (?)", (task,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo added successfully"}), 201

@app.route("/api/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM todos WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo deleted"})



@app.route("/api/todos/<int:id>", methods=["PUT"])
def update_todo(id):
    data = request.get_json()
    task = data.get("task")
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("UPDATE todos SET task=? WHERE id=?", (task, id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo updated"})


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

