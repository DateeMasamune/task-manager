export const checkAllValues = (filedsValues: any) => Object.keys(filedsValues).some((key) => filedsValues[key] === '') || !Object.keys(filedsValues)?.length;
