"use client";
import React, { useEffect, useRef } from "react";

type SpotlightProps = {
    children: React.ReactNode;
};

class Spotlight {
    private container: HTMLElement;
    private cards: HTMLElement[];
    private mouse: { x: number; y: number };
    private containerSize: { w: number; h: number };

    constructor(containerElement: HTMLElement) {
        this.container = containerElement;
        this.cards = Array.from(this.container.children) as HTMLElement[];
        this.mouse = {
            x: 0,
            y: 0,
        };
        this.containerSize = {
            w: 0,
            h: 0,
        };
        this.initContainer = this.initContainer.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.init();
    }

    private initContainer() {
        this.containerSize.w = this.container.offsetWidth;
        this.containerSize.h = this.container.offsetHeight;
    }

    private onMouseMove(event: MouseEvent) {
        const { clientX, clientY } = event;
        const rect = this.container.getBoundingClientRect();
        const { w, h } = this.containerSize;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const inside = x < w && x > 0 && y < h && y > 0;
        if (inside) {
            this.mouse.x = x;
            this.mouse.y = y;
            this.cards.forEach((card) => {
                const cardX =
                    -(card.getBoundingClientRect().left - rect.left) +
                    this.mouse.x;
                const cardY =
                    -(card.getBoundingClientRect().top - rect.top) +
                    this.mouse.y;
                card.style.setProperty("--mouse-x", `${cardX}px`);
                card.style.setProperty("--mouse-y", `${cardY}px`);
            });
        }
    }

    private init() {
        this.initContainer();
        window.addEventListener("resize", this.initContainer);
        window.addEventListener("mousemove", this.onMouseMove);
    }

    public destroy() {
        window.removeEventListener("resize", this.initContainer);
        window.removeEventListener("mousemove", this.onMouseMove);
    }
}

const SpotlightContainer: React.FC<SpotlightProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const containerElement = containerRef.current;

        if (containerElement) {
            const spotlight = new Spotlight(containerElement);

            return () => {
                spotlight.destroy();
            };
        }
    }, []);

    return <div ref={containerRef}>{children}</div>;
};

export const Features = () => {
    return (
        <SpotlightContainer>
            <div
                className=" w-full mx-auto grid gap-10 lg:grid-cols-2 items-start lg:max-w-none group"
                data-spotlight
            >
                <div className="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover:opacity-100 before:z-10 before:blur-[100px] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacity-10 after:z-30 after:blur-[100px] overflow-hidden">
                    <div className="relative h-full bg-slate-900 p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                        <div
                            className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                        </div>
                        <div className="flex flex-col h-full items-center text-center">
                            <div className="relative inline-flex">
                                <div
                                    className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                                    aria-hidden="true"
                                ></div>
                                <img
                                    className="inline-flex"
                                    src="https://cruip-tutorials.vercel.app/spotlight-effect/card-01.png"
                                    width="200"
                                    height="200"
                                    alt="Card 01"
                                />
                            </div>

                            <div className="grow mb-5">
                                <h2 className="text-xl text-slate-200 font-bold mb-1">
                                    Amazing Integration
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Quickly apply filters to refine your issues
                                    lists and create custom views.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover:opacity-100 before:z-10 before:blur-[100px] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacity-10 after:z-30 after:blur-[100px] overflow-hidden">
                    <div className="relative h-full bg-slate-900 p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                        <div
                            className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                        </div>
                        <div className="flex flex-col h-full items-center text-center">
                            <div className="relative inline-flex">
                                <div
                                    className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                                    aria-hidden="true"
                                ></div>
                                <img
                                    className="inline-flex"
                                    src="https://cruip-tutorials.vercel.app/spotlight-effect/card-02.png"
                                    width="200"
                                    height="200"
                                    alt="Card 02"
                                />
                            </div>

                            <div className="grow mb-5">
                                <h2 className="text-xl text-slate-200 font-bold mb-1">
                                    Amazing Integration
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Quickly apply filters to refine your issues
                                    lists and create custom views.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover:opacity-100 before:z-10 before:blur-[100px] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacity-10 after:z-30 after:blur-[100px] overflow-hidden">
                    <div className="relative h-full bg-slate-900 p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                        <div
                            className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                        </div>
                        <div className="flex flex-col h-full items-center text-center">
                            <div className="relative inline-flex">
                                <div
                                    className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                                    aria-hidden="true"
                                ></div>
                                <img
                                    className="inline-flex"
                                    src="https://cruip-tutorials.vercel.app/spotlight-effect/card-03.png"
                                    width="200"
                                    height="200"
                                    alt="Card 03"
                                />
                            </div>

                            <div className="grow mb-5">
                                <h2 className="text-xl text-slate-200 font-bold mb-1">
                                    Amazing Integration
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Quickly apply filters to refine your issues
                                    lists and create custom views.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover:opacity-100 before:z-10 before:blur-[100px] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacity-10 after:z-30 after:blur-[100px] overflow-hidden">
                    <div className="relative h-full bg-slate-900 p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                        <div
                            className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                        </div>
                        <div className="flex flex-col h-full items-center text-center">
                            <div className="relative inline-flex">
                                <div
                                    className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                                    aria-hidden="true"
                                ></div>
                                <img
                                    className="inline-flex"
                                    src="https://cruip-tutorials.vercel.app/spotlight-effect/card-01.png"
                                    width="200"
                                    height="200"
                                    alt="Card 01"
                                />
                            </div>

                            <div className="grow mb-5">
                                <h2 className="text-xl text-slate-200 font-bold mb-1">
                                    Amazing Integration
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Quickly apply filters to refine your issues
                                    lists and create custom views.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SpotlightContainer>
    );
};
