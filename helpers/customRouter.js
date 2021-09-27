export default {
    push: function(url){
        let to = new URL(url,window.location.origin);
        window.history.pushState({...window.history.state,url,as:url},'',to);
    }
}