import { crud } from "./crud";

export const ENTITY = "users";

const findOrCreate = async (props: {
  email: string;
  app: string;
  firstName: string;
  lastName: string;
}) => {
  const result: {
    count: number;
    response: {
      user: string;
      data: { entity?: string; firstName: string; lastName: string };
      id: string;
    }[];
  } = await crud.list(
    props.email,
    { user: props.email, ["data.entity"]: ENTITY },
    props.app
  );
  if (!result.count) {
    console.log("[user not found]");
  }
  const existingUser = result.response[0];
  console.log("[user found]", existingUser);
  return {
    id: existingUser.id,
    email: existingUser.user,
    ...existingUser.data,
  };
};

export const servicesUser = {
  findOrCreate,
};
