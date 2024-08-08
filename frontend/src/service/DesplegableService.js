export const DesplegableService ={
    getData : async () => {
        const response = await fetch('/json/dataDesplegable.json')
        const data = await response.json()
        return data;
    }
}