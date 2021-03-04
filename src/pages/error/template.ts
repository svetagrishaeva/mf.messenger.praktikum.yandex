export const errorTemplate = 
            `<head>
                <meta charset="utf-8">
                <title><h4><%-title%></title>
                <link rel="stylesheet" type="text/css" href="../css/error-page.css">
            </head>
                <body>
                <div class="text-area">
                    <h1><h4><%-code%><h1>
                    <h2><h4><%-message%><h2>
                    <a href="chats">Назад к чатам</a>
                </div>
            </body>`;