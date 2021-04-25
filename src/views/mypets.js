import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPets} from '../api/data.js';

const mypetsTemplate = (myPets) => html `
  <section id="my-pets-page" class="my-pets">
            <h1>My Pets</h1>
               ${myPets.length>0 ? html`<ul class="my-pets-list">
              ${myPets.map(petTempl)}
            </ul>`
            : html`<p class="no-pets">No pets in database!</p>` }
        </section>`;

        const petTempl = (pet) => html `<li class="otherPet">
        <h3>Name: ${pet.name}</h3>
        <p>Type: ${pet.type}</p>
        <p class="img"><img src=${pet.imageUrl}></p>
        <a class="button" href=${`/details/${pet._id}`}>Details</a>
    </li>`;

    
export async function mypetsPage(ctx){
    const userId = sessionStorage.getItem('userId')
    const myPets = await getMyPets(userId);
    
ctx.render(mypetsTemplate(myPets));
}