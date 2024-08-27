// src/types/panora-widget.d.ts
import { PanoraWidgetConfig as OriginalPanoraWidgetConfig } from "@panoraexchange/widget-sdk";

interface ExtendedPanoraWidgetConfig extends OriginalPanoraWidgetConfig {
  KEYLESS_GOOGLE_CLIENT_ID?: string;
}

declare module "@panoraexchange/widget-sdk" {
  export interface PanoraWidgetConfig extends ExtendedPanoraWidgetConfig {}
}
