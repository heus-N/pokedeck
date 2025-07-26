import { Instagram, LinkedIn, Facebook, GitHub } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const MediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #f7f7f7;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 100%;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 600px){
    top: 10%;
    width: 100%;
  };

  .linksContainer{
    transition: box-shadow 0.5s ease;
    border-radius: 12px;
    gap: 1rem;
    display: flex;
    padding: 0.5rem 1rem;

    @media (max-width: 600px){
      width: 100%;
      justify-content: space-around;
    };

    &:hover{
      box-shadow: 0px 0px 20px rgba(33, 150, 243, 1);
    }

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
    color: #f7f7f7;
    font-size: 2rem;
    transition: scale 0.5s ease;
  };
`

export default function SocialMedias(){

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation('common');
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
    <MediaContainer>
      <Typography>{t('filter.createBy')}:</Typography>
      <div className='linksContainer'>
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
      </div>
    </MediaContainer>
  )
}