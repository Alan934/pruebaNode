

export const EquipoService ={
    getData : async () => {
        const response = await fetch('/json/dataEquipos.json')
        const data = await response.json()
        return data;
    }
}