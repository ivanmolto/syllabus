<script>
  import { onMount } from "svelte";
  import { avatarStore } from "./stores.js";
  import { get } from "./arweaveid.js";
  import { getIdenticon } from "arweave-id";
  export let address;
  let arId;
  onMount(async () => {
    arId = await get(address);
    let avatar = arId.avatarDataUri || getIdenticon(address);
    avatarStore.set(avatar);
  });
</script>

<div
  class="relative block rounded-full overflow-hidden border-2 border-gray-600">
  <img class="h-8 w-8 object-cover" src={$avatarStore} alt="Your avatar" />
</div>
