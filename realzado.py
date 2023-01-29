import cv2
import numpy as np


def grayScale_simple(input_img):
    gray = cv2.cvtColor(input_img, cv2.COLOR_BGR2GRAY)
    return gray

def grayScale_histEqualize(input_img):
    gray = cv2.cvtColor(input_img, cv2.COLOR_BGR2GRAY)
    equalized = cv2.equalizeHist(gray)
    return equalized

def grayScale_rangeMapping(input_img, min, max, new_value):
    #print("min: " + str(min) + " max: "+str(max)+"n_value: "+ str(new_value))
    gray = cv2.cvtColor(input_img, cv2.COLOR_BGR2GRAY)
    remapped_image = gray.copy()
    indices = np.where((gray >= min) & (gray <= max))
    remapped_image[indices] = new_value
    return remapped_image

def sharpen_space_3x3(input_img):
    kernel = np.array([ [-1,-1,-1],
                        [-1,9,-1],
                        [-1,-1,-1]])
    sharpened = cv2.filter2D(input_img, -1, kernel)
    return sharpened

def sharpen_space_5x5(input_img):
    kernel = np.array([[-1,-1,-1,-1,-1],
                        [-1,2,2,2,-1],
                        [-1,2,8,2,-1],
                        [-1,2,2,2,-1],
                        [-1,-1,-1,-1,-1]]) / 8.0
    """ kernel = np.array([ [-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1],
                        [-1,-1,25,-1,-1],
                        [-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1]]) """
    sharpened = cv2.filter2D(input_img, -1, kernel)
    return sharpened

def sharpen_freq_pasoAlto(input_img):
    return cv2.Laplacian(input_img, cv2.CV_64F)

def sharpen_freq_pasoAlto_histEq(input_img):
    return  cv2.Canny(input_img,100,200)

def sharpen_freq_unsharpMasking(input_img):
    gaussian_3 = cv2.GaussianBlur(input_img, (0, 0), 2.0)
    unsharp_image = cv2.addWeighted(input_img, 3.0, gaussian_3, -2.0, 0)
    return unsharp_image