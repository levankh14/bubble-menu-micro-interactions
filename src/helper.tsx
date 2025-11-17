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
  },
  {
    color: "#4d92f1",
    icon: <Store size={26} color={"white"} />,
  },
  {
    color: "#f5984f",
    icon: <Smartphone size={26} color={"white"} />,
  },

  // Middle row - 2 bubbles
  {
    color: "#f4df45ff",
    icon: <Atom size={26} color={"white"} />,
  },
  {
    color: "#7add7b",
    icon: <Search size={26} color={"white"} />,
  },

  // Bottom row - 3 bubbles
  {
    color: "#4d92f1",
    icon: <Cpu size={26} color={"white"} />,
  },
  {
    color: "#f5984f",
    icon: <GitFork size={26} color={"white"} />,
  },
  {
    color: "#f4df45ff",
    icon: <Earth size={26} color={"white"} />,
  },
];
