(function showImages() {
    const imagesContainer = document.getElementById('imagesContainer');
    const quantityContainer = document.getElementById('quantity');
    let imageInLocalStorage = JSON.parse(localStorage.getItem("images"));
    if (imageInLocalStorage) {
        for (let i = 0; i < imageInLocalStorage.length; i += 1) {
            let img = new Image();
            let div = document.createElement('div');
            img.setAttribute('src', imageInLocalStorage[i]);
            div.appendChild(img);
            imagesContainer.appendChild(div);
        }
        if(imageInLocalStorage.length > 1) {
            quantityContainer.innerHTML = `(${imageInLocalStorage.length} items)`;
        } else {
            quantityContainer.innerHTML = `(${imageInLocalStorage.length} item)`;
        }
    }
}());

function getFiles(e) {
    e.preventDefault();
    const image = document.getElementById('image').files[0];
    new FileUpload(image);
}

function FileUpload(file) {
    const reader = new FileReader();
    const progressBar = document.getElementById('progressBar');

    if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
    }

    reader.onprogress = (event) => {
        if (event.lengthComputable) {
            let percentage = Math.round((event.loaded * 100) / event.total);
            progressBar.style.width = `${percentage}%`;
        }
    };

    reader.onloadend = (e) => {
        let imagesQuantity = 0;
        const quantityContainer = document.getElementById('quantity');
        if (!localStorage.getItem("images")) {
            let images = [];
            images.push(reader.result);
            localStorage.setItem("images", JSON.stringify(images));
            imagesQuantity = 1;
        } else {
            let imageInLocalStorage = JSON.parse(localStorage.getItem("images"));

            imageInLocalStorage.push(reader.result);
            imagesQuantity = imageInLocalStorage.length;
            localStorage.setItem("images", JSON.stringify(imageInLocalStorage));
        }

        let imagesContainer = document.getElementById('imagesContainer');
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute('src', reader.result);
        div.appendChild(img);
        imagesContainer.appendChild(div);
        if(imagesQuantity > 1) {
            quantityContainer.innerHTML = `(${imagesQuantity} items)`;
        } else {
            quantityContainer.innerHTML = `(${imagesQuantity} item)`;
        }
        // progressBar.style.width = `0%`;
    }

}

const uploadBtn = document.getElementById("uploadButton");
uploadBtn.addEventListener('click', getFiles);


