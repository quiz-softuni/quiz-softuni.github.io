import { html } from '../../node_modules/lit-html/lit-html.js';
import { createPet } from '../api/data.js';

const createTemplate = (onSubmit) => html`<section id="create-page" class="create">
<form @submit=${onSubmit} id="create-form" action="" method="">
    <fieldset>
        <legend>Add new Pet</legend>
        <p class="field">
            <label for="name">Name</label>
            <span class="input">
                <input type="text" name="name" id="name" placeholder="Name">
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description" id="description" placeholder="Description"></textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" placeholder="Image">
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type">
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="parrot">Parrot</option>
                    <option value="reptile">Reptile</option>
                    <option value="other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Add Pet">
    </fieldset>
</form>
</section>`;

export async function createPage(ctx){
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const form = new FormData(event.target);
        const name = form.get('name');
        const description = form.get('description');
        const imageUrl = form.get('imageUrl')
        const type = form.get('type');

        if (name == '' || description == '' || imageUrl == '' || type =='') {
            window.alert('All fields are required!')
           return ctx.render(createTemplate(onSubmit));

        }

        await createPet({name, description,imageUrl, type});
        ctx.setUserNav();
        ctx.page.redirect('/dashboard');
    }
}