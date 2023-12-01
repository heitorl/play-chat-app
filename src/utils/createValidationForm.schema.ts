import * as yup from "yup";

interface Input {
  name: string;
  validation?: (value: any) => yup.AnySchema;
  required?: boolean;
}

export const createValidationSchemaUtil = (inputs: Input[]) => {
  const validationSchema: { [key: string]: yup.AnySchema } = {};

  inputs.forEach((input) => {
    const { name, validation, required } = input;

    validationSchema[name] = yup.lazy((value) => {
      if (validation && typeof validation === "function") {
        return validation(value) as yup.AnySchema;
      }

      if (required) {
        return yup.string().required("Campo obrigatório!");
      }

      return yup.string();
    });
  });

  return yup.object().shape(validationSchema);
};
