import { Path, Svg, SvgProps } from "react-native-svg";
import { THEME_COLORS } from "../../globalStyles/GlobalStyles";

export const CallLogo = (props: SvgProps) => (
    <Svg
      fill='#000000'
      width='30px'
      height='30px'
      viewBox='0 0 24 24'
      id='call'
      data-name='Flat Color'
      {...props}
    >
      <Path
        id='secondary'
        d='M17,13a1,1,0,0,1-1-1,4,4,0,0,0-4-4,1,1,0,0,1,0-2,6,6,0,0,1,6,6A1,1,0,0,1,17,13Zm4.93.12A8.32,8.32,0,0,0,22,12,10,10,0,0,0,12,2a8.32,8.32,0,0,0-1.12.07,1,1,0,1,0,.24,2A8.49,8.49,0,0,1,12,4a8,8,0,0,1,8,8,8.49,8.49,0,0,1-.05.88A1,1,0,0,0,20.82,14h.12A1,1,0,0,0,21.93,13.12Z'
        fill= {THEME_COLORS.secondary}
      />
      <Path
        id='primary'
        d='M18.18,17.53a3,3,0,0,0-1.5-1.89c-.33-.17-.66-.36-1-.55a3,3,0,0,0-4,.79l-1.26,1.8a18.41,18.41,0,0,1-2.21-1.9,18.41,18.41,0,0,1-1.9-2.21l1.8-1.26a3,3,0,0,0,.79-4c-.19-.3-.38-.63-.55-1a3,3,0,0,0-4.29-1.1l-1,.62A2.15,2.15,0,0,0,2.06,9.21a14.48,14.48,0,0,0,2,4.63h0a19.15,19.15,0,0,0,2.71,3.33,19.15,19.15,0,0,0,3.33,2.71h0a14.48,14.48,0,0,0,4.63,2,2.29,2.29,0,0,0,.51.06,2.21,2.21,0,0,0,1.86-1.12l.62-.95A3,3,0,0,0,18.18,17.53Z'
        fill= "rgb(0, 0, 0)"
      />
    </Svg>
  );