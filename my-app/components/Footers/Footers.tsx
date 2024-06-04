import React from "react";
import Socila from "./Socila";

export default function Footers() {
  const collections = [
    { name: "Collection 1" },
    { name: "Collection 2" },
    { name: "Collection 3" },
    { name: "Collection 4" },
    { name: "Collection 5" },
    { name: "Collection 6" },
  ];
  const informations = [
    { name: "Informations 1" },
    { name: "Informations 2" },
    { name: "Informations 3" },
    { name: "Informations 4" },
    { name: "Informations 5" },
    { name: "Informations 6" },
  ];

  return (
    <div className=" h-full border-t justify-center items-center bg-border px-20 relative">
      <div className="flex w-full mt-10">
        {/* About us */}
        <div className="w-[30%] p-4">
          <h1 className="font-bold text-primary mb-4">About us</h1>
          <p className="text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, ...
          </p>
        </div>

        {/* Fiscal Informations */}
        <div className="w-[40%] p-4">
          <h1 className="font-bold text-primary mb-4">Fiscal Informations</h1>
          <ul className="text-muted-foreground">
            <li> TECHNOVA SOLUTIONS</li>
            <br />
            <li>LTD N° Registre du Commerce : 987654 - CASABLANCA.</li>
            <li>Taxe professionnelle : 12345678.</li>
            <li>Numéro d’affiliation à la CNSS : 9876543.</li>
            <li>Identifiant Fiscal (IF) : 19283746.</li>
            <li>Identifiant commun de l’entreprise (ICE) : 003456789123456.</li>
            <br />
            <li>
              Adresse : BUREAU 12, ÉTAGE 3, IMM 123, RUE DE LA LIBERTÉ,
              CASABLANCA.
            </li>
          </ul>
        </div>

        {/* Informations */}
        <div className="w-[15%] p-4">
          <h1 className="font-bold text-primary mb-4">Informations</h1>
          <ul>
            {informations.map((information) => (
              <li key={information.name} className="text-muted-foreground cursor-pointer hover:text-cyan-400 ease-out duration-200 my-2">
                {information.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Popular collections */}
        <div className="w-[15%] p-4">
          <h1 className="font-bold text-primary mb-4">Popular Collections</h1>
          <ul>
            {collections.map((collection) => (
              <li key={collection.name} className="text-muted-foreground cursor-pointer hover:text-cyan-400 ease-out duration-200 my-2">
                {collection.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Socila />
    </div>
  );
}
