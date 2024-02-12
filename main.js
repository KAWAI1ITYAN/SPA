let item = document.querySelector('.spa');


    async function home() {
        if (currentUser === true) {
            let response = await fetch("https://jsonplaceholder.typicode.com/posts");
            let data = await response.json();
            console.log(data);
            let glav = item.innerHTML = ``;
            data.forEach(post => {
                item.innerHTML += `
                    <div class="cart">
                        <h3>Post: </h3>
                        <p>${post.title}</p>
                        <a href="#" onclick="info_post(${post.id}); return false;">Оставить комментарий</a>
                        <hr>
                    </div>
                `;
            });
        } else {
            login_html();
        }
    }

    let comments = [];

    async function addComment(postId, commentText) {
        let newComment = {
            postId: postId,
            comment: commentText
        };
        comments.push(newComment);
    }


    async function info_post(pk) {
        if (currentUser === true) {
            let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${pk}`);
            let post = await response.json();
            console.log(post);
            let glav = item.innerHTML = ``;
            item.innerHTML += `
                <div class="cart_ll">
                    <h3>Пост: </h3>
                    <p>${post.title}</p>
                    <h3>Описание: </h3>
                    <p>${post.body}</p>

                    <input type="text" id="commentInput" placeholder="Введите комментарий">
                    <button onclick="comment(${post.id})">Добавить комментарий</button>
                    <div id="commentsSection"></div>
                </div>
            `;
            let commentsSection = document.querySelector("#commentsSection");
            commentsSection.innerHTML = "<h3>Комментарии:</h3>";
            comments.filter(comment => comment.postId === pk).forEach(comment => {
                commentsSection.innerHTML += `<p>${comment.comment}</p>`;
            });
        } else {
            login_html();
        }
    }

    async function comment(postId) {
        let commentInput = document.querySelector("#commentInput");
        let commentText = commentInput.value;
        await addComment(postId, commentText);
        info_post(postId);
        commentInput.value = '';
    }

    let users = [];

    let currentUser = null;

    function register_html(){
        item.innerHTML = `
            <div class="margin">
                <a class="button72">Регистрация</a><br>
                <input type="text" name="username" id="username" placeholder="Имя пользователя"><br>
                <input type="password" name="password" id="password" placeholder="Пароль"><br>
                <button class="button7" onclick="register()">Регистрация</button>
            </div>
        `;
    }

    function login_html(){
        item.innerHTML = `
            <div class="margin">
                <a class="button72">Авторизация</a><br>
                <input type="text" name="username" id="username" placeholder="Имя пользователя"><br>
                <input type="password" name="password" id="password" placeholder="Пароль"><br>
                <button class="button7" onclick="login()">Авторизация</button>
            </div>
        `;
    }

    function register() {
        let usernameInput = document.querySelector("#username");
        let passwordInput = document.querySelector("#password");
        let username = usernameInput.value;
        let password = passwordInput.value;
        if (!username || !password) {
            showModal("Пожалуйста, заполните все поля.");
            return;
        }
        let newUser = { username: username, password: password };
        users.push(newUser);
        showModal("Регистрация прошла успешно!");
    }

    function login() {
        let usernameInput = document.querySelector("#username");
        let passwordInput = document.querySelector("#password");
        let username = usernameInput.value;
        let password = passwordInput.value;
        if (!username || !password) {
            showModal("Пожалуйста, заполните все поля.");
            return;
        }
        let user = users.find(user => user.username === username && user.password === password);
        if (user) {
            showModal("вы успешно авторизировались!");
            currentUser = true;
            home();
        } else {
            showModal("Пользователь с указанными учетными данными не найден.");
        }
    }

    function logout() {
        currentUser = null;
        item.innerHTML = `Вы вышли из аккаунта.`;
    }

    function showModal(message) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function() {
            modal.remove();
        };
    }