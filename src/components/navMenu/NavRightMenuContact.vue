<template>
    <div class="contact-wrap">
        <h1>Contact</h1>
        <div class="photo">
            <img src="../../assets/agwurn_web.jpg" alt="agwurn_photo">
        </div>
        <h2>呂理鈞 agwurn</h2>
        <p style="text-align: center;">developer / musician</p>
        <ul>
            <li><a href="https://agwurn-resume.netlify.app/">Resume</a></li>
            <li><a href="https://www.youtube.com/channel/UClZCS8tBEkYwaTyhDunphsg">Youtube</a></li>
            <li><a href="https://streetvoice.com/agwurn/">StreetVoice</a></li>
            <li><a href="https://www.instagram.com/agwurn00/">Instagram</a></li>
            <li><a href="mailto:agwurn.dev@gmail.com">agwurn.dev@gmail.com</a></li>
        </ul>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.contact-wrap {
    .photo {
        width: 80%;
        height: 40%;
        // border: 1px rgb(225, 221, 221) solid;
        margin: 0 auto 1em;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    display: flex;
    flex-direction: column;
    ul {
        margin: 0 auto 2em;
        li {
            padding: 0 .3em;
            transition: .4s;
            &:hover {
                color: rgb(128, 77, 0);
                background: rgba(206, 226, 238, 0.84);
            }
            a {
                text-decoration: none;
                color: inherit;
            }
        }
    }
}
</style>