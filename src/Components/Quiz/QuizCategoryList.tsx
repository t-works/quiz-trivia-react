import React, {useEffect, FC, useState} from "react";
import { QuizApi} from "../Quiz/quizTypes.d";
import {useQuizContext} from "./QuizContext";
import {ErrorPayloadAxios, getCategories} from "../../Api/getCategories";
import QuizCategory from "./QuizCategory";
import Popup from "../UI/Popup";
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react';
import styled from "styled-components";


export interface IContainerProps{
    expanded?: boolean
}
    const CategoriesContainer = styled.div<IContainerProps>`
    @media (min-width: 1300px){
        .container &{
            margin-right:6%;
            margin-left:6%;
        }
    }
    @media (min-width: 1440px){
        .container &{
            margin-right:-15%;
            margin-left:-15%;
        }
    }
`;

const QuizCategoryList: FC = () => {
    const {setCategories, categories} = useQuizContext();
    const [resultPopup,setResultPopup] = useState(null as  JSX.Element | null)
    const [expanded,setExpanded] = useState(false);
    const onGetCategories = async (payload: QuizApi.IApiResponseCategories)=>{
        if (setCategories) {
            await setCategories(payload.trivia_categories)
        }
    }
    const onGetCategoriesError = (payload: ErrorPayloadAxios)=>{
        setResultPopup(
            <Popup callback={hidePopup}>
                <p>Loading categories failed. Please check your network connection</p>
            </Popup>
        )
    }
    useEffect( () => {
        if(categories.length<=0){
            getCategories(onGetCategories,onGetCategoriesError)
        }
    }, [categories.length]);

    const hidePopup = () =>{
        setResultPopup(null);
    }

    const CategoryListSummary = categories.filter((category,index)=>{
           return index<4;
    })
    const CategoryListMore = categories.filter((category,index)=>{
           return index>=4;
    })
    const CategoryListView = CategoryListSummary.map(
        (category, idx) => <QuizCategory key={category.id} idx={idx} category={category}/>);

    const CategoryListMoreView = expanded? CategoryListMore.map(
        (category, idx) => <QuizCategory key={category.id} idx={idx+4} category={category}/>):'';
    const expand = () => {setExpanded(true)}
    const fold = () => {setExpanded(false)}
    return(
        <CategoriesContainer className="panel" expanded={expanded}>
            {CategoryListView}

            {!expanded? <div onClick={expand}><ChevronDownIcon  size="large" aria-label="Show more"/></div>:'' }

            {CategoryListMoreView}
            {expanded? <div onClick={fold}><ChevronUpIcon  size="large" aria-label="Show more"/></div>:'' }

            {resultPopup}
        </CategoriesContainer>
    )
}
export default QuizCategoryList;