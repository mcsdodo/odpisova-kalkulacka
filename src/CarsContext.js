import { createContext, useState } from "react";

const CarsContext = createContext();

const CarsContextProvider = ({ children }) => {

    const [myCars, setMyCars] = useState(Object.assign({}, [
        { name: "RAV4 Prime", price: 53186, writeoff: 2, resaleValue: 0.8 },
        { name: "RAV4 Hybrid", price: 43236, writeoff: 4, resaleValue: 0.6 },
    ]));

    return <CarsContext.Provider value={[myCars, setMyCars]}>
        {children}
    </CarsContext.Provider>
}

export { CarsContext, CarsContextProvider };