export const expectValidError = (key: string, errors: any) => key in errors && errors[key]?.message !== '';
