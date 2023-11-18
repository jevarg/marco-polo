import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [palette, setPalette] = useState<Uint8Array>();
  const [fileData, setFileData] = useState<Uint8Array>();

  useEffect(() => {
    if (!palette || !fileData) {
      return;
    }

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const pixels = new Uint8ClampedArray(fileData.length * 4);//ctx?.createImageData(512, 256)!;

    for (let i = 0; i < fileData.length; i++) {
      const offset = i * 4;
      const paletteIndex = fileData[i];

      pixels[offset] = palette[paletteIndex];
      pixels[offset + 1] = palette[paletteIndex + 1];
      pixels[offset + 2] = palette[paletteIndex + 2];
      pixels[offset + 3] = palette[paletteIndex + 3];
    }

    const imgData = new ImageData(pixels, 512);
    ctx?.putImageData(imgData, 0, 0);
  }, [palette, fileData]);

  const onFileSelected = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);

    const data = await file?.arrayBuffer();
    const slice = data?.slice(65536);

    setFileData(new Uint8Array(slice!));
  }, []);

  const onPaletteSelected = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);

    const data = await file?.arrayBuffer();
    const slice = data?.slice(1024);

    setPalette(new Uint8Array(slice!));
  }, []);

  return <>
    <div className="App">
      <div>
        Data <input type='file' onChange={onFileSelected} />
        Palette <input type='file' onChange={onPaletteSelected} />
      </div>
      <div>
        <canvas id='canvas' />
      </div>
    </div>
  </>;
}

export default App;
