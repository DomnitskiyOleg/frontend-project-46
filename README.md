### Hexlet tests and linter status:
[![Actions Status](https://github.com/DomnitskiyOleg/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/DomnitskiyOleg/frontend-project-46/actions)
[![hello-world](https://github.com/DomnitskiyOleg/frontend-project-46/actions/workflows/internal-check.yml/badge.svg)](https://github.com/DomnitskiyOleg/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/628857704952f6a7369e/maintainability)](https://codeclimate.com/github/DomnitskiyOleg/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/628857704952f6a7369e/test_coverage)](https://codeclimate.com/github/DomnitskiyOleg/frontend-project-46/test_coverage)
# GenDiff
#### Utility library that Compares two configuration files and shows a difference.
# Installation as library
```
npm i https://github.com/DomnitskiyOleg/frontend-project-46.git
```
# Using in your code editor
```
import genDiff from '@hexlet/code';

const diff = genDiff(filepath1, filepath2, formatName);
console.log(diff);
```
# Using as CLI application 
```
git clone git@github.com:DomnitskiyOleg/frontend-project-46.git
make install
npm link
```
# CLI help
```
gendiff -h
```
![cli](https://user-images.githubusercontent.com/119673815/226543605-8fb24c3d-1f39-495d-95d8-47b38ace9a64.jpg)

# Three output formats (look examples)
### stylish (default)
### plain
### json


# Examples
#### Comparison flat json files (stylish)
[![asciicast](https://asciinema.org/a/566946.svg)](https://asciinema.org/a/566946)
#### Comparison flat yaml files (stylish)
[![asciicast](https://asciinema.org/a/567409.svg)](https://asciinema.org/a/567409)
#### Comparison nested  yml files (stylish)
[![asciicast](https://asciinema.org/a/568032.svg)](https://asciinema.org/a/568032)
#### Comparison nested json json files (plain)
[![asciicast](https://asciinema.org/a/568504.svg)](https://asciinema.org/a/568504)
#### Comparison nested json yml files (json)
[![asciicast](https://asciinema.org/a/568774.svg)](https://asciinema.org/a/568774)

# Enjoy !