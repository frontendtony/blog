import { useLayoutEffect, useState } from 'react';
import { ThemeObject } from '../interfaces';

const themes = {
  dark: {
    primary: '#1ca086',
    textColor: 'white',
    backgroundColor: '#0d1219',
    secondaryBackgroundColor: '#1d3a48',
    blockquoteColor: 'rgba(255,255,255,0.20)',
    icon: 'white'
  },
  light: {
    primary: '#1ca086',
    textColor: 'black',
    backgroundColor: '#EDF2F7',
    secondaryBackgroundColor: '#cbdde4',
    blockquoteColor: 'rgba(0,0,0,0.80)',
    icon: '#0d1219'
  }
};

const setCSSVariables = (properties: ThemeObject) => {
  for (const property in properties) {
    document.documentElement.style.setProperty(`--${property}`, properties[property]);
  }
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useLayoutEffect(() => {
    const previouslySelectedTheme = localStorage.getItem('theme');

    // only update the theme if light theme was previously selected
    if (previouslySelectedTheme === 'light') {
      setTheme(previouslySelectedTheme);
    }
  }, []);

  useLayoutEffect(() => {
    // remember the previous theme when the user visits the site
    localStorage.setItem('theme', theme);

    // set the custom properties for use in styles
    setCSSVariables(themes[theme]);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <label className="theme-switch">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAADUElEQVQ4y41U3UuTURjfnH3cGBJ1UVTSRX9AF911Uzd9EHUTFBmF0FWZ5HSb05kOYiCJEEWkBFHm1gfC+v601aZT1CzFUJEwU6Mondve97yv2+v76znndTpLVwcO59n7PPs9v9/zPOeYTLSkoN0kvbNz0yQH7WZxtjlXyiFHtvTGym3DNxfz30t6Z1uw35Y6pEDJOmEHrPMJ/7lY0CYY8uws7OQM1xDwLrnVOUkMyzkoZ2ok5HE2sdN/L2bFwQzJ5jnJewmwB30XwEGJqVNuLVvNOiotrNNt4XHkN1OSVIkySzXk2rM5KO3dmdQtAzbXjBBlDdq3pAXvY+HyHG5PN5/Kk94UnmFhVz1995PMI8tKFnUMlJrJsYfkP6RabqS6Zc8nDJS61Y/uOKJ+4KcXUqC4Tg67ctUPFw3A4BKABLaZ5PmVkANkV6rd7hUG67J7mKwHlKAO9h5S0FG7kKh4uVExmkGAG8iuSGeGyQZAeqxCG4P6qWFq8sqm9YbvXFZGyWIUgvYsClhp1KwgT+31kMxGgHUlgDE6PE+5D+qQWW5zLS11AdBoDGuvsBgMSgrx6zoQ9SUJIAmMgrVXe7kvOfaImudYusPpXean0l0tAGn+roE1AdO+BNRhDfgKpae2XTAEyF/OYwRoiik/FyXhsmcGLqbucSOYF4h4kzrr16FNIDHchGjzwe3GnFpXCFBialwMmznVi7QhtZlY53mDYchRB5kYRm4ldKldR3JCQ3IArMMd7rOYLCmmya8PzYBmTptdy2LQ1jLxIf6q6DAmrlINb2t6pFmH+pn+N66BdQvQFNPUivqPbiQwF03K2kXXiO6tsL/X7FyldFUNQfIBUzeTiL0EZkYI9JsGbVDI5zWVw1Ve5eOlB4meGkhvSxr+eCRSL4hNzFj8ZdF+DNcCMZ8hffqRrsu9OhKjJH8c0EdJNTFHD5T3npGI71DO3+MTmrvXbU4DtOVcQaLPA8jUID6TUa+O2INZSC9oP6dkd6F0Vg5G/ce3pQ/8XyMU8R6jmXQJZ+zp6R30SDyZ6a9R8OUyMH4Fs8Rc/VD9g7pdN3XnZK5I/rowK+OTFLmTz7s9HxS5f2Jr/EXRgXiL9Wjs2dldv27k584TaSkWcaytwvQbVnacC3ai5hwAAAAASUVORK5CYII="
        alt="half moon, to signify dark mode"
        className={`toggle-image dark ${theme === 'light' ? 'hidden' : ''}`}
      />
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAACWUlEQVQ4y5VVz2sTURB+L9kkBxEF9VBCqQdFiognQWtr+xcIIgrtv6L04kU8VmuyhWp6EDyp8ShqwVsp6tFfiCJ6iKKtghVisp/fzL592azbkD4YdjI779uZ+b73Ysw2C7XYnG/FfLxudrZkU9QDK6Ti6kf1IUCTBD4tLaAVCVDS2E2zj/5BB1qSd1GcY9N780Dtf7EH+ysI7RqthdulsWH29L3gs8oqZhGa8wQ5i+vmGZYMGAP993x/MQrtOf6eoz+eC+oGHTh/Fve4+RatQbu/G3ha7WCV1twDrDC2LHH9yFU308C3nRAgc9HfUpmALdk/eHGkje9THWyegdqPqS5eH2ujUd7SnNDOuwoDT1RKGjEB0qZU9pJgv2aArxNAK2U/p4G3x9u4oxVecoCVPnISOaBJAmRm0qZUJmBZa50S0C4eHQAWzAdWO+bACl60XhrCphAgM5MWW3mAE3H764c6BGHb5gufRz05Ue8EjJK9z5q0OgTg88NdLCrgX+6ZzFYZt9woV9nyGzzcGxOQBfx2utfykxFEC2YDy8WTDqzoWe4jpW4uqDRekU0hQAA8KfQ3WN2nE23cLSJaNFfc3rLHErod5U42FK3orFHaUjalmkQ2m/QVbNdvzQnt5UQ2uKGSyxX2nIpWdCbSEDaFAJnZ4xFIZQrWNOD8r6mwawQMtz9643ICmDAvOqM03ilRJEBmJm1KZQLG+HQfGUNdDiuVKgE+8gOdhID0igZcDtnrK2CFFTcGqXoyIUCPWk1zCq7lwSshKueCjYlLE7CTWzvzF1BwJ2og2D/ycEN4ARcHRwAAAABJRU5ErkJggg=="
        alt="bright sunlight, to signify light mode"
        className={`toggle-image light ${theme === 'dark' ? 'hidden' : ''}`}
      />
      <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
      <span className="slider" />
    </label>
  );
};

export default ThemeToggle;
