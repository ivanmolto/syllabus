<script>
  import { onMount } from "svelte";
  import SyllabusGrid from "./SyllabusGrid.svelte";
  import { documentTitle } from "./helpers.js";
  import { syllabiByApp } from "./syllabi.js";
  import { syllabiStore } from "./stores.js";
  let tempSyllabi = [];
  let syllabi = [];
  onMount(async () => {
    tempSyllabi = await syllabiByApp();
    for (let i = 0; i < tempSyllabi.length; i++) {
      let item = {
        id: tempSyllabi[i].id,
        title: tempSyllabi[i].tags["Title"],
        subtitle: tempSyllabi[i].tags["Subtitle"],
        imageUrl: tempSyllabi[i].tags["ImageUrl"],
        duration: tempSyllabi[i].tags["Duration"],
        language: tempSyllabi[i].tags["Language"],
        badge: tempSyllabi[i].tags["Badge"],
        author: tempSyllabi[i].tags["Author"],
        mentorAvailable: tempSyllabi[i].tags["Mentor"],
        price: tempSyllabi[i].tags["Price"],
        subject: tempSyllabi[i].tags["Subject"],
        status: tempSyllabi[i].tags["Status"],
        apiVersion: tempSyllabi[i].tags["API"],
        timestamp: tempSyllabi[i].tags["Timestamp"],
        content: tempSyllabi[i].data,
      };
      syllabi.push(item);
    }
    syllabiStore.set(syllabi);
    documentTitle();
  });
</script>

<style global>
  @import "https://fmy6vqrft54pubhx23wgfutpi2g27rf4fuayhrpfmffgt23c52jq.arweave.net/KzHqwiWfePoE99bsYtJvRo2vxLwtAYPF5WFKaeti7pM";
</style>

<SyllabusGrid syllabiStore={$syllabiStore} />
