export const formatToCurrency = (
  value: number | string,
  locale: string = "es-AR",
  currency: string = "ARS"
): string => {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numberValue)) {
    return "Valor inválido";
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(numberValue);
};

export const formatAmountInCents = (amountInCents: number): string => {
  return formatToCurrency(amountInCents / 100);
};
