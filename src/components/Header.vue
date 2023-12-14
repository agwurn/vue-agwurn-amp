<template>
  <header>
    <!-- <div class="app_name">Web Guitar Amp Mini</div> -->
    <div class="wrap">
      <h1><a href="https://portfolio.agwurn.me/">agwurn</a> |</h1>
      <ul>
        <li
          v-if="!platformStore.user.name"
          @click="handleSignIn"
          class="google-login-wrap"
        >
          <img src="../assets/icons8-google.svg" alt="google" />
          Login
        </li>
        <div class="user-info" v-if="platformStore.user.name">
          <li>
            <img :src="platformStore.user.photo" alt="頭貼" />
          </li>
          <li>{{ platformStore.user.name }}</li>
          <li id="logOut" @click="handleLogout">Log out</li>
        </div>
        <!-- <a target="_blank" href="https://icons8.com/icon/DJgXlKerU6K0/google">Google</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> -->
        <li
          :class="platformStore.control.navSelect === 'about' ? 'active' : ''"
          @click="() => (platformStore.control.navSelect = 'about')"
        >
          About
        </li>
        <li
          :class="platformStore.control.navSelect === 'qna' ? 'active' : ''"
          @click="() => (platformStore.control.navSelect = 'qna')"
        >
          Q&A
        </li>
        <li
          :class="platformStore.control.navSelect === 'contact' ? 'active' : ''"
          @click="() => (platformStore.control.navSelect = 'contact')"
        >
          Contact
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
  import { reactive, ref } from "@vue/reactivity";
  import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
  } from "firebase/auth";

  import app from "../configurations/firebase";
  import { usePlatformStore } from "../stores/PlatformStore";

  const platformStore = usePlatformStore();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  let user = ref("");
  let error = reactive({ code: "", msg: "" });

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        user = result.user;
        platformStore.user.name = result.user.displayName;
        platformStore.user.photo = result.user.photoURL;
        console.log(user);
      })
      .catch((err) => {
        error.code = err.code;
        error.msg = err.message;
        console.log(err);
      });
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        platformStore.user.name = "";
        platformStore.user.photo = "";
        console.log("sign out");
        alert("loged out successfully!");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  const handleSelectNav = (i) => {
    platformStore.control.navSelect = i;
    console.log(platformStore.control.navSelect);
  };
</script>

<style lang="scss" scoped>
  header {
    width: 100vw;
    height: 100%;
    left: 0;
    font-family: "Noto Serif TC", serif;
    top: 0;
    // background: #d0d0d0;
    .app_name {
      position: absolute;
      // height: 100%;
      // background: #000;
      font-size: 40px;
      font-weight: 700;
      top: 0.5em;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .wrap {
      height: 100%;
      display: flex;
      // background: #000;
      justify-content: start;
      align-items: center;
      h1 {
        font-size: 2.2em;
        font-weight: 700;
        // background: #000;
        margin-right: auto;
        margin-left: 1.5em;
        z-index: 20;
        &:hover {
          cursor: help;
        }
        user-select: none;
        a {
            color: inherit;
            text-decoration: none;
        }
      }
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        margin-right: 3em;
        // background: #000;
        .user-info {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fafcfd;
          padding: 0.5em;
          border-radius: 0.5em;
          border: 1.6px rgb(131, 131, 131) solid;
          box-shadow: 1px 1px 2px gray;
          gap: 1.3em;
          opacity: 0;
          transform: translateY(-50%);
          animation: popup 0.5s forwards ease-in;
          @keyframes popup {
            0% {
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          img {
            height: 2em;
            width: 2em;
            border-radius: 3px;
          }
        }
        li {
          font-size: 1.2em;
          &:hover {
            color: rgb(159, 76, 63);
            cursor: pointer;
          }

          &.google-login-wrap {
            background: #ffffff;
            padding: 0.5em;
            border: 2px gray solid;
            border-radius: 5px;
            transition: 0.4s;
            &:hover {
              cursor: pointer;
              background: #e7f7ff;
            }
          }
          &#logOut {
            color: rgb(162, 43, 43);
            cursor: pointer;
            transition: 0.4s;
            &:hover {
              color: red;
            }
          }
        }
      }
    }
    .active {
      color: rgb(159, 76, 63);
    }
  }
</style>
