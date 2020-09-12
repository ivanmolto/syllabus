<script>
  import SyllabusGridAddress from "./SyllabusGridAddress.svelte";
  import { syllabiByMentorStore } from "./stores.js";
  import { onMount } from "svelte";
  import { syllabiByAddress } from "./syllabi.js";
  import { documentTitle } from "./helpers.js";
  export let txid;
  let syllabiMentorized = [];
  let syllabiAddress = [];
  onMount(async () => {
    syllabiAddress = await syllabiByAddress(txid);
    for (let i = 0; i < syllabiAddress.length; i++) {
      let item = {
        id: syllabiAddress[i].id,
        title: syllabiAddress[i].tags["Title"],
        subtitle: syllabiAddress[i].tags["Subtitle"],
        imageUrl: syllabiAddress[i].tags["ImageUrl"],
        duration: syllabiAddress[i].tags["Duration"],
        language: syllabiAddress[i].tags["Language"],
        rating: syllabiAddress[i].tags["Rating"],
        reviewCount: syllabiAddress[i].tags["ReviewCount"],
        isFavorite: syllabiAddress[i].tags["IsFavorite"],
        badge: syllabiAddress[i].tags["Badge"],
        author: syllabiAddress[i].tags["Author"],
        mentorAvailable: syllabiAddress[i].tags["Mentor"],
        price: syllabiAddress[i].tags["Price"],
        subject: syllabiAddress[i].tags["Subject"],
        status: syllabiAddress[i].tags["Status"],
        apiVersion: syllabiAddress[i].tags["API"],
        timestamp: syllabiAddress[i].tags["Timestamp"],
        content: syllabiAddress[i].data,
      };
      syllabiMentorized.push(item);
    }
    syllabiByMentorStore.set(syllabiMentorized);
    documentTitle("Mentor");
  });
</script>

<SyllabusGridAddress {txid} syllabiByMentorStore={$syllabiByMentorStore} />
