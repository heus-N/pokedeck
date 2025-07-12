import styled from "styled-components"

const StyledFilter = styled.nav`
    position: absolute;
    border-right: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 0 20px 20px 0;
    height: 100%;
    width: 30px;
    left: 0;
    top: 0;
    transition: width 0.75s ease;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(3px);            
    -webkit-backdrop-filter: blur(3px);

    &:hover{
        width: 400px;
    }
`

interface FilterTableProps {
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    children: React.ReactNode; 
}

export default function FilterTable({onMouseEnter, onMouseLeave, children}: FilterTableProps){
    return(
        <StyledFilter onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
        </StyledFilter>
    )
} 