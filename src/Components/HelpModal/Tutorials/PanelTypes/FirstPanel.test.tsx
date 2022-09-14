import FirstPanel from "./FirstPanel";

it("renders the first panel", () => {
  let firstPanel = new FirstPanel({
    AttachTo: "element-id",
    Title: "First Panel Title",
    Text: ["First Panel Text"],
  });
  expect(firstPanel.info().id).toEqual("step-1");
  expect(firstPanel.info().buttons.length).toEqual(2);
});
