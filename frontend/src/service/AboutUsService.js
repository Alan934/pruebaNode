export const AboutUsService ={
    getData : async () => {
        const response = await fetch('/json/dataAboutUs.json')
        const data = await response.json()
        return data;
    }
}