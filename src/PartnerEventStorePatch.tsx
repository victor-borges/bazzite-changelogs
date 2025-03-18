import { findModuleExport } from "@decky/ui";
import { afterPatch } from "decky-frontend-lib";
import remarkHtml from "remark-html"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import {unified} from "unified"
import html2bbcode from "./html2bbcode";
import {Mutex} from 'async-mutex';

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

const steamClanSteamID = "103582791470414830";
const steamClanID = "40893422";
const githubReleasesURI = "https://api.github.com/repos/ublue-os/bazzite/releases"
const steamOSAppId = 1675200;

const mutex = new Mutex();
let release: any;

export function patchPartnerEventStore() {
  return afterPatch(
    PartnerEventStore.prototype,
    "InternalLoadAdjacentPartnerEvents",
    async function(args, ret) {
      let [e, t, r, appId, i, o, c, u] = args;

      if (appId !== steamOSAppId) {
        return ret;
      }

      ret.length = 0;

      // @ts-ignore
      if (this.m_mapAdjacentAnnouncementGIDs.has(t)) {
        // @ts-ignore
        let e = this.m_mapAdjacentAnnouncementGIDs.get(t)
          , r = new Array;
        if (e.forEach((e => {
            // @ts-ignore
            if (this.m_mapAnnouncementBodyToEvent.has(e)) {
                // @ts-ignore
                let t = this.m_mapAnnouncementBodyToEvent.get(e);
                // @ts-ignore
                ret.push(this.m_mapExistingEvents.get(t))
            } else
                r.push(e)
        }
        )),
        r.length > 0) {
            // @ts-ignore
            (await this.LoadBatchPartnerEventsByEventGIDsOrAnnouncementGIDs(null, r, u)).forEach((e => ret.push(e)))
        }
      }

      if (ret.length > 0)
        return ret;

      await mutex.runExclusive(async () => {
        if (release)
          return;

        const response = await fetch(githubReleasesURI);
        
        if (!response.ok)
          return;

        const releases: Array<any> = await response.json();

        if (releases.length == 0) {
          return;
        }

        releases.sort((a, b) => (new Date(b.created_at)).getTime() - (new Date(a.created_at)).getTime());

        if (c?.require_tags && c?.require_tags?.includes("stablechannel")) {
          release = releases.find(r => !r.prerelease);
        } else if (c?.require_tags && c?.require_tags?.includes("betachannel")) {
          release = releases.find(r => r.prerelease);
        } else {
          release = releases.at(0)
        }
      });
      
      if (!release)
        return ret;

      const releaseCreatedAt = Math.floor((new Date(release.created_at)).getTime() / 1000);

      const html = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkHtml)
        .process(release.body);

      const converter = new (html2bbcode.HTML2BBCode)();
      const bbcode = converter.feed(html.value);

      // @ts-ignore
      const event = {
        "gid": String(release.id),
        "clan_steamid": steamClanSteamID,
        "event_name": release.name,
        "event_type": 12,
        "appid": 1675200,
        "server_address": "",
        "server_password": "",
        "rtime32_start_time": releaseCreatedAt,
        "rtime32_end_time": releaseCreatedAt,
        "comment_count": 0,
        "creator_steamid": "0",
        "last_update_steamid": "0",
        "event_notes": "see announcement body",
        "jsondata": "{\n\t\"localized_subtitle\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_summary\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_title_image\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_capsule_image\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"bSaleEnabled\": false,\n\t\"sale_show_creator\": false,\n\t\"sale_sections\": [\n\n\t]\n\t,\n\t\"sale_browsemore_text\": \"\",\n\t\"sale_browsemore_url\": \"\",\n\t\"sale_browsemore_color\": \"\",\n\t\"sale_browsemore_bgcolor\": \"\",\n\t\"localized_sale_header\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_sale_overlay\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_sale_product_banner\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_sale_product_mobile_banner\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_sale_logo\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"sale_font\": \"\",\n\t\"sale_background_color\": \"\",\n\t\"sale_header_offset\": 150,\n\t\"referenced_appids\": [\n\n\t]\n\t,\n\t\"bBroadcastEnabled\": false,\n\t\"broadcastChatSetting\": \"hide\",\n\t\"default_broadcast_title\": \"#Broadcast_default_title_dev\",\n\t\"localized_broadcast_title\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_broadcast_left_image\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"localized_broadcast_right_image\": [\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull,\n\t\tnull\n\t]\n\t,\n\t\"broadcast_whitelist\": [\n\n\t]\n\t,\n\t\"bScheduleEnabled\": false,\n\t\"scheduleEntries\": [\n\n\t]\n\t,\n\t\"valve_access_log\": [\n\t\t{\n\t\t\t\"strSteamID\": \"76561197979253178\",\n\t\t\t\"rtUpdated\": 1741648377\n\t\t},\n\t\t{\n\t\t\t\"strSteamID\": \"76561198840299494\",\n\t\t\t\"rtUpdated\": 1741740761\n\t\t}\n\t]\n\t,\n\t\"clone_from_event_gid\": \"519706073503894980\",\n\t\"clone_from_sale_enabled\": false,\n\t\"automatically_push_updated_source\": true\n}",
        "announcement_body": {
            "gid": String(release.id),
            "clanid": steamClanID,
            "posterid": "0",
            "headline": `Bazzite ${release.name}`,
            "posttime": releaseCreatedAt,
            "updatetime": releaseCreatedAt,
            "body": bbcode.toString(),
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
        "rtime32_last_modified": releaseCreatedAt,
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
      let lookupKey = this.GetEventLookupKey(event);

      // @ts-ignore
      if (!this.m_mapExistingEvents.has(lookupKey)) {
        let steamId = new SteamID(event.clan_steamid);

        // @ts-ignore
        this.InsertEventModelFromClanEventData(steamId, event)
      }
      
      // @ts-ignore
      return [this.m_mapExistingEvents.get(lookupKey)]
    }
  );
}
