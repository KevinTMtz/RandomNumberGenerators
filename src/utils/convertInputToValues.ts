import { GeneratorValues, InputValues } from '../Interfaces/data/types';

export const convertInputToValues = (data: InputValues[]) => {
  const transformedData: GeneratorValues[] = [];

  data.forEach((valuesObj) => {
    const newObj: { [key: string]: number | undefined } = {};

    Object.keys(valuesObj).forEach((key) => {
      const value = (valuesObj as any)[key];

      if (value === '') return;

      newObj[key] = Number(value);
    });

    transformedData.push(newObj);
  });

  return transformedData;
};
