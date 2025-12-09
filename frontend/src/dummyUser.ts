type User = {
  firstName: string;
  lastName: string;
  imgUrl: string | null;
  role?: "CSCSAdmin";
};

export const User: User = {
  firstName: "Joshua",
  lastName: "Smith",
  imgUrl: null,
  role: "CSCSAdmin",
};
