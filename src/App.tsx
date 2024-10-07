import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface M3U8Url {
  url: string;
  isPlaying: boolean;
}

function App() {
  const [m3u8Urls, setM3u8Urls] = useState<M3U8Url[]>([]);

  useEffect(() => {
    chrome.storage.local.get(['m3u8Urls'], (result) => {
      if (result.m3u8Urls) {
        setM3u8Urls(result.m3u8Urls.map((url: string) => ({ url, isPlaying: false })));
      }
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.m3u8Urls) {
        setM3u8Urls(changes.m3u8Urls.newValue.map((url: string) => ({ url, isPlaying: false })));
      }
    });
  }, []);

  const togglePlay = (index: number) => {
    setM3u8Urls((prevUrls) =>
      prevUrls.map((item, i) =>
        i === index ? { ...item, isPlaying: !item.isPlaying } : { ...item, isPlaying: false }
      )
    );
  };

  return (
    <div className="w-96 min-h-[400px] bg-gray-100 p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">M3U8 URL Detector</h1>
      {m3u8Urls.length === 0 ? (
        <p className="text-gray-600">No M3U8 URLs detected yet.</p>
      ) : (
        <ul className="space-y-4">
          {m3u8Urls.map((item, index) => (
            <li key={index} className="bg-white rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-600 mb-2 break-all">{item.url}</p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => togglePlay(index)}
                  className="flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  <Play size={16} className="mr-1" />
                  {item.isPlaying ? 'Stop' : 'Play'}
                </button>
              </div>
              {item.isPlaying && (
                <video
                  src={item.url}
                  controls
                  className="mt-2 w-full h-auto"
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;