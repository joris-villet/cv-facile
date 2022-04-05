import { html } from 'lit-html';
import * as store from 'store2'
import coor from '../coor.js';
import $ from 'jquery'
import '../sass/Form/form.css'

const Form = () => html`
  <form class="form">
    <label class="form__label">
      <input class="form__title" type="type" placeholder="Titre principal">
    </label>
    <label class="form__label">
      <input class="form__subtitle" type="type" placeholder="Sous-titre optionel">
    </label>

    <!-- <select class="form__select">
      <option>Choisir un élément à déplacer</option>
      <option value="sheet__title">titre principal</option>
      <option value="sheet__subtitle">sous-titre</option>
    </select> -->
    <select class="form__select">
  
      <option>Choisir un élément à déplacer</option>
    </select>

    <div class="form__coor">
      <label class="form__label"> Axe x
        <input disabled class="form__range x" type="range" value="0" min="0" max="827">
      </label>
  
      <label class="form__label"> Axe y
        <input disabled class="form__range y" type="range" value="0" min="0" max="1170">
      </label>
    </div>

    <!-- <button class="form__btn">get store</button> -->
  </form>
`;

window.addEventListener('DOMContentLoaded', () => {

  const options = [
    { value: 'sheet__title', content: 'title principal'},
    { value: 'sheet__subtitle', content: 'sous-titre optionnel'},
  ]


  let elementWidth = null;
  let elementHeigth = null;
  let classTarget = null;
  let selected = "";

  $('input').each((i, el) => {
    $(el).on('input', (e) => {
      const inputClass = $(e.target).attr('class').split('form').join('sheet');
      $('.' + inputClass).text(e.target.value)
    })
  })
  

  function moveElement(e) {

    const axe = $(e.target).attr('class').split(' ')[1];

    if (axe === 'x') {
      
      const elem = classTarget.split('sheet__')[1];
      
      $('.' + classTarget).css("left", e.target.value + 'px')
      coor[elem].pos.x = parseInt($('.' + classTarget).css('left'), 10)

      store.set(classTarget, {
        val: $('.' + classTarget).text(),
        x: e.target.value, 
        y: coor[elem].pos.y 
      })
  
      let maxRange = (827 - elementWidth);
      // console.log("maxRange => ", maxRange)
  
      if (coor[elem].pos.x >= maxRange) {
        return $('.' + classTarget).css("left", maxRange + 'px')
      }

    } else {
      const elem = classTarget.split('sheet__')[1]
      
      $('.' + classTarget).css("top", e.target.value + 'px')
      coor[elem].pos.y = parseInt($('.' + classTarget).css('top'), 10)

      store.set(classTarget, { 
        val: $('.' + classTarget).text(),
        x: coor[elem].pos.x, 
        y: e.target.value 
      })
  
      let maxRange = (1170 - elementHeigth);
      console.log("maxRange => ", maxRange)
  
      if (coor[elem].pos.y >= maxRange) {
        return $('.' + classTarget).css("top", maxRange + 'px')
      }
    }


  }

  $('.form__select').on('input', (e) => {
    selected = e.target.value;
    // console.log("selected => ", selected)
    elementWidth = Math.round($('.' + selected).width());
    elementHeigth = Math.round($('.' + selected).height());
    $('.form__range').attr('disabled', false)

    $('.elem').each((i, el) => {
      const attrClass = $(el).attr('class').split(' ')[0];
      return attrClass === selected ? classTarget = attrClass : null;
    })

    // console.log("targetToMove => ", classTarget)
    $('.form__range').on('input', moveElement)


    // $('.form__btn').on('click', (e) => {
    //   e.preventDefault()
    //   console.log(store.getAll())
    // })


  })

})


export default Form;
