function roundToNearest16(value) {
    return Math.round(value / 16) * 16;
}

document.getElementById('width').addEventListener('input', function () {
    const roundedValue = roundToNearest16(this.value);
    document.getElementById('width-value').textContent = roundedValue;
});

document.getElementById('height').addEventListener('input', function () {
    const roundedValue = roundToNearest16(this.value);
    document.getElementById('height-value').textContent = roundedValue;
});

document.getElementById('generate-btn').addEventListener('click', function () {
    const generateBtn = document.getElementById('generate-btn');
    const prompt = document.getElementById('prompt').value;
    const width = roundToNearest16(document.getElementById('width').value);
    const height = roundToNearest16(document.getElementById('height').value);
    const negativePrompt = document.getElementById('negative-prompt').value;

    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
            width: width,
            height: height,
            negative_prompt: negativePrompt
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('generated-image').src = data.image_url;
            document.getElementById('image-url').value = data.image_url;
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    })
    .finally(() => {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Image';
    });
});