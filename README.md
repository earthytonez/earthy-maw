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

1. Help
  1. ~~Fix Keys/Scale/Chord Changes to show yellow when changed.~~
  2. ~~Parameters should take a min and max value (options)~~
  18. ~~Pitch on the Kick / a Synth is a +/- to what comes in.~~
  3. ~~Refactor IntervalToPlay.~~
  2. Add tests
  4. Fix Filter (Add ~~Cutoff~~ and type parameter)
  5. Ensure Waveform Works
  6. Ensure Bell Works
  7. Ensure Bass Works
  8. Ensure HiHat Works
  9. Ensure Kick Works
  10. Ensure Waveform Works
  11. Fix dev.to article.
  13. Random Octave on Segment Change / Note Change
  14. Note, Note Diff, Note Direction Parameters for Step Sequencer
  15. Docs for Directional Interval Sequencer.
  16. Give reddit dude an update.
  17. Give dev.to dude an update.
  12. Post to Twitter about Arpeggiator

  
2. MMF: Make parameters modulatable by LFO and Date.
    1. Make Closed Source
    2. Make defenitions Open Source
    3. Add 2xOsc
    4. Add LFO Modulation for Parameter
    4. Add Date Modulation for Parameter

3. Make Drone Synth
    1. Ensure FMBells Works
    2. Ensure FMDrone Works

1. Share on Twitter.
    1. ~~Load synth and sequencer via URL parameters.~~
    2. ~~Fix BPM Changer~~
    3. Fix "Loading" on Sequencer
    3. Help Screen
    4. Contextual help for "Sequence Length", seq/synth, etc.
    5. Modulatable Four on the Floor Sequencer (add Fills)


1. Youtube Video #1 -- The three/four.
    1. Work out UI Quirks
        1. ~~Add Track Button~~
        2. ~~Center Synthesizer/Sequencer/Track~~
        3. ~~ERROR Error caught during track loop Error: parameters for random sequencer must be defined~~
        4. ~~Warning: Failed prop type: The prop `xs` of `Grid` can only be used together with the `item` prop~~
        5. ~~The Three/Four doesn't Run~~ 
        6. ~~Synthesizer/Sequencer Tabs don't work.~~
        7. ~~Sequencer Tab should be leftmost, than Synthesizer Tab~~
        8. ~~Code Length of Interval List in~~.
        8. ~~Code Interval To Play in.~~
        9. ~~Octave should have single select and multi select choices.~~
        10. ~~Write Tests for TrackOctave.ts and ensure it is documented.~~
        11. ~~The Three Four should use octave.~~
        12. IMusicChord is incompatible with Chord string dropdown.
        12. Add Cutoff to Waveform
        13. Left Bar prettier
        14. Chord doesn't show up in list.
        15. Key/Scale/Chord show yellow when pending change
        16. Key/scale/chord dropdowns more minimalist
        17. "Loading" after pulling in Sequencer.
        18. Limit to one Sequencer and one Synthesizer (Waveform and 3/4).
        19. Octave changes should respect time boundaries.
        20. Help on Sequencer tab shows the first synth name not "Synthesizer"
2. Youtube Video #2 -- Basic House Track
    1. Four on the Floor
    2. Bass
    3. House Hi Hats
    4. Lead?
    UI Quirks/Tech Debt:
        1. Day/Night Mode button should work
        2. Mute Button Doesn't Work
    



1. Random/Chaos Arpeggiator/bleeps and bloops
    1. Simple Waveform Synth with Changes.
    2. Continue tweak TrackComponent 
        /Users/mgimenez-peterson/Dev/github.com/earthytonez/web-synth/src/Components/TrackComponent/TrackComponent.tsx
        Specifically make math workout for padding of lane and components.  Maybe make padding look just like a line.
    2. Modulate Random
    3. Modulate Drone Sequencer
    4. Modulate "FMDrone" Synth
    5. Modulate "FMBell" Synth

    Refactor Function Parameters to Types
    A Trigger should be a type that includes Gate.

2. Make Synthesizers, Sequencers and Arrangers Browseable and Searchable.
    1. Make the bar on the left.
    2. Make bar opennable from unplaced Machines.
    
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