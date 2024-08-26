import { PanoraWidget } from "@panoraexchange/widget-sdk";

const PANORA_WIDGET_API_KEY = "oLujOsvnXgFY9TjN5VxS@u@kmq+wWjcyTEnVL4LEPf5pwNtYdR90EfeBDj33F^4E";

const Swap = () => {
  return (
    <div
      className=""
      style={{
        minHeight: "100px",
        minWidth: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#010D09",
      }}
    >
      <PanoraWidget
        config={{
          API_KEY: PANORA_WIDGET_API_KEY,
          styles: {
            widget: { width: "450px" },
          },
          tokenPickerView: "MODAL",
        }}
      />
    </div>
  );
};

export default Swap;