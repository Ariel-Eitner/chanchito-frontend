import { useUsers } from "@/hooks/useUser";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

const UserProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  useUsers();
  return (
    <div className="bg-white shadow-md rounded-lg ">
      <h2 className="text-2xl font-semibold mb-4 text-black">
        Perfil de Usuario
      </h2>

      <div className="mb-4">
        <label className="block font-medium text-black">Nombre:</label>
        <p className="text-gray-700">{user?.firstName || "No especificado"}</p>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-black">Email:</label>
        <p className="text-gray-700">{user?.email}</p>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-black">
          Estado de la Cuenta:
        </label>
        <p
          className={`text-sm font-semibold text-black ${
            user?.isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {user?.isActive ? "Verificado" : "No verificado"}
        </p>
      </div>

      <button
        // onClick={handleEditProfile}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Editar Perfil
      </button>
    </div>
  );
};

export default UserProfile;
