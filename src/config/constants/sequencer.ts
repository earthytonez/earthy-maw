interface IStringAnyHashMap {
    [slug: string]: any;
} 

export const TOML_FILES: IStringAnyHashMap = {
    "OneTwo": require("./Definitions/OneTwo"),
    "OneFour": require("./Definitions/OneFour"),
    "TwoFour": require("./Definitions/TwoFour"),
    "SimpleArpeggiator": require("./Definitions/SimpleArpeggiator"),
    "ThreeFour": require("./Definitions/ThreeFour"),
    "FourOTFloor": require("./Definitions/FourOTFloor"),
    "OffBeatFour": require("./Definitions/OffBeatFour"),
    "HiHat": require("./Definitions/HiHat"),
    "HouseHiHat": require("./Definitions/HouseHiHat"),
    "SimpleDrone": require("./Definitions/SimpleDrone"),
    "Random": require("./Definitions/Random")
}
  