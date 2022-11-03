const updateObjectPropertyInListById = (list, id, prop, val) => {
    const newList = list.map(obj => {
        if (obj.id === id) {
            const updatedCar = { ...obj, [prop]: val };
            return updatedCar;
        }
        return obj;
    })
    return newList;
};

export default updateObjectPropertyInListById;