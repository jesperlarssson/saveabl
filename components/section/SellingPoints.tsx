import React from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import matkasseAnimation from "../../public/anim/Matkasse.json";
import LottieAnimation from "../ui/LottieAnimation";

const SellingPoints = () => {
  return (
    <Section className="bg-secondary">
       
      <div className="w-full grid grid-cols-3 gap-8">
        <Card className="text-center" clickable>
          <h3 className="font-poppins text-2xl font-semibold">Vi lagar maten åt dig</h3>
          <p>
            Vi tar fram recept på råvaror som ser lite tokiga ut, sedan gör vi
            de svåra och tidskrävande momenten i matlagningen åt dig!
          </p>
        </Card>
      </div>
    </Section>
//     <Section className="bg-secondary pt-36">
//     <div className="w-full grid grid-cols-3 gap-8">
//       <Card className="text-center" clickable>
//         <h3 className="font-poppins text-2xl font-semibold">Vi lagar maten åt dig</h3>
//         <p>
//           Vi tar fram recept på råvaror som ser lite tokiga ut, sedan gör vi
//           de svåra och tidskrävande momenten i matlagningen åt dig!
//         </p>
//       </Card>
//     </div>
//   </Section>
  );
};

export default SellingPoints;
