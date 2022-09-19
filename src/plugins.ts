import { API, ToolSettings } from "@editorjs/editorjs";
import "./simple-image.css";

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
  wrapper: any;

  static get toolbox() {
    return {
      title: "Image",
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  constructor({ data }: SimpleImageConstructorParams) {
    this.data = data;
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("simple-image");

    if (this.data && this.data.url) {
      this._createImage(this.data.url, 'Here is caption field');
      return this.wrapper;
    }

    const input = document.createElement("input");

    this.wrapper.classList.add("simple-image");
    this.wrapper.appendChild(input);

    input.placeholder = "Paste an image URL...";
    input.value = this.data && this.data.url ? this.data.url : "";

    input.addEventListener("paste", (event) => {
      this._createImage(event.clipboardData?.getData("text"),'My Own Text');
    });

    return this.wrapper;
  }

  save(blockContent: HTMLDivElement) {
    /*
    const input = blockContent.querySelector("input");
    Note that the above was done when we want to save input data from the editorjs
    */
    const image = blockContent.querySelector("img");
    const caption = blockContent.querySelector("input");

    return {
      url: image?.src,
      caption: caption?.value,
    };
  }

  _createImage(url: string | any, captionText:string|any) {
    const image = document.createElement("img");
    const caption = document.createElement("input");

    image.src = url;
    caption.placeholder = "Caption...";
    caption.value = captionText || "";

    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(caption);
  }

  validate(savedData: { url: string | any }) {
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
6) Done with enabling inline toolbar
*/
