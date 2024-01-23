import { IDesignItem, IProperty, IPropertyGroup, PropertyType } from "@node-projects/web-component-designer";
import { AutomaticSliderShowWebcomponent } from "../slider/AutomaticSliderShowWebcomponent.js";
import { AbstractPolymerLikePropertiesService } from "@node-projects/web-component-designer/dist/elements/services/propertiesService/services/AbstractPolymerLikePropertiesService.js";

export default class AttachedPropertiesService extends AbstractPolymerLikePropertiesService {
  override isHandledElement(designItem: IDesignItem): boolean {
    return designItem.parent?.element instanceof AutomaticSliderShowWebcomponent;
  }

  public override getProperties(designItem: IDesignItem): IProperty[] | IPropertyGroup[] {
    return [{
      name: 'tab-control', properties: [{
        name: 'header',
        description: 'header shown in tab control',
        type: "string",
        service: this,
        propertyType: PropertyType.propertyAndAttribute
      }]
    }];
  }

  protected override _notifyChangedProperty(designItem: IDesignItem, property: IProperty, value: any) {
    (<AutomaticSliderShowWebcomponent>designItem.parent?.element)._refreshContent();
  };
}