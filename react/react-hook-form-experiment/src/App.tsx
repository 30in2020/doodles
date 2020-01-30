import * as React from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, errors } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues,
    validationSchema: formSchema,
    submitFocusError: true
  });
  const onSubmit = handleSubmit(({ name, age, gender }) => {
    console.log(name, age, gender);
  });

  return (
    <Box maxW="md" m="6" p="6" border="1px solid #e1e1e1" rounded="lg">
      <form onSubmit={onSubmit}>
        <Box pb="6">
          <Text mb="8px">Name</Text>
          <Input
            width="92%"
            variant="outline"
            placeholder="Name"
            name="name"
            ref={register}
          />
          <Text mb="8px">Age</Text>
          <Input
            width="92%"
            variant="outline"
            placeholder="Age"
            name="age"
            ref={register}
          />
          <Text mb="8px">Gender</Text>
          <Select name="gender" variant="filled" ref={register}>
            <option value={GENDER.MALE}>male</option>
            <option value={GENDER.FEMALE}>female</option>
          </Select>
        </Box>
        <Button type="submit" variantColor="teal" variant="solid">
          Submit
        </Button>

        <pre>{errors && JSON.stringify(errors)}</pre>
      </form>
    </Box>
  );
}
