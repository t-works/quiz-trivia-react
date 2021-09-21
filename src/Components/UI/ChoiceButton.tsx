import styled from 'styled-components';
import React, {FC} from "react";
export interface IButtonStyleProps{
    primary?: boolean
}
const Button = styled.button<IButtonStyleProps>`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


const ChoiceButton: FC = () => {
    return(
        <div>
            <Button>Normal</Button>
            <Button primary={false}>Primary</Button>
        </div>
    )
}
export default ChoiceButton;