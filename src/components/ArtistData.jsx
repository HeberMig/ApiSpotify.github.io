import React from "react";
import styled from "styled-components";

const SingleAlbum = styled.div`
    margin: 1.5rem;
    width: 300px;
    height: 350px;
    padding: 1.5rem;
`

const AlbumTitle = styled.h2`
    text-align: center;
`

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que las tarjetas envuelvan si el espacio es insuficiente */
  justify-content: center; /*Centra las tarjetas horizontalmente */
`;

// Estilos para la tarjeta individual
const Card = styled.div`
  /* Estilos de la tarjeta aquí */
  margin: 4px; /* Añade un margen entre las tarjetas */
  
`;

const ArtistData = (props) =>{
    
    const title = props.title
    const image = props.image
    const albumID = props.albumID
    const searchAlbum = props.searchAlbum
    
        return(
            <CardsContainer>
            <SingleAlbum>
                <Card>
                {/* <img src={image} alt={title} onClick={()=> searchAlbum(albumID)}/> */}
                <img src={image} alt={title} onClick={() => searchAlbum(albumID, title)} />
                <AlbumTitle>{title}</AlbumTitle>
                </Card>
            </SingleAlbum>
            </CardsContainer>
        )
}
 

export default ArtistData