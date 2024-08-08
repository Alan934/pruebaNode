

export const ValoresService ={
    getData : async () => {
        const response = await fetch('/json/dataValores.json')
        const data = await response.json()
        return data;
    }
}