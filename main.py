import os
from flask import Flask, template
app = Flask(__name__)


fkey = os.environ.get('fxkey')

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/about')
def about():
    return "This is the about page."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)