// export const formatDate = (isoString: string): string => {
//   const date = new Date(isoString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Usa 'UTC' para evitar la conversión de zona horaria
  return date.toLocaleDateString("es-ES", { timeZone: "UTC" });
};
