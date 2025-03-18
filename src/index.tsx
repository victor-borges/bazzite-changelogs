import { staticClasses } from "@decky/ui";
import { definePlugin } from "@decky/api"
import { FaShip } from "react-icons/fa";
import { patchPartnerEventStore } from "./PartnerEventStorePatch";

export default definePlugin(() => {
  console.log("Bazzite Changelogs plugin initializing");
  const patch = patchPartnerEventStore();

  return {
    name: "Bazzite Changelogs",
    titleView: <div className={staticClasses.Title}>Bazzite Changelogs</div>,
    content: <div>Content</div>,
    icon: <FaShip />,
    onDismount() {
      console.log("Unloading Bazzite Changelogs");
      patch.unpatch();
    },
  };
});
