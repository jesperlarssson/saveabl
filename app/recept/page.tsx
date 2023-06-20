import Recipes from "@/components/section/Recipes";
import Section from "@/components/ui/Section";
import Title from "@/components/ui/Title";

const Recept = async () => {
  //TODO: Om inloggad, kolla vilka veckor denna prenumererar på och highlighta utfrån det.

  return (
    <Section className="pt-16">
      <Title>Recept</Title>

      <Recipes />
    </Section>
  );
};

export default Recept;
