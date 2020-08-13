<script>
  import { loginUser } from "./user.js";
  import { createEventDispatcher } from "svelte";

  let isOpen = false;

  export let isLoggedIn;

  const dispatch = createEventDispatcher();

  const login = (event) =>
    loginUser(event).then((data) => dispatch("auth", data));

  const logout = () => {
    dispatch("auth", { wallet: null, address: null });
    window.location.href = "#";
  };

  function handleClick() {
    isOpen = !isOpen;
  }
</script>

<header class="bg-gray-900 sm:flex sm:items-center sm:justify-between">
  <div class="flex justify-between px-4 py-3">
    <div class="text-3xl text-blue-400 font-extrabold">SyllabusWeave</div>
    <div class="flex sm:hidden">
      <button
        on:click={handleClick}
        type="button"
        aria-label="Menu"
        class="px-2 text-gray-500 hover:text-white focus:outline-none
        focus:text-white">
        <svg
          class="h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          {#if isOpen == true}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1
              1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1
              1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828
              4.829 4.828 4.828z" />
          {:else}
            <path
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1
              1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
          {/if}
        </svg>
      </button>
    </div>
  </div>
  {#if isOpen == false}
    <nav class="hidden sm:flex sm:items-center sm:px-4">
      <div class="hidden">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            class="h-6 w-6 fill-current text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12
              2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1
              1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </div>
        <input
          class="block w-full border border-transparent bg-gray-200
          focus:outline-none focus:bg-white focus:border-gray-300 text-gray-900
          rounded-lg pl-10 pr-4 py-2"
          placeholder="Search for topics" />
      </div>
      <div class="sm:flex sm:items-center">
        <div
          class="px-2 pt-2 pb-5 border-b border-gray-800 sm:flex sm:border-b-0
          sm:py-0 sm:px-0">
          {#if isLoggedIn}
            <a
              href="#/home"
              class="uppercase block px-3 py-1 rounded font-semibold text-white
              hover:bg-gray-700 sm:text-sm sm:px-2">
              Syllabi
            </a>
            <a
              href="#/editor"
              class="uppercase block px-3 py-1 rounded font-semibold text-white
              hover:bg-gray-700 sm:text-sm sm:px-2">
              List Your Syllabus
            </a>
            <div>
              <button
                type="button"
                aria-label="Menu"
                class="uppercase mt-1 block px-3 py-1 rounded font-semibold
                text-white hover:bg-gray-700 sm:mt-0 sm:text-sm sm:px-2 sm:ml-2"
                on:click={logout}>
                Logout
              </button>
            </div>
          {:else}
            <a
              href="#/home"
              class="uppercase block px-3 py-1 rounded font-semibold text-white
              hover:bg-gray-700 sm:text-sm sm:px-2">
              Syllabi
            </a>
            <div>
              <label
                class="uppercase mt-1 block px-3 py-1 rounded font-semibold
                text-white hover:bg-gray-700 sm:mt-0 sm:text-sm sm:px-2 sm:ml-2">
                Login
                <input
                  type="file"
                  accept="application/json"
                  class="hidden"
                  on:change={login} />
              </label>
            </div>
          {/if}
        </div>
      </div>
    </nav>
  {:else}
    <nav class="block sm:flex sm:items-center sm:px-4">
      <div class="hidden">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            class="h-6 w-6 fill-current text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12
              2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1
              1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </div>
        <input
          class="block w-full border border-transparent bg-gray-200
          focus:outline-none focus:bg-white focus:border-gray-300 text-gray-900
          rounded-lg pl-10 pr-4 py-2"
          placeholder="Search by keywords" />
      </div>
      <div class="sm:flex sm:items-center">
        <div
          class="px-2 pt-2 pb-5 border-b border-gray-800 sm:flex sm:border-b-0
          sm:py-0 sm:px-0">
          {#if isLoggedIn}
            <a
              href="#/home"
              class="uppercase block px-3 py-1 rounded font-semibold text-white
              hover:bg-gray-700 sm:text-sm sm:px-2">
              Syllabi
            </a>
            <a
              href="#/editor"
              class="uppercase block px-3 py-1 rounded font-semibold text-white
              hover:bg-gray-700 sm:text-sm sm:px-2">
              List Your Syllabus
            </a>
            <div>
              <button
                type="button"
                aria-label="Menu"
                class="uppercase mt-1 block px-3 py-1 rounded font-semibold
                text-white hover:bg-gray-700 sm:mt-0 sm:text-sm sm:px-2 sm:ml-2"
                on:click={logout}>
                Logout
              </button>
            </div>
          {:else}
            <a
              href="https://google.com"
              class="uppercase block px-3 py-1 rounded font-semibold text-white
              hover:bg-gray-700 sm:text-sm sm:px-2">
              Syllabi
            </a>
            <div>
              <label
                class="uppercase mt-1 block px-3 py-1 rounded font-semibold
                text-white hover:bg-gray-700 sm:mt-0 sm:text-sm sm:px-2 sm:ml-2">
                Login
                <input
                  type="file"
                  accept="application/json"
                  class="hidden"
                  on:change={login} />
              </label>
            </div>
          {/if}
        </div>
      </div>
    </nav>
  {/if}
</header>
