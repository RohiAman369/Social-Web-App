
(() => {
    const postContainer = $('#post-container');
    const serverUrl = `http://localhost:8000/posts`;
    function getPost() {
        const fetchUrl = `${serverUrl}/fetch-post`;
        $.ajax({
            url: fetchUrl,
            method: 'GET',
            success: function (posts) {
                showPost(posts);
            }

        })

    }
    function showPost(posts) {
        let htmlString = '';
        for (let post of posts) {
            htmlString += `
            <div class="row">
                <div class="card mb-5 mr-5 col" data="${post._id}" style="width: 18rem;">
                    <div class="card-header text-center">${post.title}</div>            
                        <img class="card-img-top" src="https://source.unsplash.com/1600x900/?beach" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text text-center">${post.content}</p>
                    </div>
                    <div class="mb-4" >
                        <span><span id="likeCount-${post._id}" data="Post">0</span>&nbsp likes</span>
                        <span><span id="comCount-${post._id}">0</span>&nbsp comments</span>
                        <button class="likeBtn btn btn-block btn-primary " data="${post._id}"><i class="fa fa-thumbs-up">Like</i> </button>
                    </div>
                    <form action="/comments/create" method="POST" id="comform-${post._id}">
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                            </div>
                            <input type="text" id="comInput" class="form-control" name="content" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                        </div>
                        <button class="postCommBtn btn btn-primary btn-sm mb-2" data="${post._id}" type="submit">Post comment</button>
                    </form>
                    <button class="delBtn btn btn-outline-primary btn-sm" type="button" id="${post._id}" >Delete Post</button>
                </div>    
                <div class="col overflow-scroll"  style="width:50%;">
                    
                </div>
            </div>`

        }
        postContainer.html(htmlString);

    }
    function createPost() {
        let postForm = $('#post-form');
        let createUrl = `${serverUrl}/create`;
        $.ajax({
            url: createUrl,
            method: 'POST',
            data: postForm.serialize(),
            success: function (data) {
                console.log('Successfully created ', data);
                getPost();
            }, error: function (err) {
                console.log('Error in creating the post ', err.responseText);
            }
        });
    }
    function postCreater() {
        let createPostBtn = $('#crtpost');
        createPostBtn.on('click', (e) => {
            e.preventDefault();
            createPost();
        })
    }


    function deletePost() {
        postContainer.on('click', (e) => {
            let deletePostBtn = e.target;
            deletePostBtn = $(deletePostBtn);
            if (deletePostBtn.hasClass('delBtn')) {
                let id = deletePostBtn.attr('id');
                let deleteUrl = `${serverUrl}/delete?id=${id}`;
                $.ajax({
                    url: deleteUrl,
                    method: 'DELETE',
                    success: function (data) {
                        console.log('Success : ', data);
                        getPost();
                    },
                    error: function (error) {
                        console.log('Error ', error.responseText);
                    }
                });

            }
        });
    }


    function render() {
        getPost();
        postCreater();
        deletePost();
    }
    render();


})();