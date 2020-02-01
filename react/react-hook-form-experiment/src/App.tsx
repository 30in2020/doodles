import * as React from "react";
import { useForm, ErrorMessage, OnSubmit } from "react-hook-form";
import * as yup from "yup";
import { Text, Select, Box, Input, Button } from "@chakra-ui/core";

enum GENDER {
  MALE,
  FEMALE
}

type FormData = {
  name: string;
  age: number;
  gender: GENDER;
};

const formSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup
    .number()
    .required()
    .positive()
    .integer()
});

const defaultValues = {
  name: "",
  age: 0,
  gender: GENDER.MALE
};

export default function App() {
  const onSubmit = ({ name, age, gender }: any) => {
    console.log(name, age, gender);
  };

  return (
    <Box maxW="md" m="6" p="6" border="1px solid #e1e1e1" rounded="lg">
      <Form defaultValues={defaultValues} onSubmit={onSubmit}>
        <Text mb="8px">Name</Text>
        <InputComp name="name" />

        <Text mb="8px">Age</Text>
        <InputComp name="age" />

        <Text mb="8px">Gender</Text>
        <SelectComp name="gender" options={[GENDER.MALE, GENDER.FEMALE]}>
          <option value={GENDER.MALE}>male</option>
          <option value={GENDER.FEMALE}>female</option>
        </SelectComp>

        <Button type="submit" variantColor="teal" variant="solid">
          Submit
        </Button>
      </Form>
    </Box>
  );
}

const Form: React.FC<{
  defaultValues: object;
  onSubmit: OnSubmit<FormData>;
  children: React.ReactNode;
}> = ({ defaultValues, children, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues,
    validationSchema: formSchema,
    submitFocusError: true
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child: any) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name
                  }
                })
              : child;
          })
        : children}
      <pre>{errors && JSON.stringify(errors)}</pre>
    </form>
  );
};

const InputComp: React.FC<{
  register?: React.Ref<HTMLInputElement>;
  name: string;
}> = ({ register, name, ...rest }) => {
  return (
    <Input name={name} ref={register} width="92%" variant="outline" {...rest} />
  );
};

const SelectComp: React.FC<{
  register?: React.Ref<HTMLSelectElement>;
  name: string;
  options: Array<any>;
}> = ({ register, options, name, ...rest }) => {
  return (
    <Select variant="filled" mb="8px" name={name} ref={register} {...rest}>
      {options.map(value => (
        <option value={value}>{value}</option>
      ))}
    </Select>
  );
};
