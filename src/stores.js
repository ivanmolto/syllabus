import { writable } from 'svelte/store';
function createSearchStore() {
  const { subscribe, set } = writable('');
  return {
    subscribe,
    apply: (term) => set(term)
  };
}
function createSubjectsStore() {
  const { subscribe, set } = writable('All');
  return {
    subscribe,
    apply: (filter) => set(filter)
  };
}
function createLanguagesStore() {
  const { subscribe, set } = writable('All');
  return {
    subscribe,
    apply: (filter) => set(filter)
  };
}
function createBadgesStore() {
  const { subscribe, set } = writable('All');
  return {
    subscribe,
    apply: (filter) => set(filter)
  };
}
function createMentorsStore() {
  const { subscribe, set } = writable('All');
  return {
    subscribe,
    apply: (filter) => set(filter),
  }
}
export const subjectsStore = createSubjectsStore();
export const languagesStore = createLanguagesStore();
export const badgesStore = createBadgesStore();
export const mentorsStore = createMentorsStore();
export const searchStore = createSearchStore();
export const syllabiStore = writable([]);
export const syllabiByMentorStore = writable([]);
export const avatarStore = writable([]);
