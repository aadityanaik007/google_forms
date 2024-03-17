import React from 'react'
import { FormControlLabel, Input, Radio, RadioGroup, Typography } from '@mui/material';
import { useGlobalContext } from '../GlobalFormList';


const MulitpleChoice = (ques,questionIndex) => {
    console.log("ques:  ",ques);
const { questions, setQuestions} = useGlobalContext();

const handleChange = (event, questionIndex, optionIndex) => {
    event.stopPropagation(); // Stop event propagation to prevent it from being triggered twice
    const updatedQuestions = questions.map((question, qIndex) => {
        if (qIndex === questionIndex) {
            return {
                ...question,
                options: question.options.map((option, oIndex) => ({
                    ...option,
                    selected: oIndex === optionIndex
                }))
            };
        } else {
            return question;
        }
    });
    setQuestions(updatedQuestions);
};

  return (
    <RadioGroup
        value={ques.options.find(option => option.selected)?.optionText || ''}
    >
        {ques.options.map((op, optionIndex) => (
            <div key={optionIndex}>
                <div>
                    <FormControlLabel
                        value={op.optionText}
                        control={<Radio style={{ marginRight: '3px' }} />}
                        
                        label={<Typography style={{ color: '#555555' }}><Input style={{width:"100%"}} defaultValue={op.optionText}/></Typography>}
                        onChange={(event) => handleChange(event, questionIndex, optionIndex)}
                    />
                </div>
            </div>
        ))}
    </RadioGroup>
  )
}

export default MulitpleChoice