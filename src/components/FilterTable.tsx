import styled from "styled-components"

const StyledFilter = styled.nav`
    position: relative;
    border: 1px solid red;
    height: 100%;
    width: 100px;
    left: 0;
    top: 0;
    transition: width 0.3s ease;
    z-index: 10;

    &:hover{
        position: relative;
        width: 400px;
    }
`

export default function FilterTable(){
    return(
        <StyledFilter>
            
        </StyledFilter>
    )
}