#!/usr/bin/env python
# -*- coding: utf-8 -*-
import numpy as numpy
from PIL import Image

#boolean isStreaming = false
#boolean isPlaying = false

# Testing numpy to image and back
#jpeg_img = Image.open(jpegPath)
#
#jpeg_arr = numpy.array(jpeg_img)
#
#new_jpeg_img = Image.fromarray(jpeg_arr)
#
#jpeg_img.save('og.jpeg')
#
#new_jpeg_img.save('mod.jpeg')

class ChangeText:
    def __init__ (self):
        self.text = 'Waiting for images...'
    def print(self):
        test(self)
        document.getElementById('status').innerText = text
    def test(self):
        if isStreaming:
            self.text = 'Steaming images...'
        else:
            self.text = 'Waiting for images...'
changeText = ChangeText();

class ButtonText:
    def __init__ (firstText, secondText):
        self.default = firstText
        self.text = self.default
        self.alt = secondText
        boolBoy = False
    def click(self):
        if boolBoy:
            self.text = self.alt
        else:
            self.text = self.default
        document.getElementById('togglePlay').innerHTML = text
        boolBoy = !boolBoy