export type ConversionType = "Length" | "Weight" | "Temperature" | "Currency";

export const convertValue = (
  value: string,
  type: ConversionType,
  fromUnit: string,
  toUnit: string,
): string => {
  const num = parseFloat(value);
  if (isNaN(num)) return "";

  if (type === "Temperature") {
    let celsius = 0;
    // Convert everything to Celsius first
    if (fromUnit === "Celsius") celsius = num;
    else if (fromUnit === "Fahrenheit") celsius = ((num - 32) * 5) / 9;
    else if (fromUnit === "Kelvin") celsius = num - 273.15;

    // Convert from Celsius to Target
    if (toUnit === "Celsius") return celsius.toFixed(2);
    if (toUnit === "Fahrenheit") return ((celsius * 9) / 5 + 32).toFixed(2);
    if (toUnit === "Kelvin") return (celsius + 273.15).toFixed(2);
    return num.toString();
  }

  if (type === "Currency") {
    const currencyRates: Record<string, number> = {
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      NGN: 1500,
    };
    if (!currencyRates[fromUnit] || !currencyRates[toUnit]) return "";

    // Convert source to USD base, then multiply by target rate
    const baseInUSD = num / currencyRates[fromUnit];
    const result = baseInUSD * currencyRates[toUnit];

    return result.toFixed(2);
  }

  // Length base unit: Meters
  const lengthRates: Record<string, number> = {
    Meters: 1,
    Kilometers: 1000,
    Centimeters: 0.01,
    Miles: 1609.34,
    Feet: 0.3048,
  };

  // Weight base unit: Grams
  const weightRates: Record<string, number> = {
    Grams: 1,
    Kilograms: 1000,
    Pounds: 453.592,
    Ounces: 28.3495,
  };

  const rates = type === "Length" ? lengthRates : weightRates;
  if (!rates[fromUnit] || !rates[toUnit]) return "";

  const baseValue = num * rates[fromUnit];
  const result = baseValue / rates[toUnit];

  return result.toFixed(4).replace(/\.?0+$/, "");
};

