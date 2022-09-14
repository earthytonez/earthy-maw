import LastPanel from "./LastPanel";

it("renders the first panel", () => {
  let lastPanel = new LastPanel({
    AttachTo: "element-id",
    Title: "First Panel Title",
    Text: ["First Panel Text"],
  });
  expect(lastPanel.info().id).toEqual("step-last");
  expect(lastPanel.info().buttons.length).toEqual(2);
});
