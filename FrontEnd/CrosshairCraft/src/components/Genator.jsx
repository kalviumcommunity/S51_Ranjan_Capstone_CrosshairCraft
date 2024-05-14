import React from "react";

const Generator = () => {
  return (
    <div id="builder">
      <div id="builderImage">
        <div className="x-hair-container">
          <x-hair>
            <img src="./img/bgs/default.webp" />
            <canvas height="128" width="128" />
          </x-hair>
        </div>
        <div className="x-hair-container">
          <x-hair>
            <img src="./img/bgs/green.webp" />
            <canvas height="128" width="128" />
          </x-hair>
        </div>
        <div className="x-hair-container">
          <x-hair>
            <img src="./img/bgs/metall.webp" />
            <canvas height="128" width="128" />
          </x-hair>
        </div>
        <div className="x-hair-container">
          <x-hair>
            <img src="./img/bgs/blaugelb.webp" />
            <canvas height="128" width="128" />
          </x-hair>
        </div>
        <div className="x-hair-container">
          <x-hair>
            <img src="./img/bgs/yellow.webp" />
            <canvas height="128" width="128" />
          </x-hair>
        </div>
        <div className="x-hair-container">
          <x-hair>
            <img src="./img/bgs/orange.webp" />
            <canvas height="128" width="128" />
          </x-hair>
        </div>
        <div className="x-hair-container">
          <x-hair>
            <img src="./img/bgs/blue.webp" />
            <canvas height="128" width="128" />
          </x-hair>
        </div>
        <div className="x-hair-container">
          <x-hair>
            <img src="./img/bgs/grass.webp" />
            <canvas height="128" width="128" />
          </x-hair>
        </div>
        <div className="x-hair-container">
          <x-hair>
            <img src="./img/bgs/sky.webp" />
            <canvas height="128" width="128" />
          </x-hair>
        </div>
      </div>
      <div id="builderResize"></div>
      <div id="builderRight">
        <div id="builderTabSelect">
          <button className="selected">General</button>
          <button className="">Primary</button>
          <button className="tabAdvanced" disabled="">
            ADS
          </button>
          <button className="tabAdvanced" disabled="">
            Sniper
          </button>
        </div>
        <div id="builderCustomize" className="x-hair-customizer">
          <x-chapter data-name="Crosshair" data-tab="general" style="">
            <div data-name="Advanced Options">
              <div className="x-hair-toggle" binding="0:s">
                <button>On</button>
                <button>Off</button>
              </div>
            </div>
          </x-chapter>

          <x-chapter data-name="Other" data-tab="general" style="">
            <div data-name="Show Crosshair Of Spectated Player">
              <div className="x-hair-toggle x-checked" binding="P:s">
                <button>On</button>
                <button>Off</button>
              </div>
            </div>
            <div data-name="Hide Crosshair On Firing Error">
              <div className="x-hair-toggle x-checked" binding="P:f">
                <button>On</button>
                <button>Off</button>
              </div>
            </div>
          </x-chapter>
          <x-chapter
            data-name="Crosshair"
            data-tab="primary"
            style={{ display: "none" }}
          >
            {/* Content for Crosshair chapter under primary tab */}
          </x-chapter>
          <x-chapter
            data-name="Inner Lines"
            data-tab="primary"
            style={{ display: "none" }}
          >
            {/* Content for Inner Lines chapter under primary tab */}
          </x-chapter>
          <x-chapter
            data-name="Outer Lines"
            data-tab="primary"
            style={{ display: "none" }}
          >
            {/* Content for Outer Lines chapter under primary tab */}
          </x-chapter>
          <x-chapter
            data-name="General"
            data-tab="ads"
            style={{ display: "none" }}
          >
            {/* Content for General chapter under ads tab */}
          </x-chapter>
          <x-chapter
            data-name="Crosshair"
            data-tab="ads"
            style={{ display: "none" }}
          >
            {/* Content for Crosshair chapter under ads tab */}
          </x-chapter>
          <x-chapter
            data-name="Inner Lines"
            data-tab="ads"
            style={{ display: "none" }}
          >
            {/* Content for Inner Lines chapter under ads tab */}
          </x-chapter>
          <x-chapter
            data-name="Outer Lines"
            data-tab="ads"
            style={{ display: "none" }}
          >
            {/* Content for Outer Lines chapter under ads tab */}
          </x-chapter>
          <x-chapter
            data-name="General"
            data-tab="sniper"
            style={{ display: "none" }}
          >
            {/* Content for General chapter under sniper tab */}
          </x-chapter>
        </div>
        <div id="builderButtons">
          <button id="builderCopy" className="builderButton">
            Copy Code
          </button>
          <button id="builderShare" className="builderButton">
            Share Link
          </button>
          <button id="builderPaste" className="builderButton">
            Paste Code
          </button>
          <button id="builderRandomize" className="builderButton">
            Randomizer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generator;
