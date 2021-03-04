import { ErrorPage, error500 } from './pages/error/error';

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    console.log('render', root);
    return root;
}
  
const errorPage = new ErrorPage(error500);
  
// app — это id дива в корне DOM
render(".app", errorPage);

