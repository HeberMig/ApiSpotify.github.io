import styled from "styled-components";


// const Centro = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh; /* Ajusta la altura según tus necesidades */
// `;

const Contenedor = styled.div`
  text-align: center;
  margin: 0 auto; /* Esto centra el contenedor horizontalmente */
  max-width: 200%; /* Limita el ancho máximo del contenedor al ancho del viewport */
  padding: 0 2rem; /*Añade relleno a los lados del contenedor*/
`;

const TextMP = styled.h4`
    margin: 3rem 2rem 0 2rem;
    font-weight: bold;
    font-size: 1.3rem;
`

const MainPage = ()=>{

    return(
        <Contenedor>
        <div>
            <TextMP>Busca el Album's de tu Artista favorito</TextMP>
        </div>
        </Contenedor>
    )
}

export default MainPage