import { html } from 'lit-html'
import $ from 'jquery'
import Form from './Form'
import '../sass/Sidebar/sidebar.css'

const Sidebar = () => html`
  <aside class="sidebar">
    <button class="sidebar__btn">click</button>
    ${Form()}
  </aside>
`;


window.addEventListener('DOMContentLoaded', () => {

  let sidebarActive = false;
  
  $('.sidebar__btn').on('click', () => {
    if (!sidebarActive) {
      $('.form').css('display', 'block')
      setTimeout(() => {
        $('.form').addClass('form--active')
        $('.form').css('opacity', '1')
      }, 400)
      $('.interface').css('grid-template-columns', '350px 1fr')
      sidebarActive = true;
    }
    else {
      $('.form').css('opacity', '0')
      $('.form').removeClass('form--active')
      $('.interface').css('grid-template-columns', '35px 1fr')
      sidebarActive = false;
    }
  })

})






export default Sidebar;

