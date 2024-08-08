export const NuestrosProductosService ={
    getData:async () => {
        const response = await fetch('/json/dataNuestrosProductos.json');
        const data= await response.json();
        return data;
    }
}