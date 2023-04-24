declare module '*.scss' {
  type ClassNames = {
    [className: string]: string
  }
  const classNames: ClassNames
  export = classNames;
}

declare module '*.png'
declare module '*.jpg'
declare module '*.gif'