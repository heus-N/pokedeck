import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import styled, { keyframes } from "styled-components"

const gradientShift = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;


const StyledArrowContainer = styled.div`
    position: absolute;
    width: 20px;
    height: 25px;
    bottom: -40px;
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));
    left: 45%;

`

const StyledArrow = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,rgb(184, 184, 184), #f5f5f5, rgb(184, 184, 184));
    background-size: 100% 200%;
    animation: ${gradientShift} 2s linear infinite;

    clip-path: polygon(
        0% 0%,
        5px 0px,
        10px 5px,
        15px 0,
        20px 0,
        10px 10px
    );
`

export default function ArrowDown(){
    return(
        <>
            <StyledArrowContainer>
                <StyledArrow style={{ animationDelay: '0s'}} />
                <StyledArrow style={{ animationDelay: '1s', bottom: '15px'}} />
            </StyledArrowContainer>
        </>
    )
}