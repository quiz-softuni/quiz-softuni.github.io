import { html } from '../../node_modules/lit-html/lit-html.js';
import {editPet,getPetById } from '../api/data.js';

const editTemplate = (onSubmit,pet) => html`<section id="edit-page" class="edit">
<form @submit=${onSubmit} id="edit-form" action="#" method="">
    <fieldset>
        <legend>Edit my Pet</legend>
        <p class="field">
            <label for="name">Name</label>
            <span class="input">
                <input type="text" name="name" id="name" .value=${pet.name}>
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                    id="description" .value =${pet.description}></textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" .value=${pet.imageUrl}>
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" .value=${pet.type}>
                    <option value="cat" >Cat</option>
                    <option value="dog" selected>Dog</option>
                    <option value="parrot">Parrot</option>
                    <option value="reptile">Reptile</option>
                    <option value="other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>`;

export async function editPage(ctx){
  const petId = ctx.params.id;
  const pet = await getPetById(petId);
    
    ctx.render(editTemplate(onSubmit,pet));

async function onSubmit(event){
    event.preventDefault();
    const form = new FormData(event.target);
    const name = form.get('name');
    const description = form.get('description');
    const imageUrl = form.get('imageUrl');
    const type = form.get('type');

    if (name == '' || description == '' || imageUrl =='' || type == ''){
        window.alert('All fields are required!')
        return ctx.render(editTemplate(onSubmit,pet));
    }
    
    await editPet(petId, {name, description, imageUrl, type})
    ctx.page.redirect(`/details/${petId}`);
}

}