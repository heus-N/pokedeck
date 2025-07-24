import styled from "styled-components"
import { Collapse } from "@mui/material";
import { Instagram, LinkedIn, Facebook, GitHub } from '@mui/icons-material';

import { useState } from "react";
import Link from "next/link";
import ArrowDown from "./ArrowDown";

const jewelColors = [
  '#ee102eff', // Rubi
  '#50C878', // Esmeralda
  '#9966CC', // Ametista
  '#0F52BA', // Safira
  '#FFC87C'  // Topázio
];

interface StyledFilterProps {
  $open: boolean
}

const StyledFilter = styled.nav<StyledFilterProps>`
  padding: 1rem;
  // position: ${({$open}) => $open ? 'absolute' : 'relative'};
  position: absolute;
  border-right: 2px solid #7f7f7f;
  border-radius: 0 20px 20px 0;
  height: 100%;
  width: ${({$open}) => $open ? '400px' : '30px' };
  max-width: 80vw;

  .openContainer{
    position: relative;
    cursor: pointer;
    left: ${({$open}) => $open ? 0 : '-5px'};
    height: 25px;
    width: 20px;
    transition: transform 0.1s ease;
    transform: rotate(${({$open}) => $open ? '90deg' : '-90deg'});
  }

  left: 0;
  top: 0;
  transition: width 0.75s ease;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(3px);            
  -webkit-backdrop-filter: blur(3px);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // &:hover{
  //   width: 400px;
  //   padding: 1rem;
  // };
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
  border-image: linear-gradient(180deg, #2b29a765 , #00ccff41  , #ffffffff , #00ccff41  , #2b29a765 ) 1;

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
  position: relative;
  z-index: 100;
  padding: 1rem;
  width: 90%;
  height: 90%;
`


interface FilterTableProps {
    children: React.ReactNode;
}

export default function FilterTable({children}: FilterTableProps){

  const [open, setOpen] = useState(false)

  return(
    <StyledFilter 
      $open={open}
    >
      {/* <div className='buttonContainer' >
          <ClipPathButton1/>
          <div className='shadowContainer'>
              <ClipPathButton2 />
          </div>
      </div> */}
      <FiltersContainer>
        <div className='openContainer'>
          <ArrowDown 
            toOpen
            onClick={() => setOpen(!open)}
            />
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </FiltersContainer>
    </StyledFilter>
  )
} 