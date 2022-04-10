import { useRef, useEffect } from "react";
import { Application } from "pixi.js";
import { Main } from "./editor/Main";
import { IViewportOptions } from 'pixi-viewport';



export function EditorRoot() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {

        // On first render create our application
        const app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0xebebeb,
            antialias: true,
            resizeTo: ref.current.parentElement
        });

        function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      }
        window.addEventListener('resize', handleResize)
        app.view.oncontextmenu = (e) => {
            e.preventDefault();
        }

        const viewportSettings: IViewportOptions = {
            screenWidth: app.screen.width,
            screenHeight: app.screen.height,
            worldWidth: 2000,
            worldHeight: 2000,
            interaction: app.renderer.plugins.interaction
        }
        const main: Main = new Main(viewportSettings);


        // Add app to DOM
        ref.current!.appendChild(app.view);
        // Start the PixiJS app
        app.start();
        app.stage.addChild(main)

        return () => {
            // On unload completely destroy the application and all of it's children
            app.destroy(true, true);
        };
    }, []);

    return <div ref={ref} />;
}