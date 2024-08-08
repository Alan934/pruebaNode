export const MetodologiaService ={
    getData : async () => {
        const response = await fetch('/json/dataMetodologia.json')
        const data = await response.json()
        return data;
    }
}