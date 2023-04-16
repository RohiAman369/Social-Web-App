(() => {
    const postContainer = $('#post-container');
    const serverUrl = `http://localhost:8000/comments`;


    function getComments(id, commentContainer) {
        const getUrl = `${serverUrl}/fetch-comments?id=${id}`;
        $.ajax({
            url: getUrl,
            method: 'GET',
            success: function (comments) {
                showComments(comments, commentContainer);
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }

    function addComment() {
        postContainer.on('click', (e) => {
            let addCommentBtn = e.target;
            addCommentBtn = $(addCommentBtn);
            if (addCommentBtn.hasClass('postCommBtn')) {
                let id = addCommentBtn.attr('data');
                const comInput = $(`#comform-${id}`);
                const createUrl = `${serverUrl}/create?id=${id}&type=Post`;
                e.preventDefault();
                $.ajax({
                    url: createUrl,
                    method: 'POST',
                    data: comInput.serialize(),
                    success: function (data) {
                        console.log(data);
                        loopThough();
                    },
                    error: function (err) {
                        console.log(err.responseText);
                    }
                });
            }
        });
    }




    function showComments(comments, commentContainer) {
        let htmlString = '';
        for (let comment of comments) {
            $(`#comCount-${comment.commentable}`).html(comments.length);
            htmlString += `
            <div class="card">
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>${comment.content}</p>
                        <footer class="blockquote-footer"><cite title="Source Title">${comment.user.name}</cite></footer>
                        <button class="delCBtn btn btn-outline-primary btn-sm" type="button" id="${comment._id}" >Delete Comment</button>
                    </blockquote>
                </div>
            </div>`;
        }
        commentContainer.html(htmlString);
    }

    function loopThough() {
        let childrens = postContainer.children();
        childrens.each(function () {
            let id = $(this).children().eq(0).attr('data');
            let commentContainer = $(this).children().eq(1);
            $(`#comCount-${id}`).html(0);
            getComments(id, commentContainer);
        })
    }

    function deleteComment() {
        postContainer.on('click', (e) => {
            let deleteComBtn = e.target;
            deleteComBtn = $(deleteComBtn);
            if (deleteComBtn.hasClass('delCBtn')) {
                let id = deleteComBtn.attr('id');
                let deleteUrl = `${serverUrl}/delete?id=${id}`;
                $.ajax({
                    url: deleteUrl,
                    method: 'DELETE',
                    success: function (data) {
                        console.log('Success : ', data);
                        loopThough();
                    },
                    error: function (error) {
                        console.log('Error ', error.responseText);
                    }
                });

            }
        });
    }

    function render() {
        setTimeout(loopThough,500);
        addComment();
        deleteComment();
    }
    render();








})();
