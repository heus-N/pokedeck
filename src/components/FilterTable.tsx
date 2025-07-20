import styled from "styled-components"
import { Collapse } from "@mui/material";
import { Instagram, LinkedIn, Facebook, GitHub } from '@mui/icons-material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

import { useState } from "react";
import Link from "next/link";

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
  padding: 1rem;
  position: absolute;
  border-right: 2px solid #7f7f7f;
  border-radius: 0 20px 20px 0;
  height: 100%;
  // width: 30px;
  width: 400px;
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

  &:hover{
    width: 400px;
    max-width: 80vw;
    padding: 1rem;
  };
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

const MediaContainer = styled.div`
  border-radius: 12px;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  transition: box-shadow 0.5s ease;
  bottom: 0;
  margin-bottom: 1rem;
  position: absolute;

  .link{
    width: 2rem;
    height: 2rem;

    &.animate {
      animation: rotateAndScale 0.6s ease-in-out;
    }

    &:hover {
      animation: rotateAndScale 0.6s ease-in-out;
      animation-fill-mode: forwards;
    }
  }

  
  @keyframes rotateAndScale {
    0% {
      transform: scale(1) rotate(0deg);
    }
    30% {
      transform: scale(1.1) rotate(5deg);
    }
    70% {
      transform: scale(1) rotate(-5deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  .mediaIcon{
    color: #fff;
    font-size: 2rem;
    transition: scale 0.5s ease;
  };

  &:hover{
    box-shadow: 0px 0px 20px rgba(33, 150, 243, 1);
  }
`

interface FilterTableProps {
    children: React.ReactNode;
}

export default function FilterTable({children}: FilterTableProps){

  const [open, setOpen] = useState(false)

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 600);
  };

  const links = [
    {href: 'https://github.com/heus-N', icon: <GitHub className="mediaIcon" />},
    {href: 'https://www.linkedin.com/in/marciano-matheus/', icon: <LinkedIn className="mediaIcon" />},
    {href: 'https://www.instagram.com/__heus/', icon: <Instagram className="mediaIcon" />},
    {href: 'https://www.facebook.com/mmatheus.nuness/?locale=pt_BR', icon: <Facebook className="mediaIcon" />},
  ]

    return(
        <StyledFilter onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <div className='buttonContainer' >
              <ClipPathButton1/>
              <div className='shadowContainer'>
                  <ClipPathButton2 />
              </div>
          </div>
          <FiltersContainer>
            <Collapse in={true} timeout="auto" unmountOnExit>
              {children}
              <MediaContainer>
                {links.map((link, index) => (
                  <Link 
                    href={link.href}
                    target="_blank"
                    onMouseEnter={() => handleMouseEnter(index)}
                    key={index}
                    className={`link ${activeIndex === index ? 'animate' : ''}`}
                  >
                    {link.icon}
                  </Link>
                ))}
                {/* <Link className="link" target="_blank" href="https://github.com/heus-N">
                  <GitHub className="mediaIcon" />
                </Link>
                <Link className="link" target="_blank" href="https://www.linkedin.com/in/marciano-matheus/">
                  <LinkedIn className="mediaIcon" />
                </Link>
                <Link className="link" target="_blank" href="https://www.instagram.com/__heus/">
                  <Instagram className="mediaIcon" />
                </Link>
                <Link className="link" target="_blank" href="https://www.facebook.com/mmatheus.nuness/?locale=pt_BR">
                  <Facebook className="mediaIcon" />
                </Link> */}

              </MediaContainer>
            </Collapse>
          </FiltersContainer>
        </StyledFilter>
    )
} 