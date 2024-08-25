import React from 'react';
import { PanoraWidget, PanoraWidgetConfig } from '@panoraexchange/widget-sdk';

const PANORA_WIDGET_API_KEY = "oLujOsvnXgFY9TjN5VxS@u@kmq+wWjcyTEnVL4LEPf5pwNtYdR90EfeBDj33F^4E";
const KEYLESS_GOOGLE_CLIENT_ID = "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";

const widgetConfig: PanoraWidgetConfig = {
  API_KEY: "PANORA_WIDGET_API_KEY",
}

const Swap = () => {
  return (
    <PanoraWidget config={widgetConfig}/>
  )
}

export default Swap;