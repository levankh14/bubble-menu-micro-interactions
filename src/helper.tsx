import {
  Atom,
  Cpu,
  Earth,
  GitFork,
  Search,
  Smartphone,
  SquareDashedBottomCode,
  Store,
} from "lucide-react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const BOTTOM_HALF_HEIGHT = height * 0.28;
export const BALL_SIZE = 65;

export const BUBBLES_DATA = [
  // Top row - 3 bubbles
  {
    color: "#7add7b",
    icon: <SquareDashedBottomCode size={26} color={"white"} />,
    position: { top: 0, left: 0 },
  },
  {
    position: { top: 25, left: width / 2 - BALL_SIZE / 2 },
    color: "#4d92f1",
    icon: <Store size={26} color={"white"} />,
  },
  {
    position: { top: 0, left: width - BALL_SIZE },
    color: "#f5984f",
    icon: <Smartphone size={26} color={"white"} />,
  },

  // Middle row - 2 bubbles
  {
    position: {
      top: BOTTOM_HALF_HEIGHT / 2 - BALL_SIZE / 2,
      left: width / 4 - BALL_SIZE / 2,
    },
    color: "#f4df45ff",
    icon: <Atom size={26} color={"white"} />,
  },
  {
    position: {
      top: BOTTOM_HALF_HEIGHT / 2 - BALL_SIZE / 2,
      left: (width * 3) / 4 - BALL_SIZE / 2,
    },
    color: "#7add7b",
    icon: <Search size={26} color={"white"} />,
  },

  // Bottom row - 3 bubbles
  {
    position: { bottom: 0, left: 0 },
    color: "#4d92f1",
    icon: <Cpu size={26} color={"white"} />,
  },
  {
    position: { bottom: 0, left: width / 2 - BALL_SIZE / 2 },
    color: "#f5984f",
    icon: <GitFork size={26} color={"white"} />,
  },
  {
    position: { bottom: 0, left: width - BALL_SIZE },
    color: "#f4df45ff",
    icon: <Earth size={26} color={"white"} />,
  },
];
