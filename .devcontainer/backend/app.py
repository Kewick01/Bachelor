from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello"

if __name__=='main':
    app.run(debug=True, host="0.0.0.0")
