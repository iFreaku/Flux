
document.getElementById('width').addEventListener('input', function () {
    document.getElementById('width-value').textContent = this.value;
});

document.getElementById('height').addEventListener('input', function () {
    document.getElementById('height-value').textContent = this.value;
});

document.getElementById('copy-url-btn').addEventListener('click', function () {
    const urlInput = document.getElementById('image-url');
    urlInput.select();
    document.execCommand('copy');
    alert('URL copied to clipboard!');
});

document.getElementById('download-btn').addEventListener('click', function () {
    const imageUrl = document.getElementById('image-url').value;
    if (imageUrl) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'generated-image.png';
        link.click();
    } else {
        alert('No image URL available to download.');
    }
});

document.getElementById('generate-btn').addEventListener('click', function () {
    const prompt = document.getElementById('prompt').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const negativePrompt = document.getElementById('negative-prompt').value;

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
    });
});