import { IDesignerCanvas, IElementInteractionService } from "@node-projects/web-component-designer";
import { AutomaticSliderShowWebcomponent } from "../slider/AutomaticSliderShowWebcomponent.js";

export default class ElementInteractionService implements IElementInteractionService {
    stopEventHandling(designerCanvas: IDesignerCanvas, event: PointerEvent, currentElement: Element) {
        if (event.type !== 'pointerdown')
            return false;

        if (currentElement instanceof AutomaticSliderShowWebcomponent) {
            let ctls = currentElement.shadowRoot.elementsFromPoint(event.x, event.y);
            //@ts-ignore
            ctls[1].click();
        }

        return false;
    }
}