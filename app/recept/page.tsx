import Recipes from "@/components/section/Recipes";
import Section from "@/components/ui/Section";

const Recept = async () => {
  //TODO: Om inloggad, kolla vilka veckor denna prenumererar på och highlighta utfrån det.



  return (
    <Section className="pt-16">
      <h1 className="font-bold font-poppins text-secondary text-5xl ">
        Recept
      </h1>

      <Recipes />
      
    </Section>
  );
};

export default Recept;
