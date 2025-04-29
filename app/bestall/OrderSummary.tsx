import React from 'react';
import { 
  stockholmPostalCodes1,
  stockholmPostalCodes2,
  stockholmPostalCodes3,
  skanePostalCodes1,
  skanePostalCodes2,
  vastPostalCodes1,
  vastPostalCodes2,
  vastPostalCodes3,
  vastPostalCodes4,
  vastPostalCodes5,
  vastPostalCodes6,
  vastPostalCodes7,
 } from '@/lib/zipCodes';
import { useLang } from '@/hooks/useLang'; 

interface SelectedType {
  label: string;
}

interface SelectedVariant {
  label: string;
  productId: string;
}

interface SelectedDay {
  label: string;
}

interface OrderSummaryProps {
  selectedType: SelectedType;
  selectedVariant: SelectedVariant | string; 
  selectedDay: SelectedDay;
  postalCode: string | null;
  isDk: boolean;
  productTypes: any;
  lang: string; 
}

// Funktion för att kontrollera om varianten är en prenumeration
const isSubscription = (selectedVariant: SelectedVariant | string) => {
  if (typeof selectedVariant === 'object' && 'productId' in selectedVariant) {
    const subscriptionProductIds = [
      '934dc035-0cea-449a-8977-7b6778146c99', 
      '4914f47a-e297-404b-b336-b505b9deedb9', 
      'prod_PuDcXtmqgiYTAz', 
      'prod_PuDtIpxzTIo0Zu', 
      'prod_OjDodUaLk1sKL7', 
      'prod_OjDo2XfLRppIPa', 
      'prod_PdHycyUnOkL6TL', 
      'prod_QhdGye2ZZDVipp'
    ];
    return subscriptionProductIds.includes(selectedVariant.productId);
  }
  return false;
};

// Funktion för att hantera produktnamn och språk
const getProductName = (label: string, lang: string) => {
  if (lang === 'sv') {
    if (label === 'Family kit' || label === 'Familiekassen') return 'Familjekassen';
    if (label === 'Couple kit' || label === 'Sambokassen') return 'Sambokassen';
  } else if (lang === 'en') {
    if (label === 'Familjekassen' || label === 'Familiekassen') return 'Family kit';
    if (label === 'Sambokassen') return 'Couple kit';
  } else if (lang === 'da') {
    if (label === 'Familjekassen' || label === 'Family kit') return 'Familiekassen';
    if (label === 'Sambokassen' || label === 'Couple kit') return 'Sambokassen';
  }
  return label;
};

const getVariantName = (label: string, lang: string) => {
    const subscriptionTerms: { [key: string]: { [key: string]: string } } = {
        sv: {
            'Varje vecka': 'Varje vecka',
            'Varannan vecka': 'Varannan vecka',
            'Engångsköp': 'Engångsköp'
          },
          en: {
            'Every week': 'Every week',
            'Every other week': 'Every other week',
            'One time order': 'One time order'
          },
          da: {
            'Hver uge': 'Hver uge',
            'Hver anden uge': 'Hver anden uge',
            'Engangskøb': 'Engangskøb'
      }
    };
  
    if (subscriptionTerms[lang]) {
      return subscriptionTerms[lang][label] || label;
    }


  
    return label;
  };
  

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedType, selectedVariant, selectedDay, postalCode, isDk, productTypes }) => {
    const { lang, text } = useLang();
  // Funktionen för att hämta priset för Stockholm
  const getPriceForStockholm = () => {
    const productName = getProductName(selectedType.label, lang);
    
    if (productName === 'Familjekassen' || productName === 'Family kit' || productName === 'Familiekassen') {
      return isSubscription(selectedVariant) ? 649 : 719;
    } else if (productName === 'Sambokassen' || productName === 'Couple kit' || productName === 'Sambokassen') {
      return isSubscription(selectedVariant) ? 579 : 649;
    }
    return 0;
  };
  
  // Funktionen för att hämta priset för Danmark
  const getPriceForDenmark = () => {
    const productName = getProductName(selectedType.label, lang);
    
    if (productName === 'Familjekassen' || productName === 'Family kit' || productName === 'Familiekassen') {
      return isSubscription(selectedVariant) ? 529 : 599;
    } else if (productName === 'Sambokassen' || productName === 'Couple kit' || productName === 'Sambokassen') {
      return isSubscription(selectedVariant) ? 449 : 519;
    }
    return 0;
  };
  
  // Funktionen för att hämta priset för övriga regioner
  const getPriceForStages = () => {
    const productName = getProductName(selectedType.label, lang);
    
    if (productName === 'Familjekassen' || productName === 'Family kit' || productName === 'Familiekassen') {
      return isSubscription(selectedVariant) ? 599 : 659;
    } else if (productName === 'Sambokassen' || productName === 'Couple kit' || productName === 'Sambokassen') {
      return isSubscription(selectedVariant) ? 529 : 589;
    }
    return 0;
  };
  
  // Funktionen för att beräkna totalpriset
  const calculateTotalPrice = (postalCode: string | null) => {
    if (!postalCode) return getPriceForStages();

    if (
      stockholmPostalCodes1.includes(postalCode) ||
      stockholmPostalCodes2.includes(postalCode) ||
      stockholmPostalCodes3.includes(postalCode)
    ) {
      return getPriceForStockholm();
    } else if (isDk) {
      return getPriceForDenmark();
    } else if (
      skanePostalCodes1.includes(postalCode) ||
      skanePostalCodes2.includes(postalCode) ||
      vastPostalCodes1.includes(postalCode) ||
      vastPostalCodes2.includes(postalCode) ||
      vastPostalCodes3.includes(postalCode) ||
      vastPostalCodes4.includes(postalCode) ||
      vastPostalCodes5.includes(postalCode)||
      vastPostalCodes6.includes(postalCode)||
      vastPostalCodes7.includes(postalCode)
    ) {
      return getPriceForStages();
    } else {
      return getPriceForStages();
    }
  };
  
  const totalPrice = calculateTotalPrice(postalCode);

  // --- NYTT: Lägg till fraktkostnad beroende på land ---
  const shippingCost = isDk ? 49 : 79;


  return (
    <><div className="order-summary border-2 border-[#6E2936] p-4 rounded-lg mt-6 mx-auto max-w-full sm:max-w-[500px]">
          <h3 className="text-lg font-bold mb-2 text-[#6E2936]">{text.order.summaryTitle}</h3>
          <p className="text-[#6E2936]"><strong>{text.order.mealKit}:</strong> {getProductName(selectedType.label, lang)}</p>
          <p className="text-[#6E2936]"><strong>{text.order.frequency}:</strong> {getVariantName(typeof selectedVariant === 'string' ? selectedVariant : selectedVariant.label, lang)}</p>
          <p className="text-[#6E2936]"><strong>{text.order.deliveryDaysummary}:</strong> {selectedDay.label}</p>
          <p className="text-[#6E2936]"><strong>{text.order.totalPrice}:</strong> {totalPrice} kr + {shippingCost} kr {text.order.shipping}</p>
          <p className="text-[#6E2936] text-md mt-2">
  {text.order.discountNote}
</p>
      </div><style jsx>{`
@media (max-width: 640px) {
  .order-summary {
    max-width: 92%;
    margin-left: auto;
    margin-right: auto;
  }
}
`}</style></>

  );
};

export default OrderSummary;
