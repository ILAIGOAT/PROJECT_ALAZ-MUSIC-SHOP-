function AddProduct(){
    const productname = document.getElementById("productname").value;
    const productdescription = document.getElementById("productscript").value;
    const productcolor = document.getElementById("productcolor").value;
    const productprice = document.getElementById("productprice").value;
    const instrumenttype = document.getElementById("Instruments-Select").value;
    const productimg = document.getElementById("productimg").value;
    if(!(IsColorValid(productcolor)))
        return alert('Color Is Not a valid Hex Color!');
    if(!(IsNumberValid(productprice)))
        return alert('Price Isnt Valid Price!');
    if(instrumenttype === "")
        return alert('Choose Instrument Type pls!');
    if(!(IsImageValid(productimg)))
        return;

    fetch('http://localhost:88/item/addproduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productname,
            script: productdescription,
            color: productcolor,
            price: productprice,
            instrumenttype,
            img: productimg
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.error) {
            alert(res.error);
            console.log("adding error:", res.error);
        } if(res.message) {
            alert('Product added successfully');
            console.log("product added successful:", res.message);
            window.location.href = "/HomePage/index.html";
        }
    });


}
function IsColorValid(color)
{
    return /^#[0-9A-F]{6}$/i.test(color);
}
function IsNumberValid(number)
{
    return number > 0;
}
function IsImageValid(image)
{

    const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const regex = /(?:\.([^.]+))?$/;
    const match = regex.exec(image);
    const urlExtension = match && match[1] ? match[1].toLowerCase() : '';

    if (!(image.startsWith('data:image/')) && !(validImageExtensions.includes(urlExtension))) {
        // If it's a data URL, consider it valid
        console.log('The URL is a valid image data URL. Continuing with additional code...');
        alert('Enter Valid Image URL!');
        return false;
    }

    
    return true;
}