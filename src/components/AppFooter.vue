<template>
    <footer class="footer">
        <div class="info-section">
            <div class="footer-section">
                <p class="section-heading">Product Collection</p>
                <div class="section-content">
                    <ul>
                        <li>Current and Forecast APIs</li>
                        <li>Historical Weather Data</li>
                        <li>Weather Maps</li>
                        <li>Widgets</li>
                    </ul>
                </div>
            </div>
            <div class="footer-section">
                <p class="section-heading">Subscription</p>
                <div class="section-content">
                    <ul>
                        <li>How to start</li>
                        <li>Pricing</li>
                        <li>FAQ</li>
                    </ul>
                </div>
            </div>
            <div class="footer-section">
                <p class="section-heading">About us</p>
                <div class="section-content">
                    <p>OpenWeather is a team of IT experts and data scientists that has been practising deep weather
                        data
                        science
                        since 2014. For each point on the globe, OpenWeather provides historical, current and forecasted
                        weather
                        data
                        via light-speed APIs. Headquarters in London, UK.</p>
                </div>
            </div>
        </div>
        <div class="socal-section">
            <a href="#"><img src="../assets/social/icon_facebook.png" height="80" width="39" /></a>
            <a href="#"> <img href="#" src="../assets/social/icon_twitter.png" height="80" width="39" /></a>
            <a href="#"> <img src="../assets/social/icon_telegram.png" height="80" width="39" /></a>
            <a href="#"> <img src="../assets/social/icon_github.png" height="80" width="39" /></a>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'AppFooter'
}
</script>

<style scoped>
.footer {
    background-color: white;
    padding-top: 40px;
    position: relative;
    z-index: 100;
}

.footer-section {
    color: black;
}

.section-content p {
    width: 17rem;
    color: black;
}

.socal-section a img {
    width: auto;
    height: 12pt;
}

ul {
    list-style-type: none;
}

.socal-section {
    background: white;
    display: flex;
    justify-content: space-around;
    padding-bottom: 30px;
}
</style>