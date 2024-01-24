import { DefaultPlacementService, IDesignItem, IPlacementView, IPoint } from "@node-projects/web-component-designer";
import { AutomaticSliderShowWebcomponent } from "../slider/AutomaticSliderShowWebcomponent.js";

export default class SliderShowPlacementService extends DefaultPlacementService {
    override serviceForContainer(container: IDesignItem, containerStyle: CSSStyleDeclaration) {
        if (container.element instanceof AutomaticSliderShowWebcomponent)
            return true;
        return false;
    }

    override enterContainer(container: IDesignItem, items: IDesignItem[]) {

        super.enterContainer(container, items);

        for (let i of items) {
            if (i.hasStyle('position'))
                i.removeStyle('position');
            if (i.hasStyle('width'))
                i.removeStyle('width');
            if (i.hasStyle('height'))
                i.removeStyle('height');
            if (i.hasStyle('left'))
                i.removeStyle('left');
            if (i.hasStyle('top'))
                i.removeStyle('top');
        }
    }

    override place(event: MouseEvent, placementView: IPlacementView, container: IDesignItem, startPoint: IPoint, offsetInControl: IPoint, newPoint: IPoint, items: IDesignItem[]): void {
    }

    override finishPlace(event: MouseEvent, placementView: IPlacementView, container: IDesignItem, startPoint: IPoint, offsetInControl: IPoint, newPoint: IPoint, items: IDesignItem[]): void {
    }
}