import Titulo from "./Titulo";
import Avatar from "./Avatar";
import Search from "./Busca";
import React from "react";

interface CabecalhoProps {
    titulo: string;
    subtitulo: string;
}

export default function Cabecalho(props: CabecalhoProps) {
    return (
        <div className="flex items-center justify-between">
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className="flex items-center justify-center flex-grow"> 
                <Search />
            </div>
            <div className="flex justify-end items-center">
                <Avatar />
            </div>
        </div>
    );
}
