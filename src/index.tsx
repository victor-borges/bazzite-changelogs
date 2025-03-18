import { staticClasses } from "@decky/ui";
import { definePlugin } from "@decky/api"
import { FaInfoCircle } from "react-icons/fa";
import { patchPartnerEventStore } from "./PartnerEventStorePatch";

export default definePlugin(() => {
  console.log("Bazzite Changelogs plugin initializing");
  const patch = patchPartnerEventStore();

  return {
    name: "Bazzite Changelogs",
    titleView: <div className={staticClasses.Title}>Bazzite Changelogs</div>,
    content: <div>This plugin swaps SteamOS' update changelogs for Bazzite's changelogs.</div>,
    icon: <FaInfoCircle />,
    onDismount() {
      console.log("Unloading Bazzite Changelogs");
      patch.unpatch();
    },
  };
});
