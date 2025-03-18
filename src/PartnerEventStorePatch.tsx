import { findModuleExport } from "@decky/ui";
import { afterPatch } from "decky-frontend-lib";

const PartnerEventStore = findModuleExport(
  (e) => e?.prototype?.InternalLoadAdjacentPartnerEvents
);

const SteamID = findModuleExport(
  (e) => e?.prototype?.BIsClanAccount
    && e?.prototype?.BIsIndividualAccount
    && e?.prototype?.BIsValid
    && e?.prototype?.ConvertTo64BitString
    && e?.prototype?.GetAccountID
    && e?.prototype?.GetAccountType
    && e?.prototype?.GetInstance
    && e?.prototype?.GetUniverse
    && e?.prototype?.Render
    && e?.prototype?.SetAccountID
    && e?.prototype?.SetAccountType
    && e?.prototype?.SetFromComponents
    && e?.prototype?.SetInstance
    && e?.prototype?.SetUniverse
);

const SteamClanSteamID = "103582791470414830";
const SteamClanID = "40893422";
const GithubReleaseID = 206053201;

export function patch() {
  afterPatch(
    PartnerEventStore.prototype,
    "InternalLoadAdjacentPartnerEvents",
    function(args, ret) {
      let n = args[3];
      console.log(`n: ${n}`);
      // if (n === 1675200) {
      if (true) {
        console.log("attempting to fetch steamOS partner event");

        // @ts-ignore
        const e = {
          "gid": `${GithubReleaseID}`,
          "clan_steamid": SteamClanSteamID,
          "event_name": "41.20250315: Stable (F41.20250315)",
          "event_type": 12,
          "appid": 1675200,
          "server_address": "",
          "server_password": "",
          "rtime32_start_time": 1741648320,
          "rtime32_end_time": 1741653001,
          "comment_count": 0,
          "creator_steamid": "0",
          "last_update_steamid": "0",
          "event_notes": "see announcement body",
          "jsondata": "{\n\t\"localized_subtitle\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_summary\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_title_image\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_capsule_image\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"bSaleEnabled\": false,\n\t\"sale_show_creator\": false,\n\t\"sale_sections\": [\n\n\t]\n\t,\n\t\"sale_browsemore_text\": \"\",\n\t\"sale_browsemore_url\": \"\",\n\t\"sale_browsemore_color\": \"\",\n\t\"sale_browsemore_bgcolor\": \"\",\n\t\"localized_sale_header\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_sale_overlay\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_sale_product_banner\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_sale_product_mobile_banner\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_sale_logo\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"sale_font\": \"\",\n\t\"sale_background_color\": \"\",\n\t\"sale_header_offset\": 150,\n\t\"referenced_appids\": [\n\n\t]\n\t,\n\t\"bBroadcastEnabled\": false,\n\t\"broadcastChatSetting\": \"hide\",\n\t\"default_broadcast_title\": \"#Broadcast_default_title_dev\",\n\t\"localized_broadcast_title\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_broadcast_left_image\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_broadcast_right_image\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"broadcast_whitelist\": [\n\n\t]\n\t,\n\t\"bScheduleEnabled\": false,\n\t\"scheduleEntries\": [\n\n\t]\n\t,\n\t\"valve_access_log\": [\n\t\t{\n\t\t\t\"strSteamID\": \"76561197979253178\",\n\t\t\t\"rtUpdated\": 1741648377\n\t\t},\n\t\t{\n\t\t\t\"strSteamID\": \"76561198840299494\",\n\t\t\t\"rtUpdated\": 1741740761\n\t\t}\n\t]\n\t,\n\t\"clone_from_event_gid\": \"519706073503894980\",\n\t\"clone_from_sale_enabled\": false,\n\t\"automatically_push_updated_source\": true\n}",
          "announcement_body": {
              "gid": `${GithubReleaseID}`,
              "clanid": SteamClanID,
              "posterid": "0",
              "headline": "41.20250315: Stable (F41.20250315)",
              "posttime": 1741648380,
              "updatetime": 1741740761,
              "body": "This is an automatically generated changelog for release [code single]41.20250315[/code].\n\nFrom previous [code single]stable[/code] version [code single]41.20250314[/code] there have been the following changes. [b]One package per new version shown.[/b]\n\n### Major packages\n| Name | Version |\n| --- | --- |\n| [b]Kernel[/b] | 6.13.6-103.bazzite |\n| [b]Firmware[/b] | 20250211-1 |\n| [b]Mesa[/b] | 25.0.1-5 ➡️ 25.0.1-6 |\n| [b]Gamescope[/b] | 110.d3174928-1.bazzite |\n| [b]Gnome[/b] | 47.3-1 |\n| [b]KDE[/b] | 6.3.2-1 ➡️ 6.3.3-1 |\n| [b][url=https://github.com/hhd-dev/hhd]HHD[/url][/b] | 3.13.4-1 ➡️ 3.13.5-1 |\n\n### Commits\n| Hash | Subject |\n| --- | --- |\n| [b][url=https://github.com/ublue-os/bazzite/commit/cf92043b04d30a7916e0bf45feba95e7d2460579]cf92043[/url][/b] | fix: make CODEOWNERS work (#2395) |\n| [b][url=https://github.com/ublue-os/bazzite/commit/2b43c13fa8ce60128be16c7737002f631ee671b5]2b43c13[/url][/b] | feat: Change Discover shortcut to launch exclusively using the flatpak backend (#2394) |\n| [b][url=https://github.com/ublue-os/bazzite/commit/a5c579de7f50990b9332df716b8d3d312cc8e931]a5c579d[/url][/b] | chore(art): Add giants artwork from SCaLE 22x talk |\n| [b][url=https://github.com/ublue-os/bazzite/commit/6d6c4b8cd4a968bd0e6d2ba72ca054099ae274d3]6d6c4b8[/url][/b] | chore: Remove unneeded spec_files folder |\n| [b][url=https://github.com/ublue-os/bazzite/commit/375a1993cc53f6f13ba41b5a4500e7274fd33a1a]375a199[/url][/b] | fix: add msi claw ids (#2392) |\n| [b][url=https://github.com/ublue-os/bazzite/commit/ed54f2327a2c2163b9a87205e0d6ee1302b6e5a5]ed54f23[/url][/b] | chore(deps): pin dependencies (#2391) |\n| [b][url=https://github.com/ublue-os/bazzite/commit/e523098aaa00c35d2aab80e2ae3fca96a4085b32]e523098[/url][/b] | ci: move to best-practices config for renovate (#2390) |\n| [b][url=https://github.com/ublue-os/bazzite/commit/b266d1ca5569cf6821062154fe79921df9f10c0c]b266d1c[/url][/b] | fix: downgrade dnf5 to avoid regression exposed by Terra (#2389) |\n| [b][url=https://github.com/ublue-os/bazzite/commit/e219f4ea0a07705a5b99fbc035d95dd04dd439f5]e219f4e[/url][/b] | fix: port changes from dnf to yum (#2384) |\n| [b][url=https://github.com/ublue-os/bazzite/commit/0982eda834e2dee52497b9758f6b99711eb298de]0982eda[/url][/b] | feat: Replace old media-automount-generator package working one (#2387) |\n| [b][url=https://github.com/ublue-os/bazzite/commit/fd37bd5993d13255ed4682def22ab65d7bad8cd9]fd37bd5[/url][/b] | chore: Add antheas to CODEOWNERS |\n| [b][url=https://github.com/ublue-os/bazzite/commit/e64c93aa51fc0f36851c8772eafaa513955985d8]e64c93a[/url][/b] | chore(deps): update docker/login-action digest to 74a5d14 (#2383) |\n\n### All Images\n| | Name | Previous | New |\n| --- | --- | --- | --- |\n| ✨ | ublue-os-media-automount-udev | | 0.1-1 |\n| 🔄 | davs2-libs | 1.6-5.20220903gitb41cf11 | 1.7^20220903gitb41cf11-6 |\n| 🔄 | exiv2 | 0.28.4-1 | 0.28.5-1 |\n| 🔄 | fzf | 0.60.2-1 | 0.60.3-1 |\n| 🔄 | libde265 | 1.0.15-1 | 1.0.15^20250123gitb67f401-2 |\n| 🔄 | libfreeaptx | 0.1.1-1 | 0.2.2-1 |\n| 🔄 | libical | 3.0.19-1 | 3.0.20-1 |\n| 🔄 | libxslt | 1.1.42-2 | 1.1.43-1 |\n| 🔄 | python3-protobuf | 5.29.3-1 | 6.30.1-2 |\n| 🔄 | xavs2-libs | 1.3-5.20190422giteae1e8b | 1.4-1 |\n\n### Deck Images\n| | Name | Previous | New |\n| --- | --- | --- | --- |\n| 🔄 | hhd | 3.13.4-1 | 3.13.5-1 |\n\n### KDE Images\n| | Name | Previous | New |\n| --- | --- | --- | --- |\n| 🔄 | openxr-libs | 1.1.45-1 | 1.1.46-1 |\n\n### Gnome Images\n| | Name | Previous | New |\n| --- | --- | --- | --- |\n| 🔄 | libical-glib | 3.0.19-1 | 3.0.20-1 |\n\n\n\n### How to rebase\nFor current users, type the following to rebase to this version:\n``[code single]bash\n# For this branch (if latest):\nbazzite-rollback-helper rebase stable\n# For this specific image:\nbazzite-rollback-helper rebase 41.20250315\n[/code]``\n",
              "commentcount": 0,
              "tags": [
                  "patchnotes",
                  "stablechannel",
              ],
              "language": 0,
              "hidden": 0,
              "forum_topic_id": "0",
              "event_gid": "0",
              "voteupcount": 0,
              "votedowncount": 0,
              "ban_check_result": 0,
              "banned": 0
          },
          "published": 1,
          "hidden": 0,
          "rtime32_visibility_start": 0,
          "rtime32_visibility_end": 0,
          "broadcaster_accountid": 0,
          "follower_count": 0,
          "ignore_count": 0,
          "forum_topic_id": "0",
          "rtime32_last_modified": 1742267679,
          "news_post_gid": "0",
          "rtime_mod_reviewed": 0,
          "featured_app_tagid": 0,
          "referenced_appids": [],
          "build_id": 0,
          "build_branch": "",
          "unlisted": 0,
          "votes_up": 0,
          "votes_down": 0,
          "comment_type": "ForumTopic",
          "gidfeature": "0",
          "gidfeature2": "0"
        };

        // @ts-ignore
        let lookupKey = this.GetEventLookupKey(e);

        // @ts-ignore
        if (!this.m_mapExistingEvents.has(lookupKey)) {
          let steamId = new SteamID(e.clan_steamid);

          // @ts-ignore
          this.InsertEventModelFromClanEventData(steamId, e)
        }
        
        // @ts-ignore
        return [this.m_mapExistingEvents.get(lookupKey)]
      } else {
        return ret;
      }
    }
  );
}
