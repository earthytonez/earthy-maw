import Panel from './Panel'

export default class BasicPanel extends Panel {
    
    buttons(): any {
        return [
          this.exitButton(),
          this.backButton(),
          this.nextButton()
        ];
    }

    info(panelCount: number) {
        return {
            id: `step-${panelCount}`,
            attachTo: { element: this.AttachTo, on: "top" }, // , on: "bottom"
            beforeShowPromise: function () {
              return new Promise(function (resolve) {
                setTimeout(function () {
                  window.scrollTo(0, 0);
                  resolve(undefined);
                }, 500);
              });
            },
            buttons: this.buttons(),
            classes: "custom-class-name-1 custom-class-name-2",
            highlightClass: "highlight",
            scrollTo: false,
            cancelIcon: {
              enabled: true,
            },
            title: this.Title,
            text: this.Text,
            when: {
              show: () => {
                console.log("show step");
              },
              hide: () => {
                console.log("hide step");
              },
            },
          }
    }
}