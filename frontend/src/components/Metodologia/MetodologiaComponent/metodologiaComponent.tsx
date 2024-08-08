import { lexend } from "@/app/fonts"

interface MetodologiaData {
    title: string;
    items: string[];
  }

const MetodologiaComponent: React.FC<MetodologiaData> = ({title, items}) => {
    return (
        <div className="movil:w-80 tablet:w-[698px] laptop:w-[543px] h-auto justify-start gap-0.5 inline-flex">
            <div className="w-auto flex-col justify-center items-center inline-flex">
                <div className="w-[84px] h-[84px] flex justify-center items-center rounded-full border-4 border-blue-600">
                    <div className={`w-[70px] h-[60px] flex justify-center items-center text-center text-blue-950 text-sm font-normal movil:leading-snug laptop:leading-none overflow-wrap-anywhere ${lexend.className}`}>
                        {title}
                    </div>
                </div>
            </div>
            <div className="grow shrink basis-0 flex items-start">
                <div className={`text-slate-950 text-sm font-medium leading-5 mt-2 ml-2 laptop:ml-0 ${lexend.className}`}>
                {items.length > 1 ? (
                        <ul className="list-disc pl-5">
                            {items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{items[0]}</p>
                    )}
                </div>
            </div>
        </div>
    )
  }
  
  export default MetodologiaComponent