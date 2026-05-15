#!/bin/bash

cd icons

convert icon-16.png -sample 200%  icon-32.png
convert icon-16.png -sample 300%  icon-48.png
convert icon-16.png -sample 600%  icon-96.png
convert icon-16.png -sample 800% icon-128.png

oxipng -- *.png
