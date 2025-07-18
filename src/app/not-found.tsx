'use client';

import { Fade, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import PokeballSvg from '../../public/utils/pokeballSvg';
import { useEffect, useState } from 'react';

const PageNotFound = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .backgroundContainer {
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
        z-index: -1;
    };

    img {
        width: 200px;
        filter: drop-shadow(0px 0px 100px rgba(33, 150, 243, 1));

        @media (min-width: 600px) {
            padding: 1rem 2rem;
            width: 300px;
        }

        @media (min-width: 960px) {
            width: 400px;
        }
    }
`;

const StyledButton = styled.button`
    border: 1px solid red;
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
        border: 1px solid rgba(33, 150, 243, 1);
        box-shadow: 0px 0px 10px  rgba(33, 150, 243, 1);
    }
`

export default function NotFound() {
    const [shouldDisplay, setShouldDisplay] = useState(false);
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true)
        const timer = setTimeout(() => setShouldDisplay(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <PageNotFound>
            <div className='backgroundContainer'>
                <PokeballSvg />
            </div>

            {shouldDisplay && 
                <Fade in={shouldDisplay}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <Typography color='#fff' variant='h1'>Página não encontrada!</Typography>
                        <img src="/utils/backgrounds/pageNotFound.png" alt='Página não encontrada' />
                        <Link href="/">
                            <StyledButton>
                                <Typography color='#fff'>
                                    Voltar para a Home
                                </Typography>
                            </StyledButton>
                        </Link>
                    </div>
                </Fade>
            }
        </PageNotFound>
    );
}
