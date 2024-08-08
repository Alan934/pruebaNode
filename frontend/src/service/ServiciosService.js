export const ServiciosService ={
    getData:async () => {
        const response = await fetch('/json/dataServicios.json');
        const data= await response.json();
        return data;
    }
}