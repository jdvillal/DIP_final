import eel
import numpy as np

import cv2
import realzado as rlzd

import base64
from io import BytesIO

def readb64(uri):
   encoded_data = uri.split(',')[1]
   nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
   img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
   return img

def write64(img):
    _, im_arr = cv2.imencode('.png', img)  # im_arr: image in Numpy one-dim array format.
    im_bytes = im_arr.tobytes()
    im_b64 = base64.b64encode(im_bytes).decode('utf-8')
    return im_b64

def guardarImg(img, name, ext):
    cv2.imwrite('output/'+name+ext, img)


eel.init('web')

current_img = None

@eel.expose
def get_random_name():
    eel.prompt_alerts('Random name')
    return('this is a test')

@eel.expose
def get_ip():
    eel.prompt_alerts('127.0.0.1')


@eel.expose
def load_image(data):
    try:
        img = readb64(data)
        return write64(img)
    except Exception as e:
        print(e)
        return False

@eel.expose
def grayScale_simple(data):
    img = readb64(data)
    out = rlzd.grayScale_simple(img)
    return write64(out)

@eel.expose
def grayScale_histEqualize(data):
    img = readb64(data)
    out = rlzd.grayScale_histEqualize(img)
    return write64(out)

@eel.expose
def grayScale_rangeMapping(data,min,max,new_value):
    img = readb64(data)
    out = rlzd.grayScale_rangeMapping(img,int(min),int(max),int(new_value))
    return write64(out)

@eel.expose
def sharpen_space_3x3(data):
    img = readb64(data)
    out = rlzd.sharpen_space_3x3(img)
    return write64(out)

@eel.expose
def sharpen_space_5x5(data):
    img = readb64(data)
    out = rlzd.sharpen_space_5x5(img)
    return write64(out)

@eel.expose
def sharpen_freq_pasoAlto(data):
    img = readb64(data)
    out = rlzd.sharpen_freq_pasoAlto(img)
    return write64(out)

@eel.expose
def sharpen_freq_pasoAlto_histEq(data):
    img = readb64(data)
    out = rlzd.sharpen_freq_pasoAlto_histEq(img)
    return write64(out)

@eel.expose
def sharpen_freq_unsharpMasking(data):
    img = readb64(data)
    out = rlzd.sharpen_freq_unsharpMasking(img)
    return write64(out)

@eel.expose
def guardar(data, name, ext):
    try:
        img = readb64(data)
        if(ext == '.pgm'):
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        guardarImg(img, name, ext)
        return True
    except:
        return False

eel.start('index.html')