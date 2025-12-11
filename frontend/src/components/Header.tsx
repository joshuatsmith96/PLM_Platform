import { Stack, Typography } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Tooltip from "@mui/material/Tooltip";
import { User } from "../dummyUser";

const Header = () => {
  return (
    <Stack
      sx={{
        py: "10px",
        px: "20px",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
        borderBottom: "solid thin #c5c5c5ff",
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          textDecoration: "none",
          color: "black",
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
        component={"a"}
        href="/"
      >
        <AccountTreeIcon />
        Project Lifecycle Hub
      </Typography>
      <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
        <Typography sx={{ display: { xs: "none", sm: "block" } }}>
          Hello, {User.firstName}!
        </Typography>
        <Tooltip title="Nothing here yet">
          <img
            style={{
              display: "block",
              width: "35px",
              height: "35px",
              border: "solid rgba(215, 215, 215, 0.6)",
              borderRadius: "100px",
            }}
            src={
              User.imgUrl ??
              "https://i0.wp.com/e-quester.com/wp-content/uploads/2021/11/placeholder-image-person-jpg.jpg?fit=820%2C678&ssl=1"
            }
          />
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Header;
