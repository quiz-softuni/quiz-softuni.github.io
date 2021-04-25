import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import * as api from './api/data.js';



import {loginPage} from './views/login.js';
import {registerPage} from './views/register.js';
import {createPage} from './views/create.js';
import {dashboardPage} from './views/dashboard.js';
import {detailsPage} from './views/details.js';
import {editPage} from './views/edit.js';
import {mypetsPage} from './views/mypets.js';

const main = document.querySelector('main');

page('/login', decorateContex, loginPage);
page('/register', decorateContex, registerPage);
page('/create', decorateContex, createPage);
page('/dashboard', decorateContex, dashboardPage);
page('/', decorateContex, dashboardPage);
page('/details/:id', decorateContex, detailsPage);
page('/edit/:id', decorateContex, editPage);
page('/mypets', decorateContex, mypetsPage);



import {logout} from './api/data.js';
document.getElementById('logoutBtn').addEventListener('click', async()=>{
   //api.logout();
    await logout();
    setUserNav();
   page.redirect('/dashboard');
} )

setUserNav();
page.start();


function decorateContex(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
    }


    function setUserNav(){
        const userId = sessionStorage.getItem('userId');
        if (userId !== null){
            document.querySelector('#user').querySelector('span').innerHTML = `Welcome, ${sessionStorage.getItem('email')}`
            document.getElementById('guest').style.display = 'none';
            document.getElementById('user').style.display = 'block';
        } else {
            document.getElementById('guest').style.display = 'inline-block';
            document.getElementById('user').style.display = 'none';
        }
    }