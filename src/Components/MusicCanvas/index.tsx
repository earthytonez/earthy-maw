import React from "react";
import "./index.css";

import Sequencer from "./Objects/Sequencer";
import Synthesizer from "./Objects/Synthesizer";

import { Group, Layer, Line, Circle, Rect, Text } from "react-konva";

interface MusicCanvasProps {
  sequencers: Array<Sequencer>
  synths: Array<Synthesizer>
  setSynths: Function,
  setSequencers: Function
}

function MusicCanvas({sequencers, synths, setSynths, setSequencers}: MusicCanvasProps) {
  const [lines, setLines] = React.useState([]);

  const handleDragEnd = (e) => {
    setSynths(
      synths.map((synth) => {
        return {
          ...synth,
          isDragging: false,
        };
      })
    );

    setSequencers(
      sequencers.map((sequencer) => {
        return {
          ...sequencer,
          isDragging: false,
        };
      })
    );
  };


  let lineStart = undefined;

  let line = undefined;
  let orig = {};

  document.addEventListener("mousemove", (e) => {
    if (line) {
      const lineCoords = [
        orig.x,
        orig.y,
        window.event.pageX,
        window.event.pageY,
      ];
      line.points(lineCoords);
    }
  });

  const anchorOnDragMove = function () {
    line.points([this.x(), this.y(), window.event.pageX, window.event.pageY]);
    update(this);
  };

  const anchorOnMouseDown = function () {
    if (lineStart) {
      if (lineStart._id != this._id) {
        console.log("Creating new Line");
        let lineCoords = [lineStart.x(), lineStart.y(), this.x(), this.y()];
        let newLines = lines;
        if (this.type !== "synth") {
          lineStart.attrs.object.bindSynth(this.attrs.object);
        } else {
          console.log(this.attrs);
          console.log(this.attrs.object);
          this.attrs.object.bindSynth(lineStart.attrs.object);
        }
        newLines.push({
          stroke: "black",
          id: `${lineStart._id}-${this._id}`,
          fill: "black",
          points: lineCoords,
        });
        setLines(newLines);
      } else {
        lineStart = undefined;
      }
    } else {
      lineStart = this;
    }
    this.moveToTop();
  };

  const anchorOnDragEnd = function () {
    group.draggable(true);
  };

  // add hover styling
  const anchorOnMouseOver = function () {
    var layer = this.getLayer();
    document.body.style.cursor = "pointer";
    this.strokeWidth(4);
  };

  const anchorOnMouseOut = function () {
    var layer = this.getLayer();
    document.body.style.cursor = "default";
    this.strokeWidth(2);
  };

  const handleDragStart = (e) => {
    const id = e.target.id();
    setSynths(
      synths.map((synth) => {
        return {
          ...synth,
          isDragging: synth.id === id,
        };
      })
    );

    setSequencers(
      sequencers.map((sequencer) => {
        return {
          ...sequencer,
          isDragging: sequencer.id === id,
        };
      })
    );
  };

  console.log(lines);
  console.log(sequencers);
  console.log(synths);

  return (
      <Layer>
      <Text text="Try to drag a Sequencer" color="white" />

        {sequencers.map((sequencer) => (
          <Group key={sequencer.id}>
            <Rect
              type="sequencer"
              x={sequencer.x}
              y={sequencer.y}
              width={100}
              height={100}
              fill="#89b717"
              onDragMove={handleDragStart}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={sequencer.isDragging ? 10 : 5}
              shadowOffsetY={sequencer.isDragging ? 10 : 5}
              scaleX={sequencer.isDragging ? 1.2 : 1}
              scaleY={sequencer.isDragging ? 1.2 : 1}
              draggable
            />
            <Circle
              object={sequencer}
              type="sequencer"
              object_id={sequencer.id}
              onMouseOut={anchorOnMouseOut}
              onMouseOver={anchorOnMouseOver}
              onDragEnd={anchorOnDragEnd}
              onDragMove={anchorOnDragMove}
              onTouchStart={anchorOnMouseDown}
              onMouseDown={anchorOnMouseDown}
              x={sequencer.x + 50}
              y={sequencer.y + 100}
              stroke="#666"
              fill="#ddd"
              strokeWidth={2}
              name="sequencer-handler"
              draggable={false}
              dragOnTop={false}
              radius={10}
            />
          </Group>
        ))}

        {lines.map((line) => (
          <Line
            points={line.points}
            stroke={line.stroke}
            strokeWidth={line.width}
            lineCap={line.cap}
            lineJoin={line.join}
          />
        ))}

        <Text text="Try to drag a Sequencer" />
        {synths.map((synth) => (
          <Group key={synth.id}>
            <Circle
              type="synth"
              x={synth.x}
              y={synth.y}
              radius={50}
              fill="#89b717"
              onDragMove={handleDragStart}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={synth.isDragging ? 10 : 5}
              shadowOffsetY={synth.isDragging ? 10 : 5}
              scaleX={synth.isDragging ? 1.2 : 1}
              scaleY={synth.isDragging ? 1.2 : 1}
              draggable
            />
            <Circle
              type="synth"
              object={synth}
              object_id={synth.id}
              onMouseOut={anchorOnMouseOut}
              onMouseOver={anchorOnMouseOver}
              onDragEnd={anchorOnDragEnd}
              onDragMove={anchorOnDragMove}
              onTouchStart={anchorOnMouseDown}
              onMouseDown={anchorOnMouseDown}
              x={synth.x + 25}
              y={synth.y + 50}
              stroke="#666"
              fill="#ddd"
              strokeWidth={2}
              radius={8}
              name="sequencer-handler"
              draggable={false}
              dragOnTop={false}
              radius={10}
            />
          </Group>
        ))}
      </Layer>
  );
}

export default MusicCanvas;

{
  /* <Circle
            key={synth.id}
            id={synth.id}
            x={synth.x}
            y={synth.y}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={synth.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={synth.isDragging ? 10 : 5}
            shadowOffsetY={synth.isDragging ? 10 : 5}
            scaleX={synth.isDragging ? 1.2 : 1}
            scaleY={synth.isDragging ? 1.2 : 1} */
}
{
  /* /> */
}

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { Stage, Layer, Star, Text } from 'react-konva';

// function generateShapes() {
//   return [...Array(10)].map((_, i) => ({
//     id: i.toString(),
//     x: Math.random() * window.innerWidth,
//     y: Math.random() * window.innerHeight,
//     rotation: Math.random() * 180,
//     isDragging: false,
//   }));
// }

// const INITIAL_STATE = generateShapes();

// const App = () => {
//   const [stars, setStars] = React.useState(INITIAL_STATE);

//   return (
//     <Stage width={window.innerWidth} height={window.innerHeight}>
//       <Layer>
//         <Text text="Try to drag a star" />
//         {stars.map((star) => (
//           <Star
//             key={star.id}
//             id={star.id}
//             x={star.x}
//             y={star.y}
//             numPoints={5}
//             innerRadius={20}
//             outerRadius={40}
//             fill="#89b717"
//             opacity={0.8}
//             draggable
//             rotation={star.rotation}
//             shadowColor="black"
//             shadowBlur={10}
//             shadowOpacity={0.6}
//             shadowOffsetX={star.isDragging ? 10 : 5}
//             shadowOffsetY={star.isDragging ? 10 : 5}
//             scaleX={star.isDragging ? 1.2 : 1}
//             scaleY={star.isDragging ? 1.2 : 1}
//             onDragStart={handleDragStart}
//             onDragEnd={handleDragEnd}
//           />
//         ))}
//       </Layer>
//     </Stage>
//   );
// };

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);

/* ANCHOR EXAMPLE */

// <!DOCTYPE html>
// <html>
//   <head>
//     <script src="https://unpkg.com/konva@8.3.5/konva.min.js"></script>
//     <meta charset="utf-8" />
//     <title>Konva Image Resize Demo</title>
//     <style>
//       body {
//         margin: 0;
//         padding: 0;
//         overflow: hidden;
//         background-color: #f0f0f0;
//       }
//     </style>
//   </head>
//   <body>
//     <div id="container"></div>
//     <script>
//       var width = window.innerWidth;
//       var height = window.innerHeight;

//       function update(activeAnchor) {
//         var group = activeAnchor.getParent();

//         var topLeft = group.findOne('.topLeft');
//         var topRight = group.findOne('.topRight');
//         var bottomRight = group.findOne('.bottomRight');
//         var bottomLeft = group.findOne('.bottomLeft');
//         var image = group.findOne('Image');

//         var anchorX = activeAnchor.x();
//         var anchorY = activeAnchor.y();

//         // update anchor positions
//         switch (activeAnchor.getName()) {
//           case 'topLeft':
//             topRight.y(anchorY);
//             bottomLeft.x(anchorX);
//             break;
//           case 'topRight':
//             topLeft.y(anchorY);
//             bottomRight.x(anchorX);
//             break;
//           case 'bottomRight':
//             bottomLeft.y(anchorY);
//             topRight.x(anchorX);
//             break;
//           case 'bottomLeft':
//             bottomRight.y(anchorY);
//             topLeft.x(anchorX);
//             break;
//         }

//         image.position(topLeft.position());

//         var width = topRight.x() - topLeft.x();
//         var height = bottomLeft.y() - topLeft.y();
//         if (width && height) {
//           image.width(width);
//           image.height(height);
//         }
//       }
//       function addAnchor(group, x, y, name) {
//         var stage = group.getStage();
//         var layer = group.getLayer();

//         var anchor = new Konva.Circle({
//           x: x,
//           y: y,
//           stroke: '#666',
//           fill: '#ddd',
//           strokeWidth: 2,
//           radius: 8,
//           name: name,
//           draggable: true,
//           dragOnTop: false,
//         });

//         anchor.on('dragmove', function () {
//           update(this);
//         });
//         anchor.on('mousedown touchstart', function () {
//           group.draggable(false);
//           this.moveToTop();
//         });
//         anchor.on('dragend', function () {
//           group.draggable(true);
//         });
//         // add hover styling
//         anchor.on('mouseover', function () {
//           var layer = this.getLayer();
//           document.body.style.cursor = 'pointer';
//           this.strokeWidth(4);
//         });
//         anchor.on('mouseout', function () {
//           var layer = this.getLayer();
//           document.body.style.cursor = 'default';
//           this.strokeWidth(2);
//         });

//         group.add(anchor);
//       }

//       var stage = new Konva.Stage({
//         container: 'container',
//         width: width,
//         height: height,
//       });

//       var layer = new Konva.Layer();
//       stage.add(layer);

//       // darth vader
//       var darthVaderImg = new Konva.Image({
//         width: 200,
//         height: 137,
//       });

//       // yoda
//       var yodaImg = new Konva.Image({
//         width: 93,
//         height: 104,
//       });

//       var darthVaderGroup = new Konva.Group({
//         x: 180,
//         y: 50,
//         draggable: true,
//       });
//       layer.add(darthVaderGroup);
//       darthVaderGroup.add(darthVaderImg);
//       addAnchor(darthVaderGroup, 0, 0, 'topLeft');
//       addAnchor(darthVaderGroup, 200, 0, 'topRight');
//       addAnchor(darthVaderGroup, 200, 138, 'bottomRight');
//       addAnchor(darthVaderGroup, 0, 138, 'bottomLeft');

//       var yodaGroup = new Konva.Group({
//         x: 20,
//         y: 110,
//         draggable: true,
//       });
//       layer.add(yodaGroup);
//       yodaGroup.add(yodaImg);
//       addAnchor(yodaGroup, 0, 0, 'topLeft');
//       addAnchor(yodaGroup, 93, 0, 'topRight');
//       addAnchor(yodaGroup, 93, 104, 'bottomRight');
//       addAnchor(yodaGroup, 0, 104, 'bottomLeft');

//       var imageObj1 = new Image();
//       imageObj1.onload = function () {
//         darthVaderImg.image(imageObj1);
//       };
//       imageObj1.src = '/assets/darth-vader.jpg';

//       var imageObj2 = new Image();
//       imageObj2.onload = function () {
//         yodaImg.image(imageObj2);
//       };
//       imageObj2.src = '/assets/yoda.jpg';
//     </script>
//   </body>
// </html>

// const draw = (ctx, frameCount) => {
//   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//   ctx.fillStyle = "#000000";
//   ctx.beginPath();

//   let size = Math.sin(frameCount * 0.05);
//   size = 1;
//   ctx.arc(50, 100, 20 * size ** 2, 0, 2 * Math.PI);
//   ctx.fill();
// };
