import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
  name: "Twenty Twenty",
  age: 30,
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
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <input name="name" ref={register} />
      <label>Age</label>
      <input name="age" ref={register} />
      <select name="gender" ref={register}>
        <option value={GENDER.MALE}>male</option>
        <option value={GENDER.FEMALE}>female</option>
      </select>
      <button type="submit">Submit</button>
      <pre>{errors && JSON.stringify(errors)}</pre>
    </form>
  );
}
