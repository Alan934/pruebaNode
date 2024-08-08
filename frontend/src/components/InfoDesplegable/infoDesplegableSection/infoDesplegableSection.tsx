'use client'

import InfoDesplegableComponent from "../InfoDesplegableComponent/infoDesplegableComponent";
import { useGetDataBySeccionQuery } from "@/redux/services/desplegableApi";

interface Item {
    tituloItem: string;
    subTituloItem: string;
    urlImagenItem?: string; // URL opcional
}

interface Desplegable {
    textoDesplegable: string;
    items: Item[];
}

interface Data {
    idSeccionDesplegable: number;
    desplegables: Desplegable[];
}

interface Props {
    idSeccion: number;
}

const InfoDesplegableSection: React.FC<Props> = ({ idSeccion }) => {
    const { data, error, isLoading, isFetching } = useGetDataBySeccionQuery(idSeccion);

    if (isLoading || isFetching) return <p>Cargando...</p>;
    if (error) return <p>Error</p>;

    return (
        <div>
            {data?.desplegables.map((desplegable, index) => (
                <div key={index} className="my-4 max-w-2xl mx-auto tablet:max-w-5xl">
                    <InfoDesplegableComponent
                        title={desplegable.textoDesplegable}
                        items={desplegable.items} // Aquí ya está en el formato correcto
                    />
                </div>
            ))}
        </div>
    );
}

export default InfoDesplegableSection;
