
/* document.getElementById("button-number").addEventListener("click", ()=>{eel.get_random_number()}, false);
document.getElementById("button-date").addEventListener("click", ()=>{eel.get_date()}, false);
document.getElementById("button-ip").addEventListener("click", ()=>{eel.get_ip()}, false); */

resizeTo(1400, 880)
//document.getElementById('spinner-div').style.display = 'none'


current_img_name = '';
originalImg_Buffer = '';
currentImg_Buffer = '';

out_nombre = '';
out_ext = '';

document.getElementById('success-alert').style.visibility= 'hidden';

eel.expose(prompt_alerts);
function prompt_alerts(description) {
    alert(description);
}

async function pressed() {
    value = await eel.get_random_name()();
    console.log(value)
}

async function alertName() {
    eel.alertName(document.getElementById('my_input').value)
}


let imgElement = document.getElementById('imageSrc');
let imgOutElement = document.getElementById('imageDstn');
let inputElement = document.getElementById('fileInput');
inputElement.addEventListener('change', async (e) => {
    current_img_name = e.target.files[0].name;
    out_nombre = "out_"+current_img_name.split('.')[0];
    out_ext = "."+current_img_name.split('.')[1];
    update_outPlaceholder();
    update_outExt();
    imgElement.src = URL.createObjectURL(e.target.files[0]);
    imgOutElement.src = URL.createObjectURL(e.target.files[0]);

    var fReader = new FileReader();
    fReader.readAsDataURL(inputElement.files[0]);
    fReader.onloadend = async function(event){
        originalImg_Buffer = event.target.result;
        habilitar_guardado();
    }

}, false);

document.getElementById('range-inputs').style.display = 'none';
document.getElementById('grayscale_select').addEventListener('change',async ()=>{
    let v = document.getElementById('grayscale_select').value;
    if(v === 'range'){
        document.getElementById('range-inputs').style.display = 'block';
        await range_mapping_handler();
    }else if(v === 'gray'){
        document.getElementById('range-inputs').style.display = 'none';
        imgOutElement.src = "data:image/png;base64," + await eel.grayScale_simple(originalImg_Buffer)();
        //imgOutElement.src = currentImg_Buffer;
    }else if(v === 'equalize'){
        document.getElementById('range-inputs').style.display = 'none';
        imgOutElement.src = "data:image/png;base64," + await eel.grayScale_histEqualize(originalImg_Buffer)();
    }else if(v === '0'){
        document.getElementById('range-inputs').style.display = 'none';
        imgOutElement.src = originalImg_Buffer;
    }
})

document.getElementById('espacial_select').style.display = 'none';
document.getElementById('frecuencial_select').style.display = 'none';
document.getElementById('sharpen_select').addEventListener('change',()=>{
    let v = document.getElementById('sharpen_select').value;
    if(v === 'espacial'){
        document.getElementById('espacial_select').style.display = 'block';
        document.getElementById('frecuencial_select').style.display = 'none';
    }else if(v === 'frecuencial'){
        document.getElementById('espacial_select').style.display = 'none';
        document.getElementById('frecuencial_select').style.display = 'block';
    }else if(v === '0'){
        document.getElementById('espacial_select').style.display = 'none';
        document.getElementById('frecuencial_select').style.display = 'none';
    }
})

document.getElementById('espacial_select').addEventListener('change',async ()=>{
    let v = document.getElementById('espacial_select').value;
    if(v === '3'){
        imgOutElement.src = "data:image/png;base64," + await eel.sharpen_space_3x3(originalImg_Buffer)();
    }else if(v === '5'){
        imgOutElement.src = "data:image/png;base64," + await eel.sharpen_space_5x5(originalImg_Buffer)();
    }else if(v === '0'){
        imgOutElement.src = originalImg_Buffer;
    }
})

document.getElementById('frecuencial_select').addEventListener('change',async ()=>{
    let v = document.getElementById('frecuencial_select').value;
    if(v === 'highpass'){
        imgOutElement.src = "data:image/png;base64," + await eel.sharpen_freq_pasoAlto_histEq(originalImg_Buffer)();
    }else if(v === 'unsharp'){
        imgOutElement.src = "data:image/png;base64," + await eel.sharpen_freq_unsharpMasking(originalImg_Buffer)();
    }else if(v === '0'){
        imgOutElement.src = originalImg_Buffer;
    }
})


let range_mapping_handler = async()=>{
    let from = document.getElementById('fromInput').value;
    let to = document.getElementById('toInput').value;
    let new_value = document.getElementById('newValueInput').value;
    imgOutElement.src = "data:image/jpg;base64,"+ await eel.grayScale_rangeMapping(originalImg_Buffer,from,to,new_value)();
}

function update_outPlaceholder(){//gui
    document.getElementById('out_placeholder').setAttribute('placeholder', out_nombre);
}

function update_outExt(){//gui
    document.getElementById('out_ext').innerText = out_ext;
}


document.getElementById('fromSlider').addEventListener('change',range_mapping_handler);
document.getElementById('toSlider').addEventListener('change',range_mapping_handler);
document.getElementById('fromInput').addEventListener('change',range_mapping_handler);
document.getElementById('toInput').addEventListener('change',range_mapping_handler);
document.getElementById('newValueInput').addEventListener('change',range_mapping_handler);

document.getElementById('ext_select').addEventListener('change', ()=>{
    let v = document.getElementById('ext_select').value;
    if(v === '0'){
        out_ext = "."+current_img_name.split('.')[1];
    }else{
        out_ext = v;
    }
    update_outExt();
})

document.getElementById('out_placeholder').addEventListener('change',()=>{
    let v = document.getElementById('out_placeholder').value;
    if(v === ''){
        out_nombre = "out_"+current_img_name.split('.')[0];
    }else{
        out_nombre = v;
    }
})


async function guardar_img(){
    let v = await eel.guardar(imgOutElement.src, out_nombre, out_ext)
    successAlert();
    console.log('result',v)
}

function successAlert(){
    document.getElementById('success-alert').style.visibility = 'visible';
    setTimeout(() => {
        document.getElementById('success-alert').style.visibility= 'hidden';
    }, 5000);
}

function habilitar_guardado(){
    document.getElementById('guardar-btn').disabled = false;
}