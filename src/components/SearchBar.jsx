import styled from "styled-components";

// const InputBar = styled.div`
//     margin-top: 1rem;
//     display:flex;
//     flex-direction: column;
//     background-color: #81b71a;
//     border-radius: 10px;
//     padding: 0.5rem;
// `
const InputBar = styled.div`
    margin-top: 1rem;
    width: 100%; /* Ajusta el ancho al 100% */
    display:flex;
    justify-content: center; /* Centra el contenido horizontalmente */
    background-color: #81b71a;
    border-radius: 10px;
    padding: 0.5rem;
`

// const InputText = styled.input`
//     padding: 0.7rem 3.5rem;
//     margin: 40px;
//     text-align: center;
//     border-radius: 50px;
//     font-size: 1.2rem;
//     ::placeholder{
//         color:black;
//     }
// `
const InputText = styled.input`
    padding: 0.7rem 3.5rem;
    text-align: center;
    border-radius: 50px;
    font-size: 1.2rem;
    width: 100%; /* Ajusta el ancho al 100% */
    ::placeholder{
        color:black;
    }
`


const Centro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin: 2px;
  
  
`;

const SearchBar = (props) =>{

    const handleInput = (e) =>{
        props.setVal(e.target.value)
    }
    return(
        <Centro>
        <InputBar>
            <InputText
                placeholder="¡Busca a tu artista favorito!"
                required
                value={props.val}
                onChange={handleInput}
                type="text"
            />
        </InputBar>
        </Centro>
    )
}

export default SearchBar