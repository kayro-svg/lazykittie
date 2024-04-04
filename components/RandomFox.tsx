//¿ Que es useRef ? Es un Hook que te permite crear una referencia mutable que persiste durante 
//todo el ciclo de vida de tu componente, lo que significa que no pierde su valor entre renderizaciones.


import { getImgProps } from "next/dist/shared/lib/get-img-props";
import { useRef, useEffect, useState } from "react";
import type { ImgHTMLAttributes } from "react";//traemos todos los tipos posibles para una imagen


type LazyImageProps = { src: string };

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNative;


//forma correcta de definir un componente, siendo explicito
export const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {

    const node = useRef<HTMLImageElement>(null);
    //cuando no se sabe el valor exacto con el que se va a inicializar un elemento de este tipo, se inicializa con null

    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

    //nuevo observador 
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { // de esta forma se controla que la imagen sea visible cuando realiza una interseccion o se visualiza en el viewport del browser
                    setCurrentSrc(src)
                }
            })
        })
        //observe node
        if (node.current) {
            observer.observe(node.current);
        }
        //desconectar
        return () => {
            observer.disconnect();
        };
    }, [src]);

    return (<img ref={node} src={currentSrc}{...imgProps}/>);
}  