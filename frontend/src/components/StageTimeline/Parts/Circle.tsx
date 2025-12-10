import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import type { StatusTypes } from "../../../types/DataTypes";

type CircleType = {
  circleType: StatusTypes;
};

const Circle = ({ circleType }: CircleType) => {
  switch (circleType) {
    case "Complete":
      return <CheckCircleOutlineIcon />;
    case "Started":
      return <PanoramaFishEyeIcon />;
    case "NotStarted":
      return <CheckCircleOutlineIcon />;
  }
};

export default Circle;
