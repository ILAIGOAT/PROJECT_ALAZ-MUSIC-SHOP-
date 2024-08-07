function aproveimage() {
    var url = document.getElementById("imageUrl").value;

    if (url.startsWith('data:image/')) {
        
        console.log('The URL is a valid image data URL. Continuing with additional code...');
        cropImage(url, ChangeUserimg);
        return;
    }

    const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const regex = /(?:\.([^.]+))?$/;
    const match = regex.exec(url);
    const urlExtension = match && match[1] ? match[1].toLowerCase() : '';

    if (validImageExtensions.includes(urlExtension)) {
        cropImage(url, ChangeUserimg);
        return;
    }

    const img = new Image();
    img.onload = () => {
        
        console.log('The URL is a valid image. Continuing with additional code...');
        cropImage(url, ChangeUserimg);
    };
    img.onerror = () => alert('The URL is not a valid image.');
    img.src = url;
}

function cropImage(url, callback) {
    const img = new Image();
    
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;

        canvas.width = size;
        canvas.height = size;

        ctx.drawImage(img, x, y, size, size, 0, 0, size, size);

        try {
            const croppedImageUrl = canvas.toDataURL();
            if (typeof callback === 'function') {
                callback(croppedImageUrl);
            }
        } catch (e) {
            
            console.error('Canvas is tainted and cannot be cropped:', e);
            if (typeof callback === 'function') {
                callback(url); 
            }
        }
    };

    img.onerror = function() {
        console.error('Error loading image.');
        if (typeof callback === 'function') {
            callback(url); 
        }
    };

    img.src = url;
}



function ChangeUserimg(pfp)
{

    
    var email = sessionStorage.getItem('ConnectedEmail');

    console.log("Sending pfp Change request");
    
    fetch('http://localhost:88/user/changepfp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            pfp
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            alert(res.error);
            console.log("Change error:", res.error);
        } if(res.message) {
            alert('Change successful');
            console.log("Change successful:", res.message);
            sessionStorage.setItem('ConnectedUserimg',pfp);
            window.location.href = "/HomePage/index.html";
        }
    });
}