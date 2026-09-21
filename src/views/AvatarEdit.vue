<template>
  <layout-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="back"></ion-icon>
        </ion-buttons>
        <ion-title>Update Avatar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div style="text-align: center; padding: 16px 0 6px">
        <ion-avatar style="margin: 0 auto; width: 110px; height: 110px">
          <img :src="selectedAvatar" />
        </ion-avatar>
      </div>

      <section style="padding: 12px 16px">
        <ion-button expand="block" :disabled="!canEditAvatar || isSaving" @click="save">Save</ion-button>
        <ion-button expand="block" color="light" @click="back">Cancel</ion-button>
      </section>

      <div style="padding: 8px 12px 0">
        <div
          style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center"
        >
          <button
            v-for="avatar of avatarOptions"
            :key="avatar"
            type="button"
            @click="selectAvatar(avatar)"
            :disabled="!canEditAvatar"
            :style="{
              border: selectedAvatar === avatar ? '2px solid var(--ion-color-secondary)' : '2px solid transparent',
              borderRadius: '999px',
              padding: '2px',
              background: 'transparent',
              opacity: canEditAvatar ? 1 : 0.65,
              cursor: canEditAvatar ? 'pointer' : 'default'
            }"
          >
            <ion-avatar style="width: 64px; height: 64px">
              <img :src="avatar" />
            </ion-avatar>
          </button>
        </div>
      </div>

      <div style="color: red; padding: 0 16px 16px">{{ error }}</div>
    </ion-content>
  </layout-menu>
</template>

<script>
import fetch from "@/services/fetch";
import Authentication from "@/services/Authentication";
import TournamentAPI from "@/services/TournamentAPI";
import LayoutMenu from "@/components/LayoutMenu.vue";

const authentication = new Authentication();
const tournamentAPI = new TournamentAPI();

export default {
  name: "AvatarEdit",
  components: { LayoutMenu },
  data() {
    const avatarOptions = [
      "/images/avatars/agent.png",
      "/images/avatars/default-avatar.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0001.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0002.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0003.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0004.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0005.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0006.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0007.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0008.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0009.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0010.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0011.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0012.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0013.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0014.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0015.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0016.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0017.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0018.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0019.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0020.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0021.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0022.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0023.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0024.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0025.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0026.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0027.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0028.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0029.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0030.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0031.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0032.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0033.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0034.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0035.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0036.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0037.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0038.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0039.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0040.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0041.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0042.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0043.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0044.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0045.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0046.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0047.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0048.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0049.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0050.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0051.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0052.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0053.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0054.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0055.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0056.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0057.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0058.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0059.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0060.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0061.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0062.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0063.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0064.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0065.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0066.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0067.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0068.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0069.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0070.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0071.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0072.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0073.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0074.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0075.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0076.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0077.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0078.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0079.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0080.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0081.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0082.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0083.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0084.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0085.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0086.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0087.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0088.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0089.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0090.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0091.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0092.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0093.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0094.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0095.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0096.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0097.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0098.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0099.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0100.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0101.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0102.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0103.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0104.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0105.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0106.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0107.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0108.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0109.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0110.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0111.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0112.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0113.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0114.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0115.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0116.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0117.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0118.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0119.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0120.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0121.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0122.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0123.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0124.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0125.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0126.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0127.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0128.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0129.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0130.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0131.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0132.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0133.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0134.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0135.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0136.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0137.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0138.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0139.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0140.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0141.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0142.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0143.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0144.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0145.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0146.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0147.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0148.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0149.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0150.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0151.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0152.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0153.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0154.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0155.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0156.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0157.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0158.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0159.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0160.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0161.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0162.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0163.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0164.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0165.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0166.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0167.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0168.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0169.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0170.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0171.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0172.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0173.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0174.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0175.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0176.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0177.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0178.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0179.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0180.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0181.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0182.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0183.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0184.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0185.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0186.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0187.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0188.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0189.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0190.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0191.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0192.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0193.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0194.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0195.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0196.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0197.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0198.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0199.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0200.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0201.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0202.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0203.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0204.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0205.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0206.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0207.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0208.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0209.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0210.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0211.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0212.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0213.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0214.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0215.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0216.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0217.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0218.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0219.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0220.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0221.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0222.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0223.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0224.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0225.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0226.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0227.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0228.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0229.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0230.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0231.png",
      "https://cardsjd.com/cribbage/game/assets/Avatars/vv/AvatarVV_0232.png",
    ];

    const tournamentId = this.$route.params.tournament;
    const playerId = this.$route.params.id;
    const user = authentication.getUser();

    return {
      tournamentId,
      playerId,
      player: {},
      isSaving: false,
      error: "",
      canEditAvatar: false,
      userId: user && (user.userName || user.username) ? (user.userName || user.username) : null,
      userEmail: user && user.email ? user.email : null,
      userRoles: user && user.roles ? user.roles : {},
      avatarOptions,
    };
  },
  computed: {
    selectedAvatar() {
      return this.player.avatar || "/images/avatars/agent.png";
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    selectAvatar(avatar) {
      if (!this.canEditAvatar) return;
      this.player.avatar = avatar;
    },
    evaluateAvatarAccess(player) {
      const tournamentId = this.tournamentId;
      const userRoles = this.userRoles || {};
      const userId = this.userId;
      const userEmail = this.userEmail;

      const playerEmail = (player && player.email ? player.email : "").toLowerCase();
      const normalizedUserEmail = (userEmail || "").toLowerCase();
      const normalizedUserId = (userId || "").toLowerCase();

      const isSelfPlayer = !!(
        player &&
        ((normalizedUserEmail && playerEmail === normalizedUserEmail) ||
          (normalizedUserId && playerEmail === normalizedUserId))
      );

      let tournamentRole = null;
      if (Array.isArray(userRoles)) {
        if (userRoles.includes(tournamentId + "-Admin")) {
          tournamentRole = "Admin";
        } else if (userRoles.includes(tournamentId + "-Recorder")) {
          tournamentRole = "Recorder";
        }
      }

      const hasTournamentAccess = tournamentRole === "Admin" || tournamentRole === "Recorder";
      this.canEditAvatar = isSelfPlayer || hasTournamentAccess;

      if (!this.canEditAvatar) {
        this.error = "You do not have permission to edit this avatar.";
      }
    },
    async loadData() {
      this.error = "";
      const playerId = this.playerId;
      if (!playerId) return;

      await fetch
        .get(`player/${playerId}`)
        .then((response) => {
          this.player = response.data || {};
          if (!this.player.avatar) {
            this.player.avatar = "/images/avatars/agent.png";
          }
          this.evaluateAvatarAccess(this.player);
        })
        .catch((e) => {
          this.error = "Error: Load failed";
          console.warn(e);
        });

      if (!this.canEditAvatar) {
        await tournamentAPI
          .tournamentView(this.tournamentId)
          .then(() => {
            this.evaluateAvatarAccess(this.player);
          })
          .catch((e) => {
            console.warn(e);
          });
      }
    },
    async save() {
      if (!this.canEditAvatar || !this.playerId) return;

      this.error = "";
      this.isSaving = true;

      await fetch
        .put(`player/${this.playerId}`, this.player)
        .then(() => {
          this.$router.go(-1);
        })
        .catch((e) => {
          this.error = "Error: Save failed";
          console.warn(e);
        });

      this.isSaving = false;
    },
  },
  created() {
    this.loadData();
  },
};
</script>
