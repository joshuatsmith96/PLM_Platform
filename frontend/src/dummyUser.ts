type User = {
  firstName: string;
  lastName: string;
  imgUrl: string | null;
  role?: "CSCSAdmin" | "ReadOnly";
};

export const User: User = {
  firstName: "Joshua",
  lastName: "Smith",
  imgUrl: null,
  role: "CSCSAdmin",
};
