# sbrd

### Как использовать

- Код развернут здесь https://fyodor-e.github.io/sbrd/
- Локальный запуск

```
  git clone https://github.com/fyodor-e/sbrd.git
  cd sbrd
  npm i
  npm run dev
```

### Реализовано

- Конвертация линий, прямоугольников, эллипсов и картинок (PNG)
- Scale, translate и rotation. Для картинок не реализовано rotation.
- Две сцены с кнопкой переключения между ними
- События pointrUp и pointerDown

### Не реализовано

- Экспорт в PDF

### Ограничения

- Не везде есть обработчики ошибок
- Нет освобождение памяти Skia, Pixi.
- Canvas для Pixi и Skia фиксированные по размеру (200 x 200 px) и не меняются при изменении размера экрана
- forceCanvas: true - не работает. "Unable to auto-detect a suitable renderer."
- pointerup & pointerdown реализованы только для Ellipse & Rect. Обработчики событий не получают аргумент (MouseEvent, и т.п.)
