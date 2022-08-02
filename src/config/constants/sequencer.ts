interface IStringAnyHashMap {
    [slug: string]: any;
} 

export const TOML_FILES: IStringAnyHashMap = {
    "OneTwo": require("../../Objects/Sequencer/Definitions/OneTwo"),
    "OneFour": require("../../Objects/Sequencer/Definitions/OneFour"),
    "TwoFour": require("../../Objects/Sequencer/Definitions/TwoFour"),
    "SimpleArpeggiator": require("../../Objects/Sequencer/Definitions/SimpleArpeggiator"),
    "ThreeFour": require("../../Objects/Sequencer/Definitions/ThreeFour"),
    "FourOTFloor": require("../../Objects/Sequencer/Definitions/FourOTFloor"),
    "OffBeatFour": require("../../Objects/Sequencer/Definitions/OffBeatFour"),
    "HiHat": require("../../Objects/Sequencer/Definitions/HiHat"),
    "HouseHiHat": require("../../Objects/Sequencer/Definitions/HouseHiHat"),
    "SimpleDrone": require("../../Objects/Sequencer/Definitions/SimpleDrone"),
    "Random": require("../../Objects/Sequencer/Definitions/Random")
}
  