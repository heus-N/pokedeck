import styled from "styled-components"
import TextField from '@mui/material/TextField';
import { Autocomplete, Typography } from "@mui/material";
import AutoCompleteInput from "./AutoCompleteInput";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const jewelColors = [
  '#ee102eff', // Rubi
  '#50C878', // Esmeralda
  '#9966CC', // Ametista
  '#0F52BA', // Safira
  '#FFC87C'  // Topázio
];

interface StyledFilterProps {
  $shadowColor: string;
}


const StyledFilter = styled.nav`
    position: absolute;
    border-right: 2px solid #7f7f7f;
    border-radius: 0 20px 20px 0;
    height: 100%;
    width: 30px;
    // width: 400px;
    left: 0;
    top: 0;
    transition: width 0.75s ease;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(3px);            
    -webkit-backdrop-filter: blur(3px);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
        width: 400px;
        max-width: 80vw;
    }

`

const ClipPathButton1 = styled.span`
  position: absolute;
  right: -27px;
  top: 50%;
  transform: translateY(-50%);
  height: 170px;
  transition: all 1s ease;

  border: 27px solid;
  border-image: linear-gradient(180deg, #7f7f7f, #cfcfcf, #ffffff, #cfcfcf, #7f7f7f) 1;

  clip-path: polygon(
    50% 0%,
    calc(100% - 15px) calc(0% + 35px),
    calc(100% - 15px) calc(50% - 15px),
    calc(100% - 10px) 50%,
    calc(100% - 15px) calc(50% + 15px),
    calc(100% - 15px) calc(100% - 35px),
    50% 100%,
    50% calc(50% + 15px),
    calc(50% - 5px) 50%,
    50% calc(50% - 15px)
  );
`

const ClipPathButton2 = styled(ClipPathButton1)`
  border-image: linear-gradient(180deg, #b8860b , #ffd700  , #fff8dc , #ffd700  , #b8860b ) 1;

  clip-path: polygon(
    calc(50% + 3px) calc(0% + 15px),
    calc(100% - 18px) calc(0% + 35px),
    calc(100% - 18px) calc(50% - 15px),
    calc(100% - 13px) 50%,
    calc(100% - 18px) calc(50% + 15px),
    calc(100% - 18px) calc(100% - 35px),
    calc(50% + 3px) calc(100% - 15px),
    calc(50% + 3px) calc(50% + 15px),
    calc(50% - 2px) 50%,
    calc(50% + 3px) calc(50% - 15px)
  );
`

const FiltersContainer = styled.div`
    z-index: 100;
    padding: 1rem;
    width: 80%;
    height: 80%;
`

interface FilterTableProps {
    children: React.ReactNode;
}

export default function FilterTable({children}: FilterTableProps){
    return(
        <StyledFilter>
            <CatchingPokemonIcon fontSize="medium" className="pokeballButton" />
            <div className='buttonContainer' >
                <ClipPathButton1/>
                <div className='shadowContainer'>
                    <ClipPathButton2 />
                </div>
            </div>
            <FiltersContainer>
                {children}
            </FiltersContainer>
        </StyledFilter>
    )
} 