import React, { ChangeEvent, useCallback, useState } from 'react';
import './App.css';

// const fileReader = new FileReader();

function App() {
  const [palette, setPalette] = useState();

  const onFileSelected = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);

    const data = await file?.arrayBuffer();
    const slice = data?.slice(65536);

    const indexes = new Uint8Array(slice!);
    console.log(indexes);
  }, []);

  const onPaletteSelected = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);

    const data = await file?.arrayBuffer();
    const slice = data?.slice(1024);

    const palette = new Uint32Array(slice!);

    console.log(palette);
  }, []);

  return (
    <div className="App">
      Data <input type='file' onChange={onFileSelected} />
      Palette <input type='file' onChange={onPaletteSelected} />
    </div>
  );
}

export default App;
