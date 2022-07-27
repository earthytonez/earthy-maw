Modular Audio Workstation

Sources/Docs:
1. https://tonejs.github.io/docs/14.7.77/PluckSynth
2. https://tonejs.github.io/
3. https://mui.com/material-ui/react-table/
4. https://material.io/design/typography/the-type-system.html#type-scale
5. https://mynoise.net/
6. https://cables.gl/p/bmG4rF

MMF (Minimum Marketable Features)
Tech Debt: 1. Save more things (like Octaves)

1. Random/Chaos Arpeggiator/bleeps and bloops
    1. Simple Waveform Synth with Changes.
    2. Modulate Random
    3. Modulate Drone Sequencer
    4. Modulate "FMDrone" Synth
    5. Modulate "FMBell" Synth


2. Basic House Track -- Kick, Hi Hat, Bass
    2. Finish Kick with fill.
    3. Finish Hi Hat with adjustements
    4. Finish Bass with multiple versions.
        Video can load the page that shows these alternates.
2. The 3/4 from Misanthropic Glee. -- Can it also be the 3/4 from loop build 2?
3. Simple Arpeggiator
4. Complex Arpeggiator
5. Time based Modulation


Productionalization:
1. Undo delete track
2. Rock solid save track.
3. Export track to json.    
4. Volume/Mute Visual Feedback.

Tech Debt:
1. Refactor to be more of a pipeline.  Multiple Sequencers or effects with same ins and outs.
2. All NoteToPlay should take into account the Octave.
3. Like/Dark Mode Switching
4. Nexus Audio API -- Stereo Decibal Meter on Track.
Make ui more consistent


ToDo:
1. Generative Drone Synth
    ~~A. Create a MobX Store and all data structures within that store.~~
    ~~B. Make it so that the Track and Sequencer Use the Key and Scale~~
    C. Create a side panel that makes a thing editable.
    D. Make it so that the Key and Scale are modulatable by hour of the day.
    E. Evolve the Drones to be modulatable and more musical/editable.
    F. Add Different Color Header to Side Panel

2. Generative House Synth
3. More House Patterns
4. Recreate a song (Fargone Suite?)
5. Add retro color hash to devices.   Circle for Arranger, Square for Sequencer, Triangle for Instrument.
6. 80's Music Synth?

7. Create Arpeggiator Sequencer Type

* Inspiration from:

https://github.com/generativefm/generators

Sequencers:
1. Simple Arpeggiator
2. Complex Arpeggiator

Sequencer Modifiers (Midi Effects)
1. Glitch -- Add random 8/th notes after playing a note.


http://nexus-js.github.io/ui/