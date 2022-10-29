import { createContext, useState } from "react";

const CarsContext = createContext();

const CarsContextProvider = ({ children }) => {

    const [myCars, setMyCars] = useState([
        { name: "RAV4 Prime", price: 53186, writeoff: 2, resaleValue: 0.8 },
        { name: "RAV4 Hybrid", price: 43236, writeoff: 4, resaleValue: 0.6 },
    ].map(c => ({ ...c, id: crypto.randomUUID() }))
    );

    const setCarPropWithId = (id, prop, val) => setMyCars(prev => {
        const newList = prev.map(car => {
            if (car.id === id) {
                const updatedCar = { ...car, [prop]: val };
                return updatedCar;
            }
            return car;
        })
        return newList;
    });

    const createNewCar = (car) => {
        const newCar = { ...car, id: crypto.randomUUID() };
        setMyCars(prev => prev.push(newCar));
        return newCar;
    };

    // for when myCars is object with structure [1]: {carobject}
    // const setCarPropWithId = (id, prop, val) => setMyCars(prev => {
    //     const updatedCar = { ...prev[id], [prop]: val };
    //     const updatedCars = { ...prev, [id]: updatedCar };
    //     return updatedCars;
    // });

    const [settings, setSettings] = useState({
        vat: 0.2,
        tax: 0.21,
        insuranceRatio: 0.02761
    });

    return (
        <CarsContext.Provider value={[myCars, setCarPropWithId, settings, setSettings]}>
            {children}
        </CarsContext.Provider>
    )
}

export { CarsContext, CarsContextProvider };