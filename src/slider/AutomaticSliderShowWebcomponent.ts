import { BaseCustomWebComponentConstructorAppend, css, html } from "@node-projects/base-custom-webcomponent";

export class AutomaticSliderShowWebcomponent extends BaseCustomWebComponentConstructorAppend {

    public static override readonly style = css`
            :host {
                display: block;
            }

            ::slotted(*) {
                width: 100%;
                height: 100%;
                position: relative;
            }

            #slide-show{
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 9fr 1fr;
                grid-column-gap: 0px;
                grid-row-gap: 5px;
            }
            
            .slideshow-container{
                grid-area: 1 / 1 / 2 / 2;
                width: 100%;
                height: 100%;
                border: 1px solid grey;
                overflow: hidden;
            }

            .slide-element{
                height: 100%;
                width: 100%;
            }

            #dot-container{
                grid-area: 2 / 1 / 3 / 2;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }

            .dot-element{
                background-color: lightgray;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                margin: 4px;
            }

            .dot-active{
                background-color: darkgrey;
            }

            .arrow-container {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .left-arrow, .right-arrow {
                cursor: pointer;
                font-size: 22px;
                padding: 6px;
                user-select: none;
            }
            
            `;

    public static override readonly template = html`
            <div id="slide-show" style="height: 100%; width: 100%;">
                <div class="slideshow-container" id="slideshow-container">
                    <slot name="main"></slot>
                </div>
                <div class="arrow-container">
                    <div id="left-arrow" class="left-arrow">&#10094;</div>
                    <div id="dot-container">
                        <!-- Ihre Dots hier -->
                    </div>
                    <div id="right-arrow" class="right-arrow">&#10095;</div>
                </div>
            </div>
        `;

    public static readonly is = 'node-projects-slidershow';

    public static properties = {

    }

    private _dots: HTMLDivElement;
    private _slideIndex = 0;
    private _interval: number = 2000;
    private _timeoutId: any;
    private _observer: MutationObserver;

    constructor() {
        super();
        this._restoreCachedInititalValues();

        this._observer = new MutationObserver(x => {
            this._refreshContent();
        })

        this._dots = this._getDomElement<HTMLDivElement>('dot-container');
    }

    connectedCallback() {
        this._observer.observe(this, { childList: true });
        this._interval = parseInt(this.getAttribute('interval')) || this._interval;
        this._initializeSlider();
    }

    disconnectedCallback() {
        this._observer.disconnect();
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
    }

    ready() {
        this._parseAttributesToProperties();
        (<HTMLDivElement>this._getDomElement('left-arrow')).onclick = () => this.prevSlide();
        (<HTMLDivElement>this._getDomElement('right-arrow')).onclick = () => this.nextSlide();
    }

    private _initializeSlider() {
        this._refreshContent();
        this._showSlides();
    }

    _refreshContent() {
        this._dots.innerHTML = "";
        this._slideIndex = 0;
    }

    private _showSlides() {
        if (this._slideIndex >= this.children.length) {
            this._slideIndex = 0;
        }

        let count = 1;
        this._dots.innerHTML = "";
        for (let index = 0; index < this.children.length; index++) {
            const dotElement = document.createElement('div');
            dotElement.className = "dot-element";
            dotElement.id = "dot-element-" + count;
            this._dots.appendChild(dotElement);
            count++;
        }

        (<HTMLDivElement>this._dots.children[this._slideIndex]).classList.add("dot-active");

        let i = 0;
        for (const item of this.children as any as HTMLElement[]) {
            item.setAttribute('slot', i === this._slideIndex ? 'main' : '');
            i++;
        }

        i = 0;
        for (const dot of this._dots.children as any as HTMLElement[]) {
            dot.style.background = i === this._slideIndex ? 'darkgrey' : 'lightgray';
            i++;
        }

        this._slideIndex++;
        // console.log(this._slideIndex);
        clearTimeout(this._timeoutId);
        this._timeoutId = setTimeout(() => this._showSlides(), this._interval);
    }

    prevSlide() {
        this._slideIndex = this._slideIndex - 2;
        if (this._slideIndex < 0) {
            this._slideIndex = this.children.length - 1;
        }
        this._showSlides();
    }

    nextSlide() {
        if (this._slideIndex >= this.children.length) {
            this._slideIndex = 0;
        }
        this._showSlides();
    }

    public refresh() {
        this._slideIndex = 0;
        this._showSlides();
    }
}

customElements.define(AutomaticSliderShowWebcomponent.is, AutomaticSliderShowWebcomponent);