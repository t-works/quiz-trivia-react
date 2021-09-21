import styled from 'styled-components';
import React, {FC, ReactElement, useEffect, useState} from "react";
export interface IPopupFc{
    children?: ReactElement[] | ReactElement;
    callback: ()=>void;
    styleType?: "success" | "warning" | "congrats";
    buttonText?: string;
    headerText?: string;
}
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
`;

export interface IPopupStyleProps{
    styleType: "success" | "warning" | "congrats"
}
const PopupWrapper = styled.div<IPopupStyleProps>`
  color: ${(props) => {
      switch(props.styleType){
          case('success'):
              return "white";
          case("warning"):
              return ""
      }
    }};
  background: ${(props) => {
      switch(props.styleType){
          case('success'):
              return "white";
          case("warning"):
              return "#692525"
      }
      return "#fff"
    }};
  border: ${(props) => {
      switch(props.styleType){
          case('success'):
              return "white";
          case("warning"):
              return "4px solid #943535"
      }
      return "#fff"
    }};
  border: ${(props) => {
      switch(props.styleType){
          case('success'):
              return "4px solid  #99aff7";
          case("warning"):
              return "4px solid #943535";
          case("congrats"):
              return "4px solid #99aff7";
      }
      return "#fff"
    }};
  font-size: 1em;
  padding: 50px 20px 40px 20px;
  border-radius: 15px;
  max-width:560px;
  width:90%;
  margin: 0px auto;
  h2 {
    color: ${(props) => {
    switch(props.styleType){
        case('success'):
            return "#EBE9C1";
        case("warning"):
            return "#EBE9C1"
    }
    return "#fff"
    }};
  }
  p,h2 {
    color: ${(props) => {
    switch(props.styleType){
        case('success'):
            return "#4965ba";
        case("warning"):
            return "#EBE9C1";
        case("congrats"):
            return "#4965ba";
        default:
            return "#EBE9C1"
    }
    }};
  }
  button{
    border: ${(props) => {
    switch(props.styleType){
        case('success'):
            return "4px solid  #99aff7";
        case("warning"):
            return "2px solid #EBE9C1;";
        case("congrats"):
            return "1px solid #293968;";
    }
    return "#fff"
    }};
  }
  @media (max-width: 640px){
    width: 100%;
    height: 100%;
    top:0px;
    left: 0px;
    border-radius: 0px;
    padding-top: 30vh;
    border: 0px;
    .btn{
        width: 80%;
    }
  }
`;
const Overlay = styled.div<IPopupStyleProps>`
  background: ${props => props.styleType === "congrats" ? "RGBA(255,255,255,0.9)" : "RGBA(0,0,0,0.7)"};
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  top:0px;
  left:0px;
  text-align: center;
  margin: 0;
  padding: 0;
  z-index: 1200;
`;

const Popup: FC<IPopupFc> = ({children,styleType,buttonText,headerText,callback}: IPopupFc) => {
    const [showHeader,setShowHeader] = useState(false);
    if(!styleType){
        styleType="success";
    }
    if(!buttonText){
        buttonText="OK";
    }
    useEffect(()=>{
        if(headerText){
            setShowHeader(true);
        }else{
            setShowHeader(false);
        }
    },[headerText])

    return(
        <Overlay styleType={styleType}>
            <PopupWrapper role="alert"
                          styleType={styleType}>
                {showHeader? <h2>{}</h2>:''}
                            {children}
                <Button className="btn" onClick={callback}>{buttonText}</Button>
            </PopupWrapper>
        </Overlay>
    )
}
export default Popup;