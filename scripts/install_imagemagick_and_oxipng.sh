#!/bin/bash

if ! command -v convert; then
  sudo apt install --update -y imagemagick
fi

if ! command -v oxipng; then
  cd "$(mktemp -d)"
  gh release download -R oxipng/oxipng -p 'oxipng-*.*.*-x86_64-unknown-linux-gnu.tar.gz'
  tar -xf oxipng-*.*.*-x86_64-unknown-linux-gnu.tar.gz --strip-components 1
  mkdir -p ~/.local/bin
  mv oxipng ~/.local/bin
fi
