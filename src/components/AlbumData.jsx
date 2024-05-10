import React from "react";
import styled from "styled-components";

const SongName = styled.p`
  /* Estilos para el nombre de la canción */
  cursor: pointer; /* Cambia el cursor al pasar sobre el nombre de la canción */
  color: #9e0101; /* Color del texto */
  font-size: 16px; /* Tamaño de fuente */
  margin-bottom: 5px; /* Margen inferior */
`;



const AlbumData = (props) => {
//     // const {songName, preview} = props
//     const { songName, preview, searchAlbum } = props;

//   const handleClick = () => {
//     // Llamar a la función searchAlbum cuando se hace clic en el nombre de la canción
//     searchAlbum(props.AlbumID, props.title);
//   }; 


const { songName, preview, searchAlbum } = props;

const handleClick = () => {
  // Llamar a la función searchAlbum con los detalles del álbum
  searchAlbum(props.albumID, props.title);
};

    return(
        <div>
            <SongName>
            {/* <a href={preview} target="_blank" rel="noopener noreferrer">{songName}</a>     */}
            <p onClick={() => window.open(preview, '_blank', 'noopener noreferrer')}>{songName}</p>
            {/* <p onClick={(handleClick) => window.open({preview})}>{songName}</p> */}
            {/* <p onClick={() => window.open(preview, '_blank', 'noopener noreferrer')}>{songName}</p> */}

            </SongName>        
          
        </div>
    );

};

export default AlbumData