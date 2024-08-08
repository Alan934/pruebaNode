export const ListadoService ={
    getData : async () => {
        const response = await fetch('/json/dataAreaColaboracion.json')
        const data = await response.json()
        return data;
    }
}