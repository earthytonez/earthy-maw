name = "Four on the Floor"
description = "Typical kick drum four on the floor beat"
length = 16
outputs = 1 // The number of different instruments sequenced.  Defaults to 1.

def NoteToPlay beat
    C4 # This is the note
end

def NoteToPlay beat
    440Hz # This is the Hz
end

def NoteToPlay beat
    64 # This is the midi number
end

[TriggerWhen] beat
    every 4 steps
end

[TriggerWhen] beat
    every step
end

[TriggerWhen] beat
    beat is divisible by 4
end

[TriggerWhen] beat
    percent 20
end

[TriggerWhen] beat
    20 percent
end