import { BotIcon } from "lucide-react";
import { RobotColor } from "../Game";


type RobotProps = {
    color: RobotColor
}
const ROBOT_COLOR_CLASSES = {
    "red": "bg-red-500",  
    "green": "bg-green-500",
    "blue": "bg-blue-500",
    "yellow": "bg-yellow-500",
}
export const Robot = ({ color }: RobotProps) => {
    return (
        <div className={`size-[80%] rounded-full flex justify-center items-center ${ROBOT_COLOR_CLASSES[color]}`}
        >
            <BotIcon className="size-[80%] -translate-y-[5%]" />
        </div>
    );
}; 