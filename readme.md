# OMK

Все страницы проекта https://arbuzzzi.github.io/omk/app/all-pages.html

Должны быть установлены глобально:
- Gulp https://github.com/gulpjs/gulp

Разворачивание проекта:
1. Установить npm зависимости

`$ npm i`

2. Таск default запускает watch

`$ gulp`

или 

`$ gulp watch`

watch отслеживает изменения .js .css .scss .pug .html и запускает компиляцию

3. Таск build запускает выгрузку проекта в папку dist 
`gulp build`

**НЕ КОМПИЛИРУЕТ ПРОЕКТ**
Build минимизирует файлы .js .css и выгружает проект в папку /dist
Перед выгрузкой проекта убедитесь что он уже скомпилирован

Настройки gulpfile.js:

```javascript
pugUse = true, // если не исползуется pug поставить false
sassUse = true; // если не исползуется sass поставить false
```