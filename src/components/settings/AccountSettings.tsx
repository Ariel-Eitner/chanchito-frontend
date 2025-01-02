import React, { useState } from "react";
import AccountInfo from "./AccountInfo";
import Security from "./Security";
import AccountActivity from "./AccountActivity";
import DeleteAccount from "./DeleteAccount";

export default function AccountSettings() {
  const [currentSection, setCurrentSection] = useState("accountInfo");

  const renderSection = () => {
    switch (currentSection) {
      case "accountInfo":
        return <AccountInfo />;
      case "security":
        return <Security />;
      case "accountActivity":
        return <AccountActivity />;
      case "deleteAccount":
        return <DeleteAccount />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto bg-white">
      <div className="flex flex-col md:flex-row">
        <nav className="md:w-1/4 mb-4 md:mb-0">
          <ul>
            <li>
              <button
                className={`py-2 px-4 text-left w-full text-black ${
                  currentSection === "accountInfo"
                    ? "bg-gray-200 font-bold"
                    : ""
                }`}
                onClick={() => setCurrentSection("accountInfo")}
              >
                Información de la Cuenta
              </button>
            </li>
            <li>
              <button
                className={`py-2 px-4 text-left w-full text-black ${
                  currentSection === "security" ? "bg-gray-200 font-bold" : ""
                }`}
                onClick={() => setCurrentSection("security")}
              >
                Seguridad
              </button>
            </li>
            <li>
              <button
                className={`py-2 px-4 text-left w-full text-black ${
                  currentSection === "accountActivity"
                    ? "bg-gray-200 font-bold"
                    : ""
                }`}
                onClick={() => setCurrentSection("accountActivity")}
              >
                Actividad de la Cuenta
              </button>
            </li>
            <li>
              <button
                className={`py-2 px-4 text-left w-full text-black ${
                  currentSection === "deleteAccount"
                    ? "bg-gray-200 font-bold"
                    : ""
                }`}
                onClick={() => setCurrentSection("deleteAccount")}
              >
                Eliminar Cuenta
              </button>
            </li>
          </ul>
        </nav>
        <div className="md:w-3/4">{renderSection()}</div>
      </div>
    </div>
  );
}
