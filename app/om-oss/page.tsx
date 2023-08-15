import Image from "next/image";

import Section from "@/components/ui/Section";
import TextAndImage from "@/components/ui/TextAndImage";
import { getAllFAQ } from "@/lib/hygraph";
import Accordion from "@/components/ui/Accordion";

const OmOss = async ({ params: { lang } }: { params: { lang: any } }) => {
  const faqs = await getAllFAQ();
  const about_us = {
    title: "Räddningsbar, något som går att rädda",
    description:
      "På Saveabl. identifierar vi systematiskt svinn hos producenter och grossister, och gör en färdig matkasse baserad på det som behöver räddas! Vår matkasse finns i det magiska gränslandet mellan en traditionell matkasse och färdig hämtmat. Utöver klimatfrågan tror vi starkt på smidighet och har därför tagit fram en matkasse som är klar på 15 minuter. Otroligt smidigt och otroligt gott!",
    sections: [
      {
        title: "Vilka vi är",
        text: "Här uppstod den första idén till det som skulle komma att bli Saveabl. Jeroen och Alexander frågade sig om de skulle kunna göra det ännu lättare för kunder att rädda bra mat från att slängas. Problemet de såg var att det var lite svårt att veta vad man skulle göra med den maten som fanns på Matsmart, det fanns begränsat med varor och killarnas lösning skulle vara att koppla ihop en av de nya matbutikernas sortiment med Matsmart. Kunden skulle enkelt kunna lägga in sin inköpslista och de varor som fanns på matsmart, och det som inte fanns där, skulle kompletteras med varor från ex Coops online butik! Grymt tyckte Jeroen och Alexander! Problemet de såg var att det var lite svårt att veta vad man skulle göra.",
      },
      {
        title: "Vår matkasse",
        text: "Här uppstod den första idén till det som skulle komma att bli Saveabl. Jeroen och Alexander frågade sig om de skulle kunna göra det ännu lättare för kunder att rädda bra mat från att slängas. Problemet de såg var att det var lite svårt att veta vad man skulle göra med den maten som fanns på Matsmart, det fanns begränsat med varor och killarnas lösning skulle vara att koppla ihop en av de nya matbutikernas sortiment med Matsmart. Kunden skulle enkelt kunna lägga in sin inköpslista och de varor som fanns på matsmart, och det som inte fanns där, skulle kompletteras med varor från ex Coops online butik! Grymt tyckte Jeroen och Alexander! Problemet de såg var att det var lite svårt att veta vad man skulle göra.",
      },
      {
        title: "Räddad mat",
        text: "Här uppstod den första idén till det som skulle komma att bli Saveabl. Jeroen och Alexander frågade sig om de skulle kunna göra det ännu lättare för kunder att rädda bra mat från att slängas. Problemet de såg var att det var lite svårt att veta vad man skulle göra med den maten som fanns på Matsmart, det fanns begränsat med varor och killarnas lösning skulle vara att koppla ihop en av de nya matbutikernas sortiment med Matsmart. Kunden skulle enkelt kunna lägga in sin inköpslista och de varor som fanns på matsmart, och det som inte fanns där, skulle kompletteras med varor från ex Coops online butik! Grymt tyckte Jeroen och Alexander! Problemet de såg var att det var lite svårt att veta vad man skulle göra.",
      },
      {
        title: "Vår klimatinsats",
        text: "Här uppstod den första idén till det som skulle komma att bli Saveabl. Jeroen och Alexander frågade sig om de skulle kunna göra det ännu lättare för kunder att rädda bra mat från att slängas. Problemet de såg var att det var lite svårt att veta vad man skulle göra med den maten som fanns på Matsmart, det fanns begränsat med varor och killarnas lösning skulle vara att koppla ihop en av de nya matbutikernas sortiment med Matsmart. Kunden skulle enkelt kunna lägga in sin inköpslista och de varor som fanns på matsmart, och det som inte fanns där, skulle kompletteras med varor från ex Coops online butik! Grymt tyckte Jeroen och Alexander! Problemet de såg var att det var lite svårt att veta vad man skulle göra.",
      },
    ],
    faq: "Vanliga frågor",
  };
  return (
    <>
      <div className="relative">
        <Image
          src="/images/narodlat.webp"
          alt="Teamet bakom Saveabl."
          width={1920}
          height={1080}
          className="object-cover w-full h-full absolute left-0 top-0"
        />
        <Section className="bg-black bg-opacity-30">
          <div className="max-w-xl mx-auto flex flex-col gap-3 ">
            <h1 className="text-4xl font-semibold text-white">
              Saveabl.{" "}
              <span className="text-lg font-normal ">{about_us?.title}</span>{" "}
              <span className="text-sm text-green-400 italic">Adj.</span>
            </h1>
            <p className=" text-white">{about_us?.description}</p>
          </div>
        </Section>
      </div>
      <Section className="hidden sm:block bg-primary-500 bg-opacity-20 py-10 ">
        <div className="flex flex-wrap gap-4 max-w-3xl mx-auto justify-between  ">
          <a
            href="#vilka-vi-ar"
            className="text-secondary font-semibold flex flex-col gap-4 justify-center items-center group cursor-pointer"
          >
            <div className="w-16 h-16  md:w-24 md:h-24 p-2 md:p-4  rounded-2xl bg-primary flex justify-center items-center transition group-hover:-translate-y-2 group-hover:drop-shadow-lg ">
              <Image
                alt="Vanliga frågor"
                src={"/images/illustrations/group.png"}
                width={60}
                height={50}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-sm md:text-base">{about_us.sections[0].title}</p>
          </a>
          <a
            href="#var-matkasse"
            className="text-secondary font-semibold flex flex-col gap-4 justify-center items-center group cursor-pointer"
          >
            <div className="w-16 h-16  md:w-24 md:h-24 p-2 md:p-4 rounded-2xl bg-primary flex justify-center items-center transition group-hover:-translate-y-2 group-hover:drop-shadow-lg ">
              <Image
                alt="Vanliga frågor"
                src={"/images/illustrations/kasse.png"}
                width={50}
                height={60}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-sm md:text-base">{about_us.sections[1].title}</p>
          </a>
          <a
            href="#raddad-mat"
            className="text-secondary font-semibold flex flex-col gap-4 justify-center items-center group cursor-pointer"
          >
            <div className="w-16 h-16  md:w-24 md:h-24 p-2 md:p-4 rounded-2xl bg-primary flex justify-center items-center transition group-hover:-translate-y-2 group-hover:drop-shadow-lg">
              <Image
                alt="Vanliga frågor"
                src={"/images/illustrations/saved-carrot.png"}
                width={50}
                height={60}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-sm md:text-base">{about_us.sections[2].title}</p>
          </a>
          <a
            href="#var-klimatinsats"
            className="text-secondary font-semibold flex flex-col gap-4 justify-center items-center group cursor-pointer"
          >
            <div className="w-16 h-16  md:w-24 md:h-24 p-2 md:p-4 rounded-2xl bg-primary flex justify-center items-center transition group-hover:-translate-y-2 group-hover:drop-shadow-lg ">
              <Image
                alt="Vanliga frågor"
                src={"/images/illustrations/climate.png"}
                width={50}
                height={60}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-sm md:text-base">{about_us.sections[3].title}</p>
          </a>
          <a
            href="#vanliga-fragor"
            className="text-secondary font-semibold flex flex-col gap-4 justify-center items-center group cursor-pointer"
          >
            <div className="w-16 h-16  md:w-24 md:h-24 p-2 md:p-4 rounded-2xl bg-primary flex justify-center items-center transition group-hover:-translate-y-2 group-hover:drop-shadow-lg">
              <Image
                alt="Vanliga frågor"
                src={"/images/illustrations/faq.png"}
                width={60}
                height={50}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-sm md:text-base">{about_us.faq}</p>
          </a>
        </div>
      </Section>
      <TextAndImage
        anchorId="vilka-vi-ar"
        className="pt-10"
        title={about_us.sections[0].title}
        text={about_us.sections[0].text}
        imageUrl="/images/team.webp"
      />
      <TextAndImage
        anchorId="var-matkasse"
        reverse
        title={about_us.sections[1].title}
        text={about_us.sections[1].text}
        imageUrl="/images/product-2.jpg"
      />
      <TextAndImage
        anchorId="raddad-mat"
        title={about_us.sections[2].title}
        text={about_us.sections[2].text}
        imageUrl="/images/carrots-in-hand.png"
      />
      <TextAndImage
        reverse
        anchorId="var-klimatinsats"
        className="pb-10"
        title={about_us.sections[3].title}
        text={about_us.sections[3].text}
        imageUrl="/images/green-landscape.png"
      />
      <div id="vanliga-fragor">
        <Accordion faqs={faqs} title={about_us.faq} />
      </div>
    </>
  );
};

export default OmOss;
