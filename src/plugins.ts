import { API, ToolSettings } from "@editorjs/editorjs";

type SimpleImageData = {
  url?: string;
};

type SimpleImageConstructorParams = {
  api: API;
  config?: ToolSettings;
  data: SimpleImageData;
};

export class SimpleImage {
  data: SimpleImageData;

  constructor({ data }: SimpleImageConstructorParams) {
    this.data = data;
  }

  static get toolbox() {
    return {
      title: "Image",
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  render() {
    const input = document.createElement("div");
    //This is the technique used for passing into the editor already saved data.
    input.innerHTML = this.data && this.data.url ? this.data.url : "";

    input.addEventListener("paste", (event) =>
      this._createImage(event.clipboardData?.getData("text"))
    );

    return input;
  }

  _createImage(url?: string) {
    console.log(url);
  }

  save(blockContent: HTMLDivElement) {
    //I do not know why I do get undefined when I pass in a url.
    console.log(blockContent.innerHTML);
    return {
      url: blockContent.innerHTML,
    };
  }
  validate(savedData: { url: string }) {
    if (!savedData.url.trim()) {
      return false;
    }

    return true;
  }
}

/*
Things that I have learn.
1) How to create an editor block and pass save data to the save method. 
2) How to create my custom plug in. 
3) Fill block with save data and adding some css styles.
4) Save data validation.
5) Changing a view.
*/
