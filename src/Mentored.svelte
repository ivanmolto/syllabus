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
        title: syllabiAddress[i].tags["Syllabus-Title"],
        subtitle: syllabiAddress[i].tags["Syllabus-Subtitle"],
        imageUrl: syllabiAddress[i].tags["Syllabus-ImageUrl"],
        duration: syllabiAddress[i].tags["Syllabus-Duration"],
        language: syllabiAddress[i].tags["Syllabus-Language"],
        rating: syllabiAddress[i].tags["Syllabus-Rating"],
        reviewCount: syllabiAddress[i].tags["Syllabus-ReviewCount"],
        isFavorite: syllabiAddress[i].tags["Syllabus-IsFavorite"],
        badge: syllabiAddress[i].tags["Syllabus-Badge"],
        author: syllabiAddress[i].tags["Syllabus-Author"],
        mentorAvailable: syllabiAddress[i].tags["Syllabus-Mentor"],
        price: syllabiAddress[i].tags["Syllabus-Price"],
        subject: syllabiAddress[i].tags["Syllabus-Subject"],
        status: syllabiAddress[i].tags["Syllabus-Status"],
        apiVersion: syllabiAddress[i].tags["Syllabus-API"],
        timestamp: syllabiAddress[i].tags["Syllabus-Timestamp"],
        content: syllabiAddress[i].data,
      };
      syllabiMentorized.push(item);
    }
    syllabiByMentorStore.set(syllabiMentorized);
    documentTitle("Mentor");
  });
</script>

<SyllabusGridAddress {txid} syllabiByMentorStore={$syllabiByMentorStore} />
