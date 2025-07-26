import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TipProps {
    message: string
}

export default function Tip({message}: TipProps){
    return(
        <>
            <div style={{ width: '24px', height: '24px'}}>
                <Tooltip 
                    slotProps={{
                        popper:{
                          modifiers: [
                            {
                              name: 'disablePointerEvents',
                              enabled: true,
                              phase: 'afterWrite',
                              fn: ({ state }) => {
                                if (state.elements.popper) {
                                  state.elements.popper.style.pointerEvents = 'none';
                                }
                              },
                            },
                          ]},
                        }}  
                    title={message}>
                    <InfoIcon sx={{color:'#f7f7f7'}}/>
                </Tooltip>
            </div>
        </>        
    )
}