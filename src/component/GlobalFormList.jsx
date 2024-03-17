// GlobalContext.js
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [questions, setQuestions] = useState({"1":{
            key: '1',
            questionText: "Which is the capital city of Maharashtra?",
            questionType: "Multiple choice",
            options: [
                { optionText: "Bengaluru", selected: true },
                { optionText: "Mumbai", selected: false },
                { optionText: "Chennai", selected: false },
                { optionText: "Delhi", selected: false },
            ],
            open: true,
            required: true
        },
        "2":{
            key: '2',
            questionText: "Which is the capital city of Karnataka?",
            questionType: "Multiple choice",
            options: [
                { optionText: "Bengaluru", selected: false },
                { optionText: "Mumbai", selected: true },
                { optionText: "Chennai", selected: false },
                { optionText: "Delhi", selected: false },
            ],
            open: true,
            required: true
        }
      });

  // const updateDataList = (newList) => {
  //   setQuestions(newList);
  // };

  return (
    <GlobalContext.Provider value={{ questions, setQuestions }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);