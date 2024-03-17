import React, { useState } from 'react'
// import { Paper, Typography } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import { Accordion, AccordionDetails, FormControlLabel, IconButton, MenuItem, Radio, Select, TextField, Typography } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import ShortTextIcon from '@mui/icons-material/ShortText';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import './Question_form.css'
import { ShortText } from '@mui/icons-material';
import QuestionFormNew from './QuestionFormNew';
import { useGlobalContext } from './GlobalFormList';

function Question_form() {
    const { questions, setQuestions} = useGlobalContext();

    const defaultQuestion = {
        key: questions.length+1,
        questionText: "",
        questionType: "radio",
        options: [
            { optionText: "option 1", selected: false },
        ],
        open: true,
        required: true
    }

    const getLastIndex = ()=>{
        const keys = Object.keys(questions);
        const sortedKeys = keys.map(Number).sort((a, b) => a - b);
        console.log(sortedKeys);
        const lastIndex = sortedKeys[sortedKeys.length - 1];
        return lastIndex
    }

    const makeNewQuestion = ()=>{
        console.log("logged!!");
        const lastindex = getLastIndex()
        const updatedDict = {...questions}
        updatedDict[lastindex+1] = defaultQuestion
        setQuestions(updatedDict)
    }
    return (
        <div>
            <div className="question_form">
                <br></br>
                <div className="section">
                    <div className="question_title_section">
                        <div className="question_form_top">
                            <input type="text" className="question_form_top_name" style={{ color: "black" }} placeholder="Untitled document"></input>
                            <input type="text" className="question_form_top_desc" placeholder="Form Description"></input>
                            <IconButton color="primary" aria-label="add">
                                <AddIcon onClick={makeNewQuestion}/>
                            </IconButton>
                        </div>
                    </div>
                    {/* {questionUI()} */}
                    {<QuestionFormNew />}
                </div>
            </div>
        </div>
    )
    
}

export default Question_form