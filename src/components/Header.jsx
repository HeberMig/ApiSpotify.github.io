import React from "react";
import SearchBar from "./SearchBar";
import { useState } from "react";
import styled from "styled-components";

const HeaderStyle = styled.div`
    /* position: relative; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: #81b71a; 
    padding-bottom: 15px;
    margin-top: 0;/* -- */
    /*padding-left: 2px; */
`;

const TitleHeader = styled.h1`
    color: black;
    font-family: 'Arial', sans-serif;
`;

const SearchButton = styled.button`
  /* position: relative; */
  padding: 4px 30px; /*Ajusta el relleno del botón*/
  /* padding: 10px 20px; Ajusta el relleno del botón */
  margin: 55px 20px;
  right: -20px;
  background-color: #4caf50; /*Color de fondo del botón */
  color: white; /* Color del texto del botón */
  border: none; /* Elimina el borde del botón */
  border-radius: 2px; /* Agrega bordes redondeados al botón */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
  transition: background-color 0.3s; /* Agrega una transición suave al color de fondo */

  &:hover {
    background-color: #45a049; /* Cambia el color de fondo al pasar el cursor sobre el botón */
  }
`;


function Header(props) {

    const search = props.search;
    const setTracks = props.setTracks;

    const [artistInput, setArtistInput] = useState("");


    return (
        <HeaderStyle>
            <TitleHeader>Album's</TitleHeader>
            <SearchBar
                val={artistInput}
                setVal={setArtistInput} /> 
            <SearchButton onClick={() => {
            search(artistInput);
            setTracks([]);
            } }>Buscar</SearchButton>
        
        </HeaderStyle>
    );
}

export default Header;