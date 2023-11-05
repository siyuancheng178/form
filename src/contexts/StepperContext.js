import { createContext, useContext, useState } from "react";

const StepperContext = createContext({ userData: "", setUserData: null });

export function UseContextProvider({ children }) {
  const [userData, setUserData] = useState({
    finRatiosOptions: [{value: 'Apple', selected: false}, {value: 'Pear', selected: false}, {value: 'Orange', selected: false}],
    news: [{title: "Card1", description: "description1", selected: false},
      {title: "Card2", description: "description2", selected: false},
      {title: "Card3", description: "description3", selected: false}],
    companyOptions: []
  });

  return (
    <StepperContext.Provider value={{ userData, setUserData }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { userData, setUserData } = useContext(StepperContext);

  return { userData, setUserData };
}
