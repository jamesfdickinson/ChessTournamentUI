<template>
  <layout-no-menu>
    <ion-page class="ion-page" main>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
          </ion-buttons>
          <ion-title>Change Log</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="change-log-page">
          <div class="change-log-header">
            <h1>Tournament JD Change Log</h1>
            <p>Recent product changes collected from project history.</p>
          </div>

          <section v-for="entry in entries" :key="entry.date + entry.title" class="change-log-entry">
            <div class="change-log-meta">
              <div class="change-log-date">{{ entry.date }}</div>
              <div class="change-log-title">{{ entry.title }}</div>
            </div>
            <ul>
              <li v-for="item in entry.items" :key="item">{{ item }}</li>
            </ul>
          </section>
        </div>
      </ion-content>
    </ion-page>
  </layout-no-menu>
</template>

<script>
import LayoutNoMenu from "@/components/LayoutNoMenu.vue";

export default {
  name: "ChangeLog",
  components: {
    LayoutNoMenu,
  },
  metaInfo: {
    title: "Tournament JD - Change Log",
    titleTemplate: null,
    meta: [{ name: "description", content: "Tournament JD release notes and recent product changes." }],
  },
  data() {
    return {
      entries: [
        {
          date: "2026-03-17",
          title: "Team Links And Back Navigation",
          items: [
            "Linked team names in the team score rank report to the Team page.",
            "Linked team names in the detailed score group rank report to the Team page."
          ],
        },
        {
          date: "2026-03-16",
          title: "iPhone Input Zoom Fix",
          items: [
            "Fixed an iPhone/iOS Safari issue where focusing small text inputs could zoom the page and leave it visually stuck until refresh.",
            "Updated viewport behavior and applied iOS-specific 16px text-entry sizing to prevent Safari auto-zoom on focus.",
            "Included follow-up sizing cleanup for iOS text boxes and search fields.",
          ],
        },
        {
          date: "2026-03-16",
          title: "Tournament View Cleanup",
          items: [
            "Hide the game-room watch icon when a watch link is not available.",
          ],
        },
        {
          date: "2026-03-13",
          title: "Teams And Profiles",
          items: [
            "Added a Teams page and team navigation improvements.",
            "Added avatar editing support.",
            "Added team links and team-related cleanup in group reports.",
          ],
        },
        {
          date: "2026-03-13",
          title: "Chat And Team Management",
          items: [
            "Removed system chat sounds for system messages.",
            "Added chat and player team change updates.",
          ],
        },
        {
          date: "2026-03-12",
          title: "Check-In And Round Settings",
          items: [
            "Renamed check-in settings to allowSelfCheckIn and requireCheckInEveryRound for clearer admin options.",
            "Removed the play timer where it was no longer needed.",
            "Removed unused tournament socket API code.",
          ],
        },
        {
          date: "2026-03-11",
          title: "Team Report Improvements",
          items: [
            "Cleaned up group team reports and improved responsive behavior.",
            "Added allow team change options and reorganized related settings.",
          ],
        },
        {
          date: "2026-03-06",
          title: "Registration And Host Access",
          items: [
            "Show all players registered by a user during registration flows.",
            "Improved request host access flow and cleaned up game type handling.",
          ],
        },
        {
          date: "2026-03-03",
          title: "PlayGame And Stats",
          items: [
            "Added play-game end time handling.",
            "Added report tournament stats updates.",
          ],
        },
        {
          date: "2026-02-28",
          title: "Gameplay Timing Fixes",
          items: [
            "Fixed end-of-tournament last-round play timing.",
            "Improved start and end time handling in PlayGame.",
            "Added support for round times during gameplay.",
          ],
        },
        {
          date: "2026-02-21",
          title: "Hosting, Auth, And Deployment",
          items: [
            "Added authentication, host request, and host management improvements.",
            "Added PlayGame stream support.",
            "Updated Azure App Service deployment workflow configuration.",
          ],
        },
        {
          date: "2026-02-07",
          title: "Payment Beta",
          items: [
            "Added payment beta support.",
            "Added player registration and cart flow updates.",
          ],
        },
        {
          date: "2025-12-18",
          title: "Verification Updates",
          items: [
            "Added required verified email support.",
            "Added verified button and status updates.",
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.change-log-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 24px 16px 48px;
}

.change-log-header {
  margin-bottom: 24px;
}

.change-log-header h1 {
  margin: 0 0 8px;
}

.change-log-header p {
  margin: 0;
  color: var(--ion-color-medium);
}

.change-log-entry {
  background: #ffffff;
  border: 1px solid #d7dde5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.change-log-meta {
  margin-bottom: 10px;
}

.change-log-date {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ion-color-primary);
}

.change-log-title {
  font-size: 22px;
  font-weight: 600;
  margin-top: 4px;
}

.change-log-entry ul {
  margin: 0;
  padding-left: 20px;
}

.change-log-entry li + li {
  margin-top: 6px;
}
</style>