import { html } from 'lit-html';
import * as store from 'store2'
import coor from '../coor.js';
import $ from 'jquery'
import '../sass/Form/form.css'
import { jsPDF } from "jspdf";


const options = [
  { value: 'sheet__title', content: 'title principal'},
  { value: 'sheet__subtitle', content: 'sous-titre optionnel'},
]


const Form = () => html`
  <form class="form">
    <label class="form__label">
      <input id="title" class="form__title" type="type" placeholder="Titre principal">
    </label>
    <label class="form__label">
      <input class="form__subtitle" type="type" placeholder="Sous-titre optionel">
    </label>

    <select id="inputSelect" class="form__select">
      <option>Choisir un élément à déplacer</option>
      ${options.map(el => html`
        <option value="${el.value}">${el.content}</option>
      `)}
    </select>

    <div class="form__coor">
      <label class="form__label"> Axe x
        <input disabled class="form__range x" type="range" value="0" min="0" max="595">
      </label>
  
      <label class="form__label"> Axe y
        <input disabled class="form__range y" type="range" value="0" min="0" max="841">
      </label>
    </div>

    <label class="form__label">
      <textarea class="form__textarea"></textarea>
    </label>

    <div>
      <button id="btnAddText">Ajouter un bloc de texte</button>
    </div>

    <button id="btnGetStore" class="form__btn">get store</button>
  </form>
`;


window.addEventListener('DOMContentLoaded', () => {

  let elementWidth = null;
  let elementHeigth = null;
  let classTarget = null;
  let selected = "";

  const heightSheet = $('.sheet').height();
  const widthSheet = $('.sheet').width();
  console.log(heightSheet);
  console.log(widthSheet);

  btnAddText.onclick = (e) => {
    e.preventDefault()
    // const input = () => html``;
  }
  

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
        x: parseInt(e.target.value, 10), 
        y: coor[elem].pos.y 
      })
  
      let maxRange = (595 - elementWidth);
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
        y: parseInt(e.target.value, 10) + elementHeigth
      })
  
      let maxRange = (841 - elementHeigth);
      console.log("maxRange => ", maxRange);
  
      if (coor[elem].pos.y >= maxRange) {
        return $('.' + classTarget).css("top", maxRange + 'px')
      }
    }
  }

  inputSelect.oninput = (e) => {
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
  }

  btnGetStore.onclick = (e) => {
    e.preventDefault();
    console.log('click')

    const doc = new jsPDF({
      unit: "px",
      format: [595, 841]
    });

    store((elem, data) => {
      // console.log(elem, data)
      console.log(data.val, data.x, data.y)
      // console.log(elementHeigth)
      doc.text(data.val, 500, data.y + 10);
      doc.save("a4.pdf");
      store.clearAll()
    });

    
  }

})


export default Form;
