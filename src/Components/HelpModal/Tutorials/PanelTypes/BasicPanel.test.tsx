import BasicPanel from "./BasicPanel";

it("renders the first panel", () => {
  let basicPanel = new BasicPanel({
    AttachTo: "element-id",
    Title: "First Panel Title",
    Text: ["First Panel Text"],
  });
  expect(basicPanel.info(2).id).toEqual("step-2");
  expect(basicPanel.info(2).buttons.length).toEqual(3);
});
