export const fetchData = async (url, option) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}