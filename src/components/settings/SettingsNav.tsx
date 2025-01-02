interface SettingsNavProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const SettingsNav: React.FC<SettingsNavProps> = ({
  selectedOption,
  onSelectOption,
}) => {
  const options = ["Cuenta", "Perfil", "Preferencias", "Facturas"];

  return (
    <div className="flex space-x-4 mb-6">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelectOption(option)}
          className={`py-2 px-4 rounded ${
            selectedOption === option
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SettingsNav;
