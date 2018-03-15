export default function () {
    if (window.is_init_messenger_support) return;

    window.is_init_messenger_support = true;
    window.fbAsyncInit = function() {
        FB.init({
            appId            : '1619120348120355',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.12'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}