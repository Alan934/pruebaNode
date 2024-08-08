export const ComoLoLogramosService ={
    getData : async () => {
        const response = await fetch('/json/dataLogramos.json')
        const data = await response.json()
        return data;
    }
}