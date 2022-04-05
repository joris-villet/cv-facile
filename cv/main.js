import { html, render } from 'lit-html'
import Sidebar from './components/Sidebar'
import Sheet from './components/Sheet'
import './sass/app.css'


const App = () => html`
  <main class="interface">
    ${Sidebar()}
 
    <section class="interface__sheet">
      ${Sheet()}
    </section>
  </main>
`;


render(App(), document.querySelector('#app'));







