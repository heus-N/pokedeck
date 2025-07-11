import styled from "styled-components"

const StyledFilter = styled.nav`
    position: absolute;
    border: 1px solid red;
    border-radius: 0 20px 20px 0;
    height: 100%;
    width: 30px;
    left: 0;
    top: 0;
    transition: width 0.3s ease;
    z-index: 10;

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