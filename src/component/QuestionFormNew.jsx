import React, { useState } from 'react'
import { Accordion, AccordionSummary, Box, FormControlLabel, IconButton, Input, MenuItem, Radio, RadioGroup, TextField, Typography, Button } from '@mui/material';
import { useGlobalContext } from './GlobalFormList';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
// import MulitpleChoice from './MultipleChoiceComponent/MulitpleChoice';

const QuestionFormNew = () => {

    const { questions, setQuestions } = useGlobalContext();
    const selectionList = ["Multiple choice", "Checkboxes", "Dropdown", "Paragraph"]
    const [selectionOption, setSelectionOption] = useState("Multiple choice")

    const handleSelectionChange = (key, questionIndex) => (event) => {
        console.log(key, questionIndex, event.target.value);
        const updatedDict = { ...questions }
        updatedDict[questionIndex].questionType = event.target.value
        setQuestions(updatedDict);
    };

    const deleteButton = (questionIndex) => {
        const updatedDict = { ...questions }
        delete updatedDict[questionIndex]
        setQuestions(updatedDict)
    }

    const radioButtonChange = (event, questionIndex, optionIndex) => {
        event.stopPropagation(); // Stop event propagation to prevent it from being triggered twice
        const updatedQuestions = { ...questions }
        // console.log(updatedQuestions[questionIndex].options);
        updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.map((option, oIndex) => ({
            ...option,
            selected: oIndex === optionIndex
        }))

        setQuestions(updatedQuestions);
    }

    const GetComponent = (ques, questionIndex) => {
        if (ques.questionType == "Multiple choice") {
            console.log('here');
            return MultipleChoiceComponent(ques, questionIndex)
        }
        else if (ques.questionType == "Checkboxes") {
            return <h1>Checkbox</h1>
        }
        else if (ques.questionType == "Dropdown") {
            return <h1>Dropdown</h1>
        }
        else if (ques.questionType == "Paragraph") {
            return <h1>Paragraph</h1>
        }
    }
    const MultipleChoiceComponent = (quesObj, questionIndex) => {
        return (<>
            <RadioGroup style={{ "margin": "15px 0 0 10px" }}
                value={quesObj.options.find(option => option.selected)?.optionText}
            >
                {quesObj.options.map((op, optionIndex) => (
                    <div key={optionIndex}>
                        <div>
                            <FormControlLabel
                                value={op.optionText}
                                control={<Radio style={{ marginRight: '3px' }} />}
                                label={<Typography style={{ color: '#555555' }}><Input style={{ width: "70%" }} defaultValue={op.optionText} /><CloseIcon/></Typography>}
                                onChange={(event) => radioButtonChange(event, questionIndex, optionIndex)}
                            />
                        </div>
                    </div>
                ))}
            </RadioGroup>
            <Button onClick={() => addOption(questionIndex, quesObj)}>Add Option</Button>
        </>
        )
    }

    const addOption = (questionIndex, quesObj) => {
        console.log(questionIndex, quesObj);
        const updatedDict = { ...questions }
        updatedDict[questionIndex]['options'].push({ optionText: '', selected: false })
        setQuestions(updatedDict)
    }

    return (
        <div>
            {Object.entries(questions).map(([questionIndex, ques]) => (
                // questions.map((ques, questionIndex) => (
                <Accordion key={questionIndex} expanded={ques.open}>
                    <AccordionSummary>
                        <div style={{ flex: '3', marginLeft: "10px" }}>
                            {ques.open ? (
                                <div>
                                    <div>
                                        <TextField id="standard-basic" label=" " fullWidth defaultValue={ques.questionText ? ques.questionText : "Question"} InputProps={{ disableUnderline: true }} variant="filled" placeholder='Question' />
                                        {/* To Do containerization
                                         <MulitpleChoice ques={ques} questionIndex={questionIndex}/> */}
                                    </div>
                                    <div>
                                        {GetComponent(ques, questionIndex)}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div style={{ flex: '1.5', marginLeft: "10px" }}>
                            <Box>
                                <TextField
                                    select
                                    value={ques.questionType ? ques.questionType : "Multiple choice"}
                                    onChange={handleSelectionChange(ques.questionType, questionIndex)}
                                    fullWidth
                                >
                                    {selectionList.map((opt, index) => {
                                        return <MenuItem value={opt}>{opt}</MenuItem>
                                    })}
                                </TextField>
                            </Box>
                        </div>
                    </AccordionSummary>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={() => deleteButton(questionIndex)}>
                            <DeleteForeverIcon fontSize='large' />
                        </IconButton>
                    </div>
                </Accordion>
            ))}
        </div>
    );
}

export default QuestionFormNew;
