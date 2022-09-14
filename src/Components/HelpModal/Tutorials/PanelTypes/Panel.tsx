interface IPanelProps {
  AttachTo: string;
  On?: string;
  Title: string;
  Text: string[];
}

interface IPanelButton {
  classes: string;
  text: string;
  type: "back" | "cancel" | "next";
}

export default class Panel {
  AttachTo: string;
  On: string = "top";
  Title: string;
  Text: string[];

  constructor(props: IPanelProps) {
    this.AttachTo = props.AttachTo;
    if (props.On) {
      this.On = props.On;
    }
    this.Title = props.Title;
    this.Text = props.Text;
  }

  exitButton(): IPanelButton {
    return {
      classes: "MuiButton-secondary",
      text: "Exit",
      type: "cancel",
    };
  }

  backButton(): IPanelButton {
    return {
      classes: "MuiButton-primary",
      text: "Back",
      type: "back",
    };
  }

  nextButton(): IPanelButton {
    return {
      classes: "MuiButton-primary",
      text: "Next",
      type: "next",
    };
  }
}
