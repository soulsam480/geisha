<script setup lang="ts">
import { onMounted } from 'vue'
import ytdl from 'ytdl-core'

const COOKIE =
  'YSC=BGZXEuL6yzY; VISITOR_INFO1_LIVE=GU1My2uqkxM; LOGIN_INFO=AFmmF2swRgIhAKM3OvQTUa0rsu9ZejtumVe0vFszP7JxPweKVzeNDeR2AiEAx4TZFDR3YhTvYjzh0QRC7DtgynMY-mfuYZn6nsjooog:QUQ3MjNmeFRTTlN2SDk1RjJlcTBwWl9XV1ZMbG9VZFFVYlNuLVp6TExBZkEwekpMNVJnQlVSWFR6dDZ5SHc0TkFucnJOZUNOMnVRTE8xYXhscTBDYXAzZTF4UW9ZMG9vTjJZOFR1OGc1UFZ3VGhlZkVuTGxMdVdQR3U5ZmZfZ3BMYWtMNGZIaklieXJVR3VmdXgyUUh0TElzQi13Um5NX2Jn; __Secure-1PSIDTS=sidts-CjEB3e41hRQzgwirzGOhRMCq9BGW0EYUn7uxGOLujdYIDKoFOGsvb-DxOovq2AHvmvNXEAA; __Secure-3PSIDTS=sidts-CjEB3e41hRQzgwirzGOhRMCq9BGW0EYUn7uxGOLujdYIDKoFOGsvb-DxOovq2AHvmvNXEAA; HSID=Adj9irLmz4WMF68rW; SSID=AAHRi59l69M6A8qXx; APISID=s0m45pOmRL2FkM66/Abq6N-WlN38oT_ras; SAPISID=1VgNlPWjO6Dhovdg/AQlOL6KFpgQ5578nz; __Secure-1PAPISID=1VgNlPWjO6Dhovdg/AQlOL6KFpgQ5578nz; __Secure-3PAPISID=1VgNlPWjO6Dhovdg/AQlOL6KFpgQ5578nz; VISITOR_PRIVACY_METADATA=CgJJThIEGgAgNg%3D%3D; wide=1; SID=g.a000gQhWDHs_qOZYKmIMrDviMY1sNWv7hEY48uyHdDZHZ9zPd3uVXMAEdOGEJyhNTr7LFHIaRwACgYKASkSAQASFQHGX2Mij6L2Nas2IVyfrdS7GxszWxoVAUF8yKrv0qksI5dZXb7-XbexwxpW0076; __Secure-1PSID=g.a000gQhWDHs_qOZYKmIMrDviMY1sNWv7hEY48uyHdDZHZ9zPd3uVsTBA0cyXfdN7pEdOLMHw4AACgYKAbgSAQASFQHGX2MiCOvArSCJsuT6fGXZOJwu1xoVAUF8yKrnx7Ae74iI8RPzvGNP2aCg0076; __Secure-3PSID=g.a000gQhWDHs_qOZYKmIMrDviMY1sNWv7hEY48uyHdDZHZ9zPd3uVW-yzOpXPQRenpC3lCA0mXAACgYKAUYSAQASFQHGX2MicbZ7UK_3UDwaZlLIXA44-RoVAUF8yKoaw7rMCWbphQQHQuKa6GIM0076; PREF=f6=40000080&tz=Asia.Calcutta&f5=30000&f7=100&autoplay=true&volume=15&guide_collapsed=true&repeat=NONE&f4=4000000; SIDCC=ABTWhQEVQynMXOxqpsCjRfH356LbRgHV6fclPka9fVdwn6LZN-hzZCUzsEPjHHvO3zaMCvhfi5r_; __Secure-1PSIDCC=ABTWhQHb1xKVrOfIig6klRorlDKVkxqkU9r1h1NZRhwMPlsyo2z9I9vUMhRXeJxMQh6jItZ3PlE; __Secure-3PSIDCC=ABTWhQFqiDsSBTlhEQjUCfYogcQB4BHGN_ghEiJVUUC3JcW1jsyygD_8LsFK02AQipjHggTEpZw'

onMounted(async () => {
  const info = await ytdl.getInfo('https://www.youtube.com/watch?v=FIbbF7N5pCY', {
    requestOptions: {
      headers: {
        cookie: COOKIE
      }
    }
  })
  console.log(info)
})
</script>

<template>
  <main>Hello</main>
</template>
