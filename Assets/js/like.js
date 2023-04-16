(()=>{
    const postContainer = $('#post-container');
    const serverUrl = `http://localhost:8000/likes`;
    function toggleLike(){
        postContainer.on('click',(e)=>{
            let likeBtn= e.target;
            likeBtn = $(likeBtn);
            if(likeBtn.hasClass('likeBtn')){
                let likableId = likeBtn.attr('data');
                let likeCount = $(`#likeCount-${likableId}`);
                let likeUrl = `${serverUrl}/toggle?id=${likableId}&type=${likeCount.attr('data')}`;
                $.ajax({
                    url:likeUrl,
                    method:'GET',
                    success: function(data){
                        console.log(data);
                        loopThough();
                    },
                    error: function(error){
                        console.log(error.responseText);
                    }

                });

            }
        });
    }
    function updateLikes(likes){
        console.log(likes);
        let likeCount;
        for(let like of likes){
            likeCount = $(`#likeCount-${like.likable}`);
            break;
        }
        if(likeCount) likeCount.html(likes.length);
    }
    function getLikes(id) {
        const getUrl = `${serverUrl}/fetch-likes?id=${id}`;
        $.ajax({
            url: getUrl,
            method: 'GET',
            success: function (likes) {
                updateLikes(likes);
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }
    function loopThough() {
        let childrens = postContainer.children();
        childrens.each(function () {
            let id = $(this).children().eq(0).attr('data');
            $(`#likeCount-${id}`).html(0);
            getLikes(id);
        })
    }

    function render(){
        loopThough();
        toggleLike();
    }
    render();

    

})();