import Image from "next/image";

import Section from "@/components/ui/Section";

const OmOss = () => {
  return (
    <>
      <div>
        <Image
          src="/images/team.webp"
          alt="Teamet bakom Saveabl."
          width={1920}
          height={1080}
          className="object-contain w-full h-96"
        />
      </div>
      <Section>
        <h1>Om Saveabl.</h1>
      </Section>
    </>
  );
};

export default OmOss;
