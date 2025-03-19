import os
from flask import Flask, render_template, request, jsonify
from together import Together 

app = Flask(__name__)
fkey = os.environ.get('fxkey')
client = Together(api_key=fkey)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['GET'])
def generate_image():
    data = request.json
    prompt = data.get('prompt')
    width = int(data.get('width'))
    height = int(data.get('height'))
    negative_prompt = data.get('negative_prompt')
    try:
        response = client.images.generate(
            prompt=prompt,
            model="black-forest-labs/FLUX.1-schnell-Free",
            steps=4,
            n=1,
            height=height,
            width=width,
            negative_prompt=negative_prompt
        )
        image_url = response.data[0].url
        return jsonify({'success': True, 'image_url': image_url})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)