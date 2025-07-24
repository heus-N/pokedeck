import styled from "styled-components"
import { useEffect, useState } from "react";
import { Fade, Typography } from "@mui/material";
import Link from "next/link";

const StyledContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: absolute;

    .backgroundContainer {
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
        z-index: -1;
    };

    .text{
        width: 50%;
    }

    img {
        width: 200px;
        filter: drop-shadow(0px 0px 100px rgba(76, 175, 80, 1));

        @media (min-width: 600px) {
            padding: 1rem 2rem;
            width: 300px;
        }

        @media (min-width: 960px) {
            width: 400px;
        }
    }
`

const StyledButton = styled.button`
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 1px 1px 3px rgba(0, 0 , 0, 0.5);
    background-color: transparent;
    transition: 0.3s ease;
    cursor: pointer;

    &:hover{
        scale: 1.05;
        border: 1px solid rgba(76, 175, 80, 1);
        box-shadow: 0px 0px 10px rgba(76, 175, 80, 1);
    }
`

export default function ApiError (){
    const [ shouldDisplay, setShouldDisplay ] = useState(false);
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true)
        const timer = setTimeout(() => setShouldDisplay(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;
    return (
        <StyledContainer>
            <Fade in={shouldDisplay}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <Typography className="text" color='#fff' variant='h1'>Oops! Algo deu errado. Verifique a plataforma para ter certeza de que o servidor está online.</Typography>
                    <img src="/utils/backgrounds/maintenance.png" alt='Página não encontrada' />
                    <Link target="_blank" href="https://pokeapi.co/">
                        <StyledButton>
                            <Typography color='#fff'>
                                pokeapi.co/
                            </Typography>
                        </StyledButton>
                    </Link>
                </div>
            </Fade>
        </StyledContainer>
    );
}