import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { Button, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";

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
      <Paper elevation={3} sx={{ margin: "50px", height: "700px" }}>
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
