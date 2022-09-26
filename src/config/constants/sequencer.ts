interface IStringAnyHashMap {
    [slug: string]: any;
} 

export const TOML_FILES: IStringAnyHashMap = {
    "OneTwo": require("../../stores/Sequencer/Definitions/OneTwo"),
    "OneFour": require("../../stores/Sequencer/Definitions/OneFour"),
    "TwoFour": require("../../stores/Sequencer/Definitions/TwoFour"),
    "SimpleArpeggiator": require("../../stores/Sequencer/Definitions/SimpleArpeggiator"),
    "ThreeFour": require("../../stores/Sequencer/Definitions/ThreeFour"),
    "FourOTFloor": require("../../stores/Sequencer/Definitions/FourOTFloor"),
    "OffBeatFour": require("../../stores/Sequencer/Definitions/OffBeatFour"),
    "HiHat": require("../../stores/Sequencer/Definitions/HiHat"),
    "HouseHiHat": require("../../stores/Sequencer/Definitions/HouseHiHat"),
    "SimpleDrone": require("../../stores/Sequencer/Definitions/SimpleDrone"),
    "Random": require("../../stores/Sequencer/Definitions/Random")
}
  