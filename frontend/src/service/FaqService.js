export const FaqService ={
    getData:async () => {
        const response = await fetch('/json/dataFaq.json');
        const data= await response.json();
        return data;
    }
}