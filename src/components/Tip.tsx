import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Tip(){
    const { t } = useTranslation('common');
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
                    title={t('filter.tip')}>
                    <InfoIcon sx={{color:'#fff'}}/>
                </Tooltip>
            </div>
        </>        
    )
}