export const getItem = key => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (e) {
        console.log("Error in getting data from localStorage");
        return null;
    }
}

export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("Error in setting data to local storage");
    }
}