import "./App.css";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import ArtistData from "./components/ArtistData";
import AlbumData from "./components/AlbumData";
import styled from "styled-components";
import Swal from "sweetalert2";


const StyledTracks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
  background-image: url("https://c8.alamy.com/compes/2ardbf2/amantes-de-la-musica-pareja-ilustracion-vectorial-cancion-favorita-ambiente-romantico-nina-y-nino-agarrando-las-manos-gente-escuchando-musica-de-contorno-plano-personajes-aislados-sobre-fondo-blanco-2ardbf2.jpg");
  background-size: cover;
  /* background-repeat: no-repeat; */
  background-position: center;
  min-width: auto ; /* Establece el ancho mínimo */
  max-width: auto; /* Establece el ancho máximo */
  margin: 0 auto; /* Centra horizontalmente */
  padding: 1rem; /* Aumenta el espacio interior */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  border-radius: 8px; /* Bordes redondeados */
  font-family: "Special Elite", cursive;
  color: #333; /* Color del texto */
`;

const StyledImage = styled.img`
  max-width: 100%; /* Establece el ancho máximo de la imagen al ancho del contenedor */
  height: auto; /* Permite que la altura se ajuste automáticamente según el ancho */
  margin-top: 1rem; /* Añade un margen superior a la imagen */
`;

const TitleAlb = styled.div`
color: #09aa31;
font-size: 20px;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 10px;
  `;

const ArtistCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
`;


function App() {
  const clientId = "dc4127302b51440a8d55753bb577ab1f";
  const clientSecret = "13f898f497b24b808ef38da036d5a8f7";

  //Estados del componente
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);


  //Efecto de la autenticación al usar
  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }
        return response.json();
      })
      .then((data) => setAccessToken(data.accessToken))
      .catch((error) => console.error("Authentication error:", error));

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
        setLoading(false); // Indica que la carga ha finalizado
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        setLoading(false); // Manejo del error de autenticación
      });
  }, []);

  //Función para buscar información del artista
  async function search(artistName) {
    /**/
    if (!artistName.trim()) {
      // Mostrar un alerta con SweetAlert2
      Swal.fire({
        title: 'Campo de búsqueda vacío',
        text: 'Por favor ingresa un nombre de artista para buscar.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return; // Salir de la función si el campo está vacío
    }
    
    /**/
    
    let artistParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
        Authorization: "Bearer " + accessToken,
      },
    };
    //Obtener el ID del artista
    let artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => data.artists.items[0].id);


    //Establecer el nombre del artista
    await fetch(
      "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => setArtistName(data.artists.items[0].name));

    //Obtener los albumes del artista
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&limit=50",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArtistAlbums(data.items);
      });
  }

  //Funcion para buscar las canciones de un album
  //meti albunName
  async function searchAlbum(albumID, albumName) {
    let albumParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    //Obtener las canciones de albums
    await fetch(
      "https://api.spotify.com/v1/albums/" + albumID + "/tracks?limit=50",
      albumParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTracks(data.items);
        /**/
        // Construir el mensaje con el nombre del álbum y sus canciones
      let message = "<strong>Álbum:</strong> " + albumName + "<br><br>";
      message += "<strong>Canciones:</strong><br>";

      // Recorrer las canciones del álbum y añadir cada una al mensaje
        tracks.forEach((track, index) => {
        message += (index + 1) + ". " + track.name + "<br>";
      });
        //Mostrar Una ventana emergente con sweetAlert2
        /**/
        
        
        Swal.fire({
          title: 'Álbum seleccionado',
          // text: 'Álbum Se',
          html: message,
          icon: 'success',
          confirmButtonText: 'Ok',
          /**/
          onAfterClose: () => {
            // Abrir el enlace al preview de la primera canción del álbum
            window.open(preview);
          }/**/
        });
      })
      .catch((error) => {
        console.error("Error al buscar canciones del álbum:", error);
        // Mostrar una ventana emergente de error con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al buscar las canciones del álbum',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        
        /**/
        //Fin de Mostrar
      });
  }

  console.log(tracks);

  return (
    <AppContainer>
      <div className="App">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <Header search={search} setTracks={setTracks} />
            <MainPage />
            <h2>{artistName}</h2>
            <ArtistCardsContainer>
              {artistAlbums.map((album, index) => {
                return (
                  <ArtistData
                    // title={album.name}
                    // image={album.images[1].url}
                    // searchAlbum={searchAlbum}
                    // albumID={album.id}
                    // key={index}
                    title={album.name}
                    image={album.images[1].url}
                    searchAlbum={(albumID, albumName) => searchAlbum(albumID, albumName)}
                    albumID={album.id}
                    albumName={album.name}
                    key={index}
                  />
                );
              })}
            </ArtistCardsContainer>
            <StyledTracks tracks={tracks}>
  {tracks.length > 0 && (
    <>
      <TitleAlb>Canciones del álbum seleccionado:</TitleAlb>
      {tracks.map((track, index) => (
        <AlbumData
          songName={track.name}
          preview={track.external_urls.spotify}
          searchAlbum={searchAlbum}//Pasar la funcion searchAlbum como prop
          /**/
          key={index}
        />
      ))}
      <StyledImage
        src="https://static.vecteezy.com/system/resources/previews/010/975/974/non_2x/media-player-video-player-png.png"
        alt="Reproductor"
      />
    </>
  )}
  /**/
  /**/
</StyledTracks>
          </div>
        )}
      </div>
    </AppContainer>
  );
}

export default App;
