interface IStringAnyHashMap {
    [slug: string]: any;
} 

export const TOML_FILES: IStringAnyHashMap = {
    "One Two": require("../../stores/Sequencer/Definitions/one_two"),
    "One Four": require("../../stores/Sequencer/Definitions/one_four"),
    "Two Four": require("../../stores/Sequencer/Definitions/two_four"),
    "Simple Arpeggiator": require("../../stores/Sequencer/Definitions/simple_arpeggiator"),
    "Three Four": require("../../stores/Sequencer/Definitions/three_four"),
    "Four On The Floor": require("../../stores/Sequencer/Definitions/four_on_the_floor"),
    "Off Beat Four": require("../../stores/Sequencer/Definitions/off_beat_four"),
    "HiHat": require("../../stores/Sequencer/Definitions/hihat"),
    "House HiHat": require("../../stores/Sequencer/Definitions/house_hihat"),
    "Simple Drone": require("../../stores/Sequencer/Definitions/simple_drone"),
    "Random": require("../../stores/Sequencer/Definitions/random")
}
  