import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { Button, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { SimpleImage } from "./plugins";

//I have a deeper understanding of internalisation. As a result, I did not add it to the project I am doing.

let mounted = false;

function App() {
  const [editor, setEditor] = useState<EditorJS | null>();

  useEffect(() => {
    if (!mounted) {
      const editor = new EditorJS({
        holder: "editorjs",

        tools: {
          header: {
            class: Header,
            inlineToolbar: ["link"],
          },

          list: {
            class: List,
            inlineToolbar: true,
          },
          image: SimpleImage,
        },

        data: {
          time: 1552744582955,
          blocks: [
            {
              type: "image",
              data: {
                url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg",
              },
            },
          ],
          version: "2.11.10",
        },
        
        onReady: () => {
          setEditor(editor);

          // document
          //   .getElementById("save")
          //   ?.addEventListener("click", () =>
          //     editor.save().then((output) => console.log(output))
          //   );
        },
        autofocus: true,
      });
    }
    mounted = true;
  }, []);

  const onSave = () => {
    editor
      ?.save()
      .then((outputData: any) => {
        const array = outputData.blocks;
        console.log("Article data: ", outputData);
      })
      .catch((error: any) => {
        console.log("Saving failed: ", error);
      });
  };

  return (
    <>
      <Paper elevation={3} sx={{ margin: "50px", height: "1000px" }}>
        <div id="editorjs"></div>
      </Paper>
      <Typography align="center">
        <Button variant="contained" color="success" id="save" onClick={onSave}>
          Submit
        </Button>
      </Typography>
    </>
  );
}

export default App;
