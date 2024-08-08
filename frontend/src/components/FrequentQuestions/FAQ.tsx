'use client';
import { useEffect, useState } from 'react';
import BotonDesplegable from '@/components/BotonDesplegable/botonDesplegable';
import { FaqService } from '@/service/FaqService';
import { lexend } from "@/app/fonts";
import OrangeButton from '../OrangeButton/OrangeButton';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const scrollToForm = () => {
    const formElement = document.getElementById('contactForm'); // ID del formulario
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const data = await FaqService.getData();
        setFaqData(data);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchFAQData();
  }, []);

  const toggleAnswer = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 tablet:max-w-5xl">
      <h2 className={`text-slate-950 text-2xl font-semibold leading-loose mb-8 ml-9 mr-24  ${lexend.className}`}>
        Preguntas Frecuentes
      </h2>
      {faqData.map((item: FAQItem, index: number) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mx-8">
            <p
              className={`text-m font-normal text-slate-950 leading-snug cursor-pointer ${lexend.className}`}
              onClick={() => toggleAnswer(index)}
            >
              {item.question}
            </p>
            <BotonDesplegable
              onClick={() => toggleAnswer(index)}
              mostrarInfo={expandedIndex === index}
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden mx-8 tablet:mx-4 ${expandedIndex === index
              ? 'max-h-[1000px] opacity-100'
              : 'max-h-0 opacity-0'
              }`}
          >
            <p className="p-4 text-sm text-black">{item.answer}</p>
          </div>
          <hr className="border-t-2 border-gray-300 my-4 mx-8 tablet:mx-4" />
        </div>
      ))}
      <div className="flex items-center justify-center">
        <div className="w-[233px] h-28 flex flex-col justify-center items-center gap-4 mt-9 mx-16">
          <div className="flex flex-col justify-start items-center gap-1">
          <div className={`text-center text-slate-950 text-sm font-normal leading-snug ${lexend.className}`}>¿No encontraste lo que buscabas?</div>
          <div className={`text-center text-slate-950 text-base font-semibold leading-normal ${lexend.className}`}>¡Nosotros te ayudamos!</div>
          </div>
          <OrangeButton text="Contactanos" onClick={scrollToForm}
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
