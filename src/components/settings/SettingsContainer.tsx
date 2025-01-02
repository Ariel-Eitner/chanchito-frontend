"use client";

import { useState } from "react";
import SettingsNav from "./SettingsNav";
// import UserProfile from "./UserProfile";
import AccountSettings from "./AccountSettings";
// import { CreateUserDto } from "@/services/users/dto/createUserDto";

// const userDataMock: CreateUserDto = {
//   firstName: "Juan Pérez",
//   email: "juan.perez@example.com",
//   isActive: true,
//   password: "hola",

//   // profileCompleted: false,
// };

const SettingsContainer = () => {
  const [selectedOption, setSelectedOption] = useState("Perfil");

  const renderContent = () => {
    switch (selectedOption) {
      case "Cuenta":
        return <AccountSettings />;
      // case "Perfil":
      // return <UserProfile userData={userDataMock} />;
      case "Preferencias":
        return <div className="text-black">Preferencias (en construcción)</div>;
      case "Facturas":
        return <div className="text-black">Facturas (en construcción)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-black">Configuración</h1>
      <SettingsNav
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
      />
      {renderContent()}
    </div>
  );
};

export default SettingsContainer;
